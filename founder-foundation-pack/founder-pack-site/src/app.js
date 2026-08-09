(() => {
  "use strict";

  const documents = window.FOUNDATION_DOCS || [];
  const overview = document.querySelector("#overview-view");
  const documentView = document.querySelector("#document-view");
  const searchView = document.querySelector("#search-view");
  const navigation = document.querySelector("#document-navigation");
  const search = document.querySelector("#search");
  const searchStatus = document.querySelector("#search-status");
  const sidebar = document.querySelector("#sidebar");
  const menuButton = document.querySelector("#menu-button");
  const progress = document.querySelector("#reading-progress-bar");
  const toTop = document.querySelector("#to-top");

  const risks = [
    ["Critical", "Writing continuity", "Current autosave can lose the last edit or allow an older request to overwrite newer words."],
    ["Critical", "Cohort access", "Invitation-only language is not enforced by the current authentication flow."],
    ["High", "Untraceable inference", "Current Sensing output has no stable fragment citations, correction history, or version record."],
    ["High", "Trust surfaces", "Privacy, covenant, support, export, and deletion promises are not yet visible product behaviour."],
    ["Medium", "Unbounded cost", "AI requests lack input envelopes, accounting, rate control, and cohort-level alerts."]
  ];

  const decisions = [
    ["The new brief governs", "Earlier implementation and documents are evidence only."],
    ["Studio first", "Circle and Press are understood and future-proofed, not broadly built."],
    ["A mixed first cohort", "Twelve writers across distinct material and writing states."],
    ["Research is invited", "Outside material appears only when the writer asks, with citations and approval."],
    ["References preserve context", "Existing material is linked into a new Idea rather than moved or silently copied."],
    ["Sensing is versioned", "An “I’m sensing” document is distinct from its smaller Story Seeds."]
  ];

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  function inline(value) {
    let output = escapeHtml(value);
    output = output.replace(/`([^`]+)`/g, "<code>$1</code>");
    output = output.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|[^\s)]+)\)/g, (_, label, href) => {
      const external = /^https?:\/\//.test(href);
      return `<a href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${label}</a>`;
    });
    output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    output = output.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");
    output = output.replace(/\b(Observed|Documented|External evidence|Founder decision|Hypothesis|Recommendation|Risk):/g, '<span class="evidence-chip">$1</span>');
    return output;
  }

  function renderMarkdown(markdown) {
    const lines = markdown.replace(/\r/g, "").split("\n");
    const html = [];
    let paragraph = [];
    let list = null;
    let quote = [];
    let code = null;

    const flushParagraph = () => {
      if (paragraph.length) html.push(`<p>${inline(paragraph.join(" "))}</p>`);
      paragraph = [];
    };
    const flushList = () => {
      if (list) html.push(`<${list.type}>${list.items.map((item) => `<li>${inline(item)}</li>`).join("")}</${list.type}>`);
      list = null;
    };
    const flushQuote = () => {
      if (quote.length) html.push(`<blockquote>${inline(quote.join(" "))}</blockquote>`);
      quote = [];
    };

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      if (code !== null) {
        if (/^```/.test(line)) {
          html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
          code = null;
        } else code.push(line);
        continue;
      }
      if (/^```/.test(line)) {
        flushParagraph(); flushList(); flushQuote(); code = [];
        continue;
      }
      if (line.includes("|") && lines[i + 1] && /^\s*\|?\s*:?-+/.test(lines[i + 1])) {
        flushParagraph(); flushList(); flushQuote();
        const rows = [line];
        let rowIndex = i + 2;
        while (rowIndex < lines.length && lines[rowIndex].includes("|") && lines[rowIndex].trim()) {
          rows.push(lines[rowIndex]);
          rowIndex += 1;
        }
        const cells = (row) => row.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
        const headers = cells(rows[0]);
        const bodyRows = rows.slice(1);
        const filter = bodyRows.length > 4 ? '<div class="table-tools"><input type="search" data-table-filter aria-label="Filter this table" placeholder="Filter this matrix"></div>' : "";
        html.push(`<div class="table-wrap">${filter}<table><thead><tr>${headers.map((cell) => `<th>${inline(cell)}</th>`).join("")}</tr></thead><tbody>${bodyRows.map((row) => `<tr>${cells(row).map((cell) => `<td>${inline(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
        i = rowIndex - 1;
        continue;
      }
      const heading = line.match(/^(#{1,4})\s+(.+)$/);
      if (heading) {
        flushParagraph(); flushList(); flushQuote();
        const level = heading[1].length;
        const id = heading[2].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        html.push(`<h${level} id="${id}">${inline(heading[2])}</h${level}>`);
        continue;
      }
      const bullet = line.match(/^\s*[-*]\s+(.+)$/);
      const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
      if (bullet || ordered) {
        flushParagraph(); flushQuote();
        const type = ordered ? "ol" : "ul";
        if (list && list.type !== type) flushList();
        list ||= { type, items: [] };
        list.items.push((bullet || ordered)[1]);
        continue;
      }
      const quoted = line.match(/^>\s?(.*)$/);
      if (quoted) {
        flushParagraph(); flushList(); quote.push(quoted[1]);
        continue;
      }
      if (!line.trim()) {
        flushParagraph(); flushList(); flushQuote();
        continue;
      }
      if (list) flushList();
      if (quote.length) flushQuote();
      paragraph.push(line.trim());
    }
    flushParagraph(); flushList(); flushQuote();
    if (code !== null) html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
    return html.join("\n");
  }

  function renderNavigation() {
    navigation.innerHTML = documents.map((doc, index) => `
      <button class="nav-item" type="button" data-route="${doc.slug}">
        <span>${String(index + 1).padStart(2, "0")}</span>${escapeHtml(doc.title)}
      </button>`).join("");
  }

  function renderOverview() {
    overview.innerHTML = `
      <div class="hero">
        <div class="hero-kicker">Evidence before implementation</div>
        <h1>A foundation for the story.</h1>
        <p class="hero-copy">A founder review of who The Narrative Witness is for, what the Studio must protect, what the existing prototype proves, and the smallest safe path to a twelve-writer cohort.</p>
        <div class="hero-meta"><span>${documents.length} documents</span><span>Studio priority</span><span>Local and private</span><span>10 August 2026</span></div>
      </div>
      <div class="overview-body">
        <div class="section-heading"><h2>The promise, made operational</h2><span>Three spaces</span></div>
        <div class="principle-grid">
          <div class="card"><span class="card-number">01 / THE STUDIO</span><h3>Somewhere to write.</h3><p>A private room to gather, sense, create, and keep faith with the writer’s own language.</p></div>
          <div class="card"><span class="card-number">02 / THE CIRCLE</span><h3>Someone to hear.</h3><p>Facilitated witnessing rather than an open social feed or critique marketplace.</p></div>
          <div class="card"><span class="card-number">03 / THE PRESS</span><h3>Something to hold.</h3><p>A later managed passage from approved manuscript to an enduring physical object.</p></div>
        </div>

        <div class="section-heading"><h2>The Studio’s first movement</h2><span>Writer-led</span></div>
        <div class="journey">
          ${[
            ["Onboard", "Hear who the writer is, what they carry, and why this story now."],
            ["Gather", "Collect and link fragments without forcing their final meaning."],
            ["Sense", "Offer provisional, cited patterns and perspectives when invited."],
            ["Create", "Form Story Seeds and bring chosen context beside the page."],
            ["Witness", "Reflect, answer, guide, and edit only at the writer’s request."]
          ].map(([name, copy]) => `<div class="journey-step"><b>${name}</b><span>${copy}</span></div>`).join("")}
        </div>

        <div class="section-heading"><h2>What could break trust</h2><span>Current evidence</span></div>
        <div class="risk-grid">${risks.map(([level, name, copy], index) => `<div class="risk ${index === 4 ? "medium" : ""}"><span class="risk-label">${level}</span><h3>${name}</h3><p>${copy}</p></div>`).join("")}</div>

        <div class="section-heading"><h2>Decisions already held</h2><span>Founder decisions</span></div>
        <div class="decision-grid">${decisions.map(([name, copy]) => `<div class="decision"><strong>${name}</strong><span>${copy}</span></div>`).join("")}</div>

        <div class="section-heading"><h2>Begin with the executive brief</h2><button class="open-document" type="button" data-open-first>Open document 00</button></div>
      </div>`;
  }

  function showView(which) {
    overview.hidden = which !== "overview";
    documentView.hidden = which !== "document";
    searchView.hidden = which !== "search";
  }

  function setActive(route) {
    document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.route === route));
  }

  function openDocument(slug, updateHash = true) {
    const doc = documents.find((item) => item.slug === slug) || documents[0];
    if (!doc) return;
    documentView.innerHTML = `<div class="document-meta"><span>${escapeHtml(doc.file)}</span><span>Evidence-led founder review</span></div><div class="prose">${renderMarkdown(doc.markdown)}</div>`;
    showView("document");
    setActive(doc.slug);
    if (updateHash) history.replaceState(null, "", `#${doc.slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenu();
    documentView.focus({ preventScroll: true });
  }

  function openOverview(updateHash = true) {
    showView("overview");
    setActive("overview");
    if (updateHash) history.replaceState(null, "", "#overview");
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenu();
  }

  function plainText(markdown) {
    return markdown.replace(/```[\s\S]*?```/g, " ").replace(/[#>*_`|\[\]()]/g, " ").replace(/https?:\/\/\S+/g, " ").replace(/\s+/g, " ").trim();
  }

  function runSearch(query) {
    const term = query.trim().toLowerCase();
    if (term.length < 2) {
      searchStatus.textContent = "";
      if (location.hash === "#search") openOverview(false);
      return;
    }
    const matches = documents.map((doc) => {
      const text = plainText(doc.markdown);
      const lower = text.toLowerCase();
      const index = lower.indexOf(term);
      return index < 0 ? null : { doc, excerpt: text.slice(Math.max(0, index - 85), Math.min(text.length, index + term.length + 145)), index: Math.max(0, index - 85) };
    }).filter(Boolean);
    searchStatus.textContent = `${matches.length} ${matches.length === 1 ? "document" : "documents"}`;
    const highlighted = (text) => inline(text).replace(new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"), "<mark>$1</mark>");
    searchView.innerHTML = `<p class="eyebrow">Search results</p><h1>${escapeHtml(query.trim())}</h1>${matches.length ? matches.map(({ doc, excerpt }) => `<button class="search-result" type="button" data-result="${doc.slug}"><strong>${escapeHtml(doc.title)}</strong><span>${excerpt.startsWith(plainText(doc.markdown).slice(0, 1)) ? "" : "…"}${highlighted(excerpt)}…</span></button>`).join("") : '<div class="empty-state">Nothing in the pack matches that phrase yet.</div>'}`;
    showView("search");
    setActive("");
    history.replaceState(null, "", "#search");
  }

  function closeMenu() {
    sidebar.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  navigation.addEventListener("click", (event) => {
    const button = event.target.closest("[data-route]");
    if (button) openDocument(button.dataset.route);
  });
  document.querySelector(".nav-overview").addEventListener("click", () => openOverview());
  overview.addEventListener("click", (event) => { if (event.target.closest("[data-open-first]")) openDocument(documents[0]?.slug); });
  searchView.addEventListener("click", (event) => { const result = event.target.closest("[data-result]"); if (result) openDocument(result.dataset.result); });
  search.addEventListener("input", () => runSearch(search.value));
  document.querySelector(".evidence-filters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    search.value = button.dataset.filter;
    runSearch(button.dataset.filter);
    search.focus();
  });
  documentView.addEventListener("input", (event) => {
    const input = event.target.closest("[data-table-filter]");
    if (!input) return;
    const term = input.value.trim().toLowerCase();
    input.closest(".table-wrap").querySelectorAll("tbody tr").forEach((row) => {
      row.hidden = Boolean(term) && !row.textContent.toLowerCase().includes(term);
    });
  });
  documentView.addEventListener("click", (event) => {
    const link = event.target.closest('a[href$=".md"]');
    if (!link) return;
    const slug = link.getAttribute("href").split("/").pop().replace(/\.md$/, "");
    if (documents.some((doc) => doc.slug === slug)) {
      event.preventDefault();
      openDocument(slug);
    }
  });
  menuButton.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0}%`;
    toTop.classList.toggle("visible", window.scrollY > 700);
  }, { passive: true });
  window.addEventListener("hashchange", routeFromHash);
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });

  function routeFromHash() {
    const route = location.hash.slice(1) || "overview";
    if (route === "overview") openOverview(false);
    else if (route === "search") showView("search");
    else openDocument(route, false);
  }

  renderNavigation();
  renderOverview();
  routeFromHash();
})();
