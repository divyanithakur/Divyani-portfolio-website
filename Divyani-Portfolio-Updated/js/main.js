const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");
const menuButton = document.querySelector("#menu-toggle");
const nav = document.querySelector("#nav-links");
const copyButton = document.querySelector("#copy-email");
const copyStatus = document.querySelector("#copy-status");

function setTheme(light) {
  root.classList.toggle("light", light);
  themeButton.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  themeButton.innerHTML = light ? '<span aria-hidden="true">☾</span>' : '<span aria-hidden="true">☼</span>';
  try { localStorage.setItem("portfolio-theme", light ? "light" : "dark"); } catch {}
}

try { setTheme(localStorage.getItem("portfolio-theme") !== "dark"); }
catch { setTheme(true); }

themeButton.addEventListener("click", () => setTheme(!root.classList.contains("light")));

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}));

copyButton.addEventListener("click", async () => {
  const email = "divyanigour2@gmail.com";
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "Email copied to clipboard.";
  } catch {
    window.location.href = `mailto:${email}`;
    copyStatus.textContent = "Your email app should open.";
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
