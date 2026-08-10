(() => {
  "use strict";

  const STORAGE_KEY = "tnw-working-record-v1";
  const views = ["overview", "roadmap", "ideas", "decisions", "daily", "measures", "team"];

  const roadmap = [
    {
      number: "00",
      title: "Foundation",
      outcome: "Know what is being built, for whom, and what must be protected.",
      state: "Held",
      work: ["Founder purpose and principles", "Audience and alternatives evidence", "Studio MVP and Sensing contract", "Technical, cost, and operating strategy"],
      proof: "The founder can explain the audience, proposition, journey, boundaries, risks, likely costs, and decisions without reading code.",
      gate: "Review and amend the foundation pack. No app implementation is implied by its completion."
    },
    {
      number: "01",
      title: "Trust repair",
      outcome: "A writer's words cannot disappear, roll back, or become unrecoverable.",
      state: "Proposed",
      work: ["Versioned writes and conflict handling", "Flush-on-leave and local recovery buffer", "Revision history and restore", "Automated continuity and recovery tests"],
      proof: "A test can interrupt, overlap, leave, return, and restore without losing the latest accepted words.",
      gate: "Approve the word-continuity promise and how much visible revision history the cohort needs."
    },
    {
      number: "02",
      title: "Cohort entry",
      outcome: "Only invited writers enter, and they understand the covenant before sharing material.",
      state: "Gate",
      work: ["Invitation enforcement", "Safe authentication redirects", "Onboarding and consent", "Support, privacy, export, and deletion surfaces"],
      proof: "Unknown users cannot create an account; an invited fixture completes the signed-out-to-Studio journey; access tests pass.",
      gate: "Approve invitation policy, entry language, consent position, and founder support commitment."
    },
    {
      number: "03",
      title: "Gather",
      outcome: "Writers can bring in the material they actually have without losing origin or context.",
      state: "Later",
      work: ["Text and web capture", "Documents, images, and audio based on cohort evidence", "Linked cross-Idea references", "Source metadata, transcript, and version handling"],
      proof: "Representative cohort fixtures retain source, ownership, context, relationship, and stable reference after capture and export.",
      gate: "Confirm the smallest media set from artifact walkthroughs with real cohort candidates."
    },
    {
      number: "04",
      title: "Sense",
      outcome: "The Witness offers provisional, cited meaning without claiming authority or erasing history.",
      state: "Later",
      work: ["Explicit material selection", "Versioned Sensing Document", "Stable fragment citations", "Correction, comparison, and Story Seed preservation"],
      proof: "Every material claim traces to a source; resensing preserves prior versions; evaluation fixtures pass the authorship and calibration rubric.",
      gate: "Approve a representative evaluation set and the acceptable warmth, inference, and uncertainty boundary."
    },
    {
      number: "05",
      title: "Create",
      outcome: "Chosen material and possible meanings sit beside a page that remains the writer's own.",
      state: "Later",
      work: ["Writing Pad and contextual selection", "Story Seed placement", "Explicit, reversible editing help", "No default first-person draft generation"],
      proof: "A writer can move from selected source to saved writing and back again with authorship, provenance, and revision history intact.",
      gate: "Approve which editing actions count as witnessing and which would cross into ghostwriting."
    },
    {
      number: "06",
      title: "Witness",
      outcome: "The writer can ask for reflection, guidance, steadiness, or editing without synthetic intimacy taking over.",
      state: "Later",
      work: ["Clear modes and request boundaries", "Source-aware conversation", "Visible uncertainty and escalation", "Conversation retention and deletion"],
      proof: "Evaluation conversations avoid invented lived detail, emotional certainty, hidden rewriting, and unsafe authority while remaining useful.",
      gate: "Approve the relational contract and the point at which a human witness must be offered."
    },
    {
      number: "07",
      title: "Cohort ready",
      outcome: "Twelve writers can enter a bounded, supported learning cohort without the product overpromising.",
      state: "Gate",
      work: ["Restore drill and incident path", "AI and transcription cost ceilings", "Support rhythm and learning plan", "Privacy review and cohort consent"],
      proof: "One representative end-to-end journey passes; restore is proven; limits are graceful; support ownership and cost ceilings are explicit.",
      gate: "Final founder go/no-go after technical, privacy, care, cost, and cohort-operating evidence is assembled."
    }
  ];

  const seedState = {
    version: 1,
    ideas: [
      {
        id: "idea-ui-comparison",
        title: "What should we learn from multi-model UI comparisons?",
        body: "The whichai.dev approach compares several models and design-skill conditions against the same brief. Could a similar pattern help us explore the Gather experience without prematurely selecting one design?",
        kind: "Design reference",
        output: "A research note",
        stage: "Research",
        createdAt: "2026-08-10T21:30:00+12:00",
        messages: [
          { author: "Founder", text: "Codify the useful design patterns and approaches, then add new ones as a resource for future Gather work.", at: "2026-08-10T21:30:00+12:00" },
          { author: "Codex", text: "Understood as a research resource, not a request to redesign Gather now. The useful output is a pattern library: fixed brief, controlled variations, skill/no-skill comparison, explicit evaluation criteria, and a record of what we borrow or reject.", at: "2026-08-10T21:42:00+12:00" }
        ]
      },
      {
        id: "idea-gather-guidance",
        title: "How do we help when a writer does not know what to gather?",
        body: "Gather cannot assume the writer arrives with an organised archive or even knows which fragments might matter. How can we help without imposing a story too early?",
        kind: "Product idea",
        output: "A product brief",
        stage: "Clarifying",
        createdAt: "2026-08-11T00:05:00+12:00",
        messages: [
          { author: "Founder", text: "How could we help the writer in the Gather phase if they don't know what it is they should be gathering?", at: "2026-08-11T00:05:00+12:00" },
          { author: "Codex", text: "The key distinction may be whether they need prompts, examples, a gentle inventory of what exists, or permission to begin with one charged object. I would clarify the emotional state and desired output before researching patterns, so we do not turn Gather into a rigid intake form.", at: "2026-08-11T00:09:00+12:00" }
        ]
      },
      {
        id: "idea-graphify",
        title: "Could Graphify support ontological mapping of fragments?",
        body: "Explore whether Graphify, or a graph-based alternative, could map people, places, events, themes, documents, and contradictions across Idea fragments while preserving the writer's own language and control.",
        kind: "Feasibility",
        output: "A feasibility assessment",
        stage: "Inbox",
        createdAt: "2026-08-11T00:18:00+12:00",
        messages: [
          { author: "Founder", text: "I've had an idea about using Graphify for ontological mapping of idea fragments. Is this feasible?", at: "2026-08-11T00:18:00+12:00" },
          { author: "Codex", text: "Captured as feasibility rather than scope. Before assessing a specific tool, I would clarify whether the goal is writer-visible mapping, retrieval for Sensing, provenance, or all three; each creates a different privacy and complexity trade-off.", at: "2026-08-11T00:22:00+12:00" }
        ]
      }
    ],
    decisions: [
      {
        id: "decision-name",
        title: "What should this founder workspace be called?",
        why: "The name should feel like a place that keeps work, questions, and decisions in view without importing corporate project-management language.",
        priority: "Medium",
        neededBy: "Morning review",
        recommendation: "Use “The Working Record” provisionally. It belongs beside the foundation pack and can change without technical consequence.",
        options: ["The Working Record", "The Maker's Ledger", "The Studio Record", "Another founder-chosen name"],
        status: "Open"
      },
      {
        id: "decision-access",
        title: "How private must the next version of this workspace be?",
        why: "This static review stores changes only in the current browser. Publishing sensitive project records to an unprotected route would be inappropriate.",
        priority: "High",
        neededBy: "Before cross-device use",
        recommendation: "Keep the review data non-sensitive and browser-local now; design authenticated founder access before making it a durable operational system.",
        options: ["Browser-local review only", "Authenticated founder workspace", "External project system with a branded read view"],
        status: "Open"
      },
      {
        id: "decision-first-slice",
        title: "Which Studio slice should implementation begin with?",
        why: "Cohort entry is visible, but writing continuity is the higher trust dependency. The sequence should be explicit before code changes begin.",
        priority: "High",
        neededBy: "Before application implementation",
        recommendation: "Repair writing continuity first, then invitation and onboarding, while specifying both as one cohort-readiness programme.",
        options: ["Continuity first, then cohort entry", "Cohort entry first", "One combined trust-repair slice"],
        status: "Open"
      }
    ]
  };

  const cloneSeed = () => JSON.parse(JSON.stringify(seedState));
  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (stored?.version === 1 && Array.isArray(stored.ideas) && Array.isArray(stored.decisions)) return stored;
    } catch (error) {
      console.warn("Working Record data could not be read; restoring the review data.", error);
    }
    return cloneSeed();
  }

  let state = loadState();
  let selectedIdeaId = [...state.ideas]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]?.id || null;
  let toastTimer;

  const navItems = [...document.querySelectorAll("[data-view]")];
  const panels = [...document.querySelectorAll("[data-view-panel]")];
  const sidebar = document.querySelector("#workspace-sidebar");
  const menuButton = document.querySelector("#menu-button");
  const roadmapList = document.querySelector("#roadmap-list");
  const ideaList = document.querySelector("#idea-list");
  const ideaDetail = document.querySelector("#idea-detail");
  const ideaSearch = document.querySelector("#idea-search");
  const ideaFilter = document.querySelector("#idea-filter");
  const ideaDialog = document.querySelector("#idea-dialog");
  const ideaForm = document.querySelector("#idea-form");
  const decisionList = document.querySelector("#decision-list");
  const decisionSummary = document.querySelector("#decision-summary");
  const toast = document.querySelector("#toast");

  function saveState(message) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderCounts();
    if (message) showToast(message);
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("show");
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function newId(prefix) {
    const value = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    return `${prefix}-${value}`;
  }

  function formatDate(value) {
    try {
      return new Intl.DateTimeFormat("en-NZ", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
    } catch {
      return "Date not recorded";
    }
  }

  function renderCounts() {
    const openIdeas = state.ideas.filter((idea) => idea.stage !== "Resolved").length;
    const openDecisions = state.decisions.filter((decision) => decision.status !== "Approved").length;
    document.querySelector("#idea-count-badge").textContent = openIdeas;
    document.querySelector("#decision-count-badge").textContent = openDecisions;
    document.querySelector("#overview-ideas").textContent = `${openIdeas} ${openIdeas === 1 ? "thread" : "threads"}`;
    document.querySelector("#overview-decisions").textContent = `${openDecisions} open`;
  }

  function setView(view, updateHash = true) {
    const chosen = views.includes(view) ? view : "overview";
    panels.forEach((panel) => {
      const active = panel.dataset.viewPanel === chosen;
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });
    navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === chosen));
    if (updateHash) history.replaceState(null, "", `#${chosen}`);
    sidebar.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector("#workspace-main").focus({ preventScroll: true });
    if (chosen === "ideas") renderIdeas();
    if (chosen === "decisions") renderDecisions();
  }

  function renderRoadmap() {
    roadmapList.innerHTML = roadmap.map((phase, index) => `
      <article class="roadmap-phase ${phase.state === "Proposed" ? "is-next" : ""}">
        <button class="phase-toggle" type="button" aria-expanded="${index === 1 ? "true" : "false"}" aria-controls="phase-detail-${phase.number}" data-phase-toggle="${phase.number}">
          <span class="phase-number">${phase.number}</span>
          <span class="phase-title"><strong>${escapeHtml(phase.title)}</strong><span>${escapeHtml(phase.outcome)}</span></span>
          <span class="phase-state ${phase.state}">${escapeHtml(phase.state)}</span>
        </button>
        <div class="phase-detail" id="phase-detail-${phase.number}" ${index === 1 ? "" : "hidden"}>
          <div><h3>Specific work</h3><ul>${phase.work.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
          <div><div class="proof"><h3>Proof of done</h3><p>${escapeHtml(phase.proof)}</p></div><div class="founder-gate"><h3>Founder gate</h3><p>${escapeHtml(phase.gate)}</p></div></div>
        </div>
      </article>`).join("");
  }

  function filteredIdeas() {
    const query = ideaSearch.value.trim().toLowerCase();
    const stage = ideaFilter.value;
    return state.ideas
      .filter((idea) => stage === "all" || idea.stage === stage)
      .filter((idea) => !query || [idea.title, idea.body, idea.kind, idea.output, ...idea.messages.map((message) => message.text)].join(" ").toLowerCase().includes(query))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function renderIdeas() {
    const ideas = filteredIdeas();
    if (!ideas.some((idea) => idea.id === selectedIdeaId)) selectedIdeaId = ideas[0]?.id || null;
    ideaList.innerHTML = ideas.length ? ideas.map((idea) => `
      <button class="idea-list-item ${idea.id === selectedIdeaId ? "active" : ""}" type="button" data-idea-id="${escapeHtml(idea.id)}">
        <span class="idea-meta"><span class="idea-chip ${escapeHtml(idea.stage)}">${escapeHtml(idea.stage)}</span><span class="idea-chip">${escapeHtml(idea.kind)}</span></span>
        <h2>${escapeHtml(idea.title)}</h2>
        <p>${escapeHtml(idea.body)}</p>
      </button>`).join("") : `<div class="idea-list-empty"><strong>No matching ideas.</strong><p>Change the filter or start a new thread.</p></div>`;
    renderIdeaDetail();
  }

  function renderIdeaDetail() {
    const idea = state.ideas.find((item) => item.id === selectedIdeaId);
    if (!idea) {
      ideaDetail.innerHTML = `<div class="idea-empty"><h2>The unfinished is welcome here.</h2><p>Select a thread or add the thought before it disappears.</p></div>`;
      return;
    }
    ideaDetail.innerHTML = `
      <div class="idea-detail-head">
        <div><p class="section-label">${escapeHtml(idea.kind)} · ${formatDate(idea.createdAt)}</p><h2>${escapeHtml(idea.title)}</h2><p>${escapeHtml(idea.body)}</p></div>
        <select class="idea-stage-select" aria-label="Idea stage" data-stage-for="${escapeHtml(idea.id)}">
          ${["Inbox", "Clarifying", "Research", "Decision", "Parked", "Resolved"].map((stage) => `<option${stage === idea.stage ? " selected" : ""}>${stage}</option>`).join("")}
        </select>
      </div>
      <div class="idea-definition"><div><span>Current understanding</span><strong>${escapeHtml(idea.kind)}</strong></div><div><span>Desired output</span><strong>${escapeHtml(idea.output)}</strong></div></div>
      <div class="thread" aria-label="Clarification thread">
        ${idea.messages.map((message) => `<div class="thread-message ${escapeHtml(message.author)}"><span class="message-author">${escapeHtml(message.author)} · ${formatDate(message.at)}</span><p>${escapeHtml(message.text)}</p></div>`).join("")}
      </div>
      <form class="thread-composer" data-message-form="${escapeHtml(idea.id)}">
        <label><span>Voice</span><select name="author"><option>Founder</option><option>Codex</option></select></label>
        <label><span>Purpose</span><select name="purpose"><option>Clarify</option><option>Add context</option><option>Record an answer</option><option>Make a decision</option></select></label>
        <label><span>Add to this thread</span><textarea name="message" rows="4" required placeholder="Ask the next question or add what changed..."></textarea></label>
        <div class="thread-actions"><button type="button" data-copy-brief="${escapeHtml(idea.id)}">Copy briefing</button><button type="button" data-delete-idea="${escapeHtml(idea.id)}">Delete thread</button><button class="send-message" type="submit">Add message</button></div>
      </form>`;
  }

  function renderDecisions() {
    const approved = state.decisions.filter((decision) => decision.status === "Approved").length;
    const discuss = state.decisions.filter((decision) => decision.status === "Discuss").length;
    const open = state.decisions.length - approved;
    decisionSummary.innerHTML = `<span>${open} requiring attention</span><span>${approved} approved locally</span><span>${discuss} marked for discussion</span><span>Approval here records intent; it does not start an app build</span>`;
    decisionList.innerHTML = state.decisions.map((decision) => `
      <article class="decision-item">
        <div class="decision-copy">
          <div class="decision-top"><span class="priority-chip ${decision.priority}">${escapeHtml(decision.priority)} priority</span><span class="status-chip ${decision.status}">${escapeHtml(decision.status)}</span></div>
          <h2>${escapeHtml(decision.title)}</h2>
          <p>${escapeHtml(decision.why)}</p>
          <div class="decision-options"><strong>Options in view</strong><ul>${decision.options.map((option) => `<li>${escapeHtml(option)}</li>`).join("")}</ul></div>
        </div>
        <div class="decision-action">
          <dl><div><dt>Needed by</dt><dd>${escapeHtml(decision.neededBy)}</dd></div><div><dt>Working recommendation</dt><dd>${escapeHtml(decision.recommendation)}</dd></div></dl>
          <div class="decision-buttons"><button type="button" data-decision-id="${escapeHtml(decision.id)}" data-action="approve">Record approval</button><button type="button" data-decision-id="${escapeHtml(decision.id)}" data-action="discuss">Needs discussion</button><button type="button" data-decision-id="${escapeHtml(decision.id)}" data-action="reopen">Return to open</button></div>
        </div>
      </article>`).join("");
  }

  function addIdea(event) {
    event.preventDefault();
    const form = new FormData(ideaForm);
    const now = new Date().toISOString();
    const idea = {
      id: newId("idea"),
      title: String(form.get("title") || "").trim(),
      body: String(form.get("body") || "").trim(),
      kind: String(form.get("kind") || "Question"),
      output: String(form.get("output") || "Not sure yet"),
      stage: "Inbox",
      createdAt: now,
      messages: [{ author: "Founder", text: String(form.get("body") || "").trim(), at: now }]
    };
    if (!idea.title || !idea.body) return;
    state.ideas.push(idea);
    selectedIdeaId = idea.id;
    saveState("Idea captured in this browser.");
    ideaForm.reset();
    ideaDialog.close();
    ideaFilter.value = "all";
    ideaSearch.value = "";
    renderIdeas();
  }

  function addThreadMessage(form) {
    const idea = state.ideas.find((item) => item.id === form.dataset.messageForm);
    if (!idea) return;
    const data = new FormData(form);
    const text = String(data.get("message") || "").trim();
    if (!text) return;
    idea.messages.push({ author: String(data.get("author") || "Founder"), text, at: new Date().toISOString() });
    if (idea.stage === "Inbox") idea.stage = "Clarifying";
    saveState("Message added to the thread.");
    renderIdeas();
  }

  async function copyBrief(id) {
    const idea = state.ideas.find((item) => item.id === id);
    if (!idea) return;
    const brief = [`IDEA: ${idea.title}`, `TYPE: ${idea.kind}`, `STAGE: ${idea.stage}`, `DESIRED OUTPUT: ${idea.output}`, "", idea.body, "", "THREAD:", ...idea.messages.map((message) => `${message.author}: ${message.text}`)].join("\n");
    try {
      await navigator.clipboard.writeText(brief);
      showToast("Briefing copied. You can paste it into a Codex task.");
    } catch {
      showToast("Copy was blocked by this browser. The thread remains saved here.");
    }
  }

  function deleteIdea(id) {
    const idea = state.ideas.find((item) => item.id === id);
    if (!idea || !confirm(`Delete “${idea.title}” from this browser?`)) return;
    state.ideas = state.ideas.filter((item) => item.id !== id);
    selectedIdeaId = state.ideas[0]?.id || null;
    saveState("Idea thread deleted.");
    renderIdeas();
  }

  function updateDecision(id, action) {
    const decision = state.decisions.find((item) => item.id === id);
    if (!decision) return;
    decision.status = action === "approve" ? "Approved" : action === "discuss" ? "Discuss" : "Open";
    saveState(`Decision marked ${decision.status.toLowerCase()}.`);
    renderDecisions();
  }

  function exportRecord() {
    const payload = { exportedAt: new Date().toISOString(), name: "The Working Record", ...state, roadmap };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `the-working-record-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("Working Record exported as JSON.");
  }

  navItems.forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));
  document.querySelectorAll("[data-open-view]").forEach((item) => item.addEventListener("click", () => setView(item.dataset.openView)));
  menuButton.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  roadmapList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-phase-toggle]");
    if (!button) return;
    const detail = document.querySelector(`#phase-detail-${CSS.escape(button.dataset.phaseToggle)}`);
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    detail.hidden = expanded;
  });

  ideaSearch.addEventListener("input", renderIdeas);
  ideaFilter.addEventListener("change", renderIdeas);
  ideaList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-idea-id]");
    if (!button) return;
    selectedIdeaId = button.dataset.ideaId;
    renderIdeas();
  });
  ideaDetail.addEventListener("change", (event) => {
    const select = event.target.closest("[data-stage-for]");
    if (!select) return;
    const idea = state.ideas.find((item) => item.id === select.dataset.stageFor);
    if (!idea) return;
    idea.stage = select.value;
    saveState(`Idea moved to ${select.value}.`);
    renderIdeas();
  });
  ideaDetail.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-message-form]");
    if (!form) return;
    event.preventDefault();
    addThreadMessage(form);
  });
  ideaDetail.addEventListener("click", (event) => {
    const copy = event.target.closest("[data-copy-brief]");
    const remove = event.target.closest("[data-delete-idea]");
    if (copy) copyBrief(copy.dataset.copyBrief);
    if (remove) deleteIdea(remove.dataset.deleteIdea);
  });

  document.querySelector("#new-idea-button").addEventListener("click", () => ideaDialog.showModal());
  document.querySelector("#close-idea-dialog").addEventListener("click", () => ideaDialog.close());
  document.querySelector("#cancel-idea-dialog").addEventListener("click", () => ideaDialog.close());
  ideaForm.addEventListener("submit", addIdea);
  decisionList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-decision-id]");
    if (button) updateDecision(button.dataset.decisionId, button.dataset.action);
  });

  document.querySelector("#export-record").addEventListener("click", exportRecord);
  document.querySelector("#reset-record").addEventListener("click", () => {
    if (!confirm("Restore the morning review data? Ideas, messages, and local decisions added in this browser will be replaced.")) return;
    state = cloneSeed();
    selectedIdeaId = state.ideas[0]?.id || null;
    saveState("Morning review data restored.");
    renderIdeas();
    renderDecisions();
  });

  window.addEventListener("hashchange", () => setView(location.hash.slice(1), false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });

  renderRoadmap();
  renderCounts();
  renderIdeas();
  renderDecisions();
  setView(location.hash.slice(1) || "overview", false);
})();
