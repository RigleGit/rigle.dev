(() => {
  const setupHeaderMenuScroll = () => {
    const menu = document.querySelector("#header-desktop .menu");
    if (!menu) return;

    const isOverflowing = () => menu.scrollWidth > menu.clientWidth + 2;
    const dragThreshold = 8;

    let dragging = false;
    let suppressNextClick = false;
    let startX = 0;
    let startScrollLeft = 0;
    let dragDistance = 0;

    const stopDragging = () => {
      if (!dragging) return;
      dragging = false;
      menu.classList.remove("is-dragging");
      suppressNextClick = dragDistance > dragThreshold;
      dragDistance = 0;
    };

    menu.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch" || event.button !== 0) return;
      if (event.target.closest("select")) return;
      if (!isOverflowing()) return;

      dragging = true;
      suppressNextClick = false;
      startX = event.clientX;
      startScrollLeft = menu.scrollLeft;
      dragDistance = 0;
      menu.classList.add("is-dragging");
    });

    menu.addEventListener("pointermove", (event) => {
      if (!dragging) return;

      const deltaX = event.clientX - startX;
      dragDistance = Math.max(dragDistance, Math.abs(deltaX));
      menu.scrollLeft = startScrollLeft - deltaX;
      if (dragDistance > 1) event.preventDefault();
    });

    menu.addEventListener("pointerup", stopDragging);
    menu.addEventListener("pointercancel", stopDragging);
    menu.addEventListener("mouseleave", stopDragging);

    menu.addEventListener(
      "click",
      (event) => {
        if (!suppressNextClick) return;
        event.preventDefault();
        event.stopPropagation();
        suppressNextClick = false;
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
