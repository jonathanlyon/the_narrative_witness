(async () => {
  const pause = (milliseconds) =>
    new Promise((resolve) => window.setTimeout(resolve, milliseconds));
  const visible = (element) =>
    element instanceof HTMLElement &&
    element.getClientRects().length > 0 &&
    getComputedStyle(element).visibility !== "hidden";
  const text = (element) => (element.innerText || "").trim();
  const postId =
    location.pathname.match(/\/(?:permalink|posts)\/(\d+)/)?.[1] || "";

  if (!postId) {
    window.alert(
      "Open a single Facebook post before running the comment collector."
    );
    return;
  }

  const orderButton = Array.from(
    document.querySelectorAll('[role="button"], button')
  ).find(
    (element) =>
      visible(element) &&
      ["Newest", "Most relevant"].includes(text(element))
  );

  if (orderButton) {
    orderButton.click();
    await pause(350);
    const allComments = Array.from(
      document.querySelectorAll('[role="menuitem"]')
    ).find(
      (element) =>
        visible(element) && text(element).startsWith("All comments")
    );

    if (allComments) {
      allComments.click();
      await pause(700);
    }
  }

  for (let round = 0; round < 30; round += 1) {
    const controls = Array.from(
      document.querySelectorAll('[role="button"], button')
    ).filter((element) => {
      if (!visible(element)) {
        return false;
      }

      const label = text(element);
      const insideComment = Boolean(
        element.closest('[role="article"][aria-label^="Comment by"], [role="article"][aria-label^="Reply by"]')
      );

      return (
        /^(View|See) (more|previous) comments$/i.test(label) ||
        /^View (?:\d+ )?more repl(?:y|ies)$/i.test(label) ||
        (insideComment && label === "See more")
      );
    });

    if (!controls.length) {
      break;
    }

    for (const control of controls.slice(0, 20)) {
      control.click();
    }

    await pause(650);
  }

  const candidates = Array.from(
    document.querySelectorAll(
      '[role="article"][aria-label^="Comment by"], [role="article"][aria-label^="Reply by"]'
    )
  );
  const found = new Map();

  for (const article of candidates) {
    const links = Array.from(article.querySelectorAll("a")).filter(
      (link) => link.closest('[role="article"]') === article
    );
    const permalink = links.find((link) => {
      const href = link.href || "";
      return href.includes(`/${postId}/`) && href.includes("comment_id=");
    });

    if (!permalink) {
      continue;
    }

    const commentId =
      new URL(permalink.href).searchParams.get("comment_id") ||
      permalink.href;
    if (found.has(commentId)) {
      continue;
    }

    const author =
      links.map((link) => text(link)).find((value) => value && value.length > 1) ||
      article
        .getAttribute("aria-label")
        ?.replace(/^(?:Comment|Reply) by /, "")
        .replace(/\s+\d+\s+(?:minute|hour|day|week|month|year)s?\s+ago.*$/i, "") ||
      "";
    const contentCandidates = Array.from(
      article.querySelectorAll('span[dir="auto"]')
    )
      .filter(
        (element) =>
          element.closest('[role="article"]') === article &&
          text(element) !== author
      )
      .map((element) => text(element))
      .filter(Boolean)
      .sort((left, right) => right.length - left.length);
    const comment = contentCandidates[0] || "";
    const date =
      links.map((link) => text(link)).find((value) =>
        /^(?:\d+[mhdwy]|\d+\s+(?:minute|hour|day|week|month|year)s?\s+ago|[A-Z][a-z]{2}\s+\d{1,2})$/i.test(
          value
        )
      ) || "";

    if (author && comment) {
      found.set(commentId, {
        author_name: author,
        comment,
        date,
        source: "Facebook",
        source_title: "",
        source_url: `${location.origin}${location.pathname}`
      });
    }
  }

  if (!found.size) {
    window.alert(
      "No comments were found for this post. Make sure the post and its comments are visible, then try again."
    );
    return;
  }

  const detectedTitle = document.title
    .split(" | ")
    .filter((part) => !["Facebook", "ADOPTOLOGY"].includes(part))
    .join(" | ")
    .replace(/^\*+|\*+$/g, "")
    .trim();
  const sourceTitle =
    window.prompt(
      "What writing or post prompted these comments?",
      detectedTitle
    ) ?? detectedTitle;

  const rows = Array.from(found.values()).map((row) => ({
    ...row,
    source_title: sourceTitle.trim()
  }));
  const headers = [
    "author_name",
    "comment",
    "date",
    "source",
    "source_title",
    "source_url"
  ];
  const escapeField = (value) => {
    const stringValue = String(value ?? "");
    return /[",\n\r]/.test(stringValue)
      ? `"${stringValue.replaceAll('"', '""')}"`
      : stringValue;
  };
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers.map((header) => escapeField(row[header])).join(",")
    )
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `facebook-comments-${postId}.csv`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  window.alert(
    `Collected ${rows.length} comments. The CSV has been downloaded and is ready to import.`
  );
})();
