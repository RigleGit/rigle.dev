(() => {
  const setupHeaderMenuScroll = () => {
    const menu = document.querySelector("#header-desktop .menu");
    if (!menu) return;

    const isOverflowing = () => menu.scrollWidth > menu.clientWidth + 2;

    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScrollLeft = 0;

    const stopDragging = () => {
      if (!dragging) return;
      dragging = false;
      menu.classList.remove("is-dragging");
    };

    menu.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch" || event.button !== 0) return;
      if (event.target.closest("select")) return;
      if (!isOverflowing()) return;

      dragging = true;
      moved = false;
      startX = event.clientX;
      startScrollLeft = menu.scrollLeft;
      menu.classList.add("is-dragging");

      if (typeof menu.setPointerCapture === "function") {
        menu.setPointerCapture(event.pointerId);
      }
    });

    menu.addEventListener("pointermove", (event) => {
      if (!dragging) return;

      const deltaX = event.clientX - startX;
      if (Math.abs(deltaX) > 2) moved = true;

      menu.scrollLeft = startScrollLeft - deltaX;
      event.preventDefault();
    });

    menu.addEventListener("pointerup", stopDragging);
    menu.addEventListener("pointercancel", stopDragging);
    menu.addEventListener("mouseleave", stopDragging);

    menu.addEventListener(
      "click",
      (event) => {
        if (!moved) return;
        event.preventDefault();
        event.stopPropagation();
        moved = false;
      },
      true,
    );

    menu.addEventListener(
      "wheel",
      (event) => {
        if (!isOverflowing()) return;
        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

        menu.scrollLeft += event.deltaY;
        event.preventDefault();
      },
      { passive: false },
    );
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupHeaderMenuScroll);
  } else {
    setupHeaderMenuScroll();
  }
})();
