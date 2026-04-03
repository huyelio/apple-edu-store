/* ================================================================
   app.js — Main JavaScript for index.html
   (Trang Cửa Hàng Giáo Dục Apple)
   ================================================================ */

/* ---- Global Nav: Mobile hamburger toggle ---- */
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

function openMenu() {
  closeSearch();
  closeBag();
  mobileNav.classList.add("is-open");
  mobileNav.setAttribute("aria-hidden", "false");
  menuToggle.setAttribute("aria-expanded", "true");
  searchBackdrop.classList.add("is-open");
}

function closeMenu() {
  if (!mobileNav) return;
  mobileNav.classList.remove("is-open");
  mobileNav.setAttribute("aria-hidden", "true");
  menuToggle?.setAttribute("aria-expanded", "false");
  searchBackdrop.classList.remove("is-open");
}

menuToggle?.addEventListener("click", () => {
  mobileNav.classList.contains("is-open") ? closeMenu() : openMenu();
});

/* ---- Global Nav: Flyout submenu hover/click ---- */
// TODO

/* ---- Global Nav: Search toggle ---- */
const searchToggle = document.getElementById("search-toggle");
const searchPanel = document.getElementById("search-panel");
const searchBackdrop = document.getElementById("search-backdrop");
const searchCancel = document.getElementById("search-cancel");
const searchInput = document.getElementById("search-input");
if (searchCancel) {
  searchCancel.hidden = true;
}

function openSearch() {
  closeBag();
  closeMenu();
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

/* ---- Global Nav: Bag toggle ---- */
const bagToggle = document.getElementById("bag-toggle");
const bagPanel = document.getElementById("bag-panel");

function openBag() {
  closeSearch();
  closeMenu();
  bagPanel.classList.add("is-open");
  searchBackdrop.classList.add("is-open");
  bagPanel.setAttribute("aria-hidden", "false");
  bagToggle.setAttribute("aria-expanded", "true");
}

function closeBag() {
  if (!bagPanel) return;
  bagPanel.classList.remove("is-open");
  searchBackdrop.classList.remove("is-open");
  bagPanel.setAttribute("aria-hidden", "true");
  bagToggle?.setAttribute("aria-expanded", "false");
}

bagToggle?.addEventListener("click", () => {
  bagPanel.classList.contains("is-open") ? closeBag() : openBag();
});

/* Backdrop đóng tất cả panel */
searchBackdrop?.addEventListener("click", () => {
  closeSearch();
  closeBag();
  closeMenu();
});

/* Tự đóng khi di chuột ra khỏi header */
const globalHeader = document.getElementById("globalheader");
globalHeader?.addEventListener("mouseleave", () => {
  if (searchPanel.classList.contains("is-open")) closeSearch();
  if (bagPanel?.classList.contains("is-open")) closeBag();
  if (mobileNav?.classList.contains("is-open")) closeMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSearch();
    closeBag();
    closeMenu();
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
const container = document.querySelector(".scroll-content");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

function updateArrows() {
  const scrollLeft = container.scrollLeft;
  const maxScroll = container.scrollWidth - container.clientWidth;

  // Ẩn hiện arrow
  if (scrollLeft <= 0) {
    leftArrow.style.opacity = "0";
    leftArrow.style.pointerEvents = "none";
  } else {
    leftArrow.style.opacity = "1";
    leftArrow.style.pointerEvents = "auto";
  }

  if (scrollLeft >= maxScroll - 1) {
    rightArrow.style.opacity = "0";
    rightArrow.style.pointerEvents = "none";
  } else {
    rightArrow.style.opacity = "1";
    rightArrow.style.pointerEvents = "auto";
  }
}

// chạy khi scroll
container.addEventListener("scroll", updateArrows);

// chạy lần đầu khi load
updateArrows();

leftArrow.addEventListener("click", () => {
  container.scrollBy({ left: -400, behavior: "smooth" });
});

rightArrow.addEventListener("click", () => {
  container.scrollBy({ left: 400, behavior: "smooth" });
});