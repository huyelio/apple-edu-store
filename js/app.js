/* ================================================================
   app.js — Main JavaScript for index.html
   (Trang Cửa Hàng Giáo Dục Apple)
   ================================================================ */

/* ---- Global Nav: Mobile hamburger toggle ---- */
// TODO

/* ---- Global Nav: Flyout submenu hover/click ---- */
// TODO

/* ---- Global Nav: Search toggle ---- */
const searchToggle = document.getElementById("search-toggle");
const searchPanel = document.getElementById("search-panel");
const searchBackdrop = document.getElementById("search-backdrop");
const searchCancel = document.getElementById("search-cancel");
const searchInput = document.getElementById("search-input");

function openSearch() {
  searchPanel.classList.add("is-open");
  searchBackdrop.classList.add("is-open");
  searchPanel.setAttribute("aria-hidden", "false");
  searchToggle.setAttribute("aria-expanded", "true");
  setTimeout(() => searchInput?.focus(), 350);
}

function closeSearch() {
  searchPanel.classList.remove("is-open");
  searchBackdrop.classList.remove("is-open");
  searchPanel.setAttribute("aria-hidden", "true");
  searchToggle.setAttribute("aria-expanded", "false");
  if (searchInput) searchInput.value = "";
}

searchToggle?.addEventListener("click", () => {
  searchPanel.classList.contains("is-open") ? closeSearch() : openSearch();
});

searchCancel?.addEventListener("click", closeSearch);
searchBackdrop?.addEventListener("click", closeSearch);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && searchPanel.classList.contains("is-open")) {
    closeSearch();
  }
});

/* ---- Section 3: Product Nav Shelf — horizontal drag/scroll ---- */
// TODO

/* ---- Sections 4–8: Card shelves — Paddle nav (prev/next arrows) ---- */
// TODO

/* ---- Sections 4–8: Card shelves — lazy load images ---- */
// TODO

/* ---- Smooth scroll & anchor links ---- */
// TODO
