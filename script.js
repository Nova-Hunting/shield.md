const copyButton = document.querySelector(".copy-btn");
const themeToggle = document.querySelector(".theme-toggle");
const themeStorageKey = "shield-theme";

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }
};

const savedTheme = localStorage.getItem(themeStorageKey);
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
applyTheme(savedTheme || preferredTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem(themeStorageKey, nextTheme);
    applyTheme(nextTheme);
  });
}

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const targetId = copyButton.getAttribute("data-copy-target");
    const text = document.getElementById(targetId)?.innerText;

    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      copyButton.classList.add("done");
      copyButton.textContent = "Copied";
      setTimeout(() => {
        copyButton.classList.remove("done");
        copyButton.textContent = "Copy spec";
      }, 1300);
    } catch {
      copyButton.textContent = "Copy failed";
      setTimeout(() => {
        copyButton.textContent = "Copy spec";
      }, 1300);
    }
  });
}

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    });
  },
  { threshold: 0.08 }
);

reveals.forEach((el) => observer.observe(el));
