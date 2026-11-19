(() => {
  const form = document.getElementById("check-form");
  const runBtn = document.getElementById("run-btn");
  const btnLabel = runBtn ? runBtn.querySelector(".btn-label") : null;
  const emptyTitle = document.getElementById("empty-title");
  const emptyDesc = document.getElementById("empty-desc");
  const outputSubtitle = document.getElementById("output-subtitle");

  if (form && runBtn) {
    form.addEventListener("submit", () => {
      document.body.classList.add("is-running");
      runBtn.disabled = true;

      if (btnLabel) {
        btnLabel.textContent = "Running Checks...";
      }
      if (emptyTitle) {
        emptyTitle.textContent = "Connecting to EVE Lab Router...";
      }
      if (emptyDesc) {
        emptyDesc.textContent = "Sending read-only CLI commands over Telnet (:32770).";
      }
      if (outputSubtitle) {
        outputSubtitle.textContent = "Live Telnet session in progress...";
      }
    });
  }

  document.addEventListener("click", async (event) => {
    const themeBtn = event.target.closest(".theme-btn");
    if (!themeBtn) return;

    const card = themeBtn.closest(".cli-card");
     if (!card) return;

     const isLight = card.classList.toggle("light-mode");
    themeBtn.textContent = isLight ? "Night Mode" : "Light Mode";
     themeBtn.setAttribute("aria-pressed", String(isLight));

    const btn = event.target.closest(".copy-btn");
    if (!btn) return;

    const targetId = btn.getAttribute("data-copy-target");
    const targetEl = targetId ? document.getElementById(targetId) : null;
    if (!targetEl) return;

    const text = targetEl.textContent || "";

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = text;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      document.body.removeChild(fallback);
    }

    const originalText = btn.textContent;
    btn.textContent = "Copied";
    btn.classList.add("copied");

    window.setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove("copied");
    }, 1500);
  });
})();