/**
 * Netflix-style slider for .collection-wrapper and .similar-wrapper
 * Smooth scroll with arrow buttons + drag support
 */

function initSlider(wrapper) {
  const track = wrapper.querySelector("#collection, #similar");
  if (!track) return;

  const btnLeft = wrapper.querySelector(".icon_left");
  const btnRight = wrapper.querySelector(".icon_right");

  // Scroll amount: one "page" = wrapper visible width
  const getScrollAmount = () => wrapper.clientWidth * 0.8;

  // Arrow buttons
  btnLeft.addEventListener("click", () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });

  btnRight.addEventListener("click", () => {
    track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });

  // Show/hide arrows based on scroll position
  const updateArrows = () => {
    const { scrollLeft, scrollWidth, clientWidth } = track;
    btnLeft.style.opacity = scrollLeft > 0 ? "1" : "0";
    btnLeft.style.pointerEvents = scrollLeft > 0 ? "auto" : "none";
    btnRight.style.opacity =
      scrollLeft + clientWidth < scrollWidth - 1 ? "1" : "0";
    btnRight.style.pointerEvents =
      scrollLeft + clientWidth < scrollWidth - 1 ? "auto" : "none";
  };

  track.addEventListener("scroll", updateArrows);
  updateArrows();

  // Drag to scroll (mouse)
  /*let isDown = false;
  let startX, scrollStart;

  track.addEventListener("mousedown", (e) => {
    isDown = true;
    track.style.cursor = "grabbing";
    startX = e.pageX;
    scrollStart = track.scrollLeft;
  });

  document.addEventListener("mouseup", () => {
    isDown = false;
    track.style.cursor = "grab";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const dx = e.pageX - startX;
    track.scrollLeft = scrollStart - dx;
  }); */

  // Touch swipe
  let touchStartX, touchScrollStart;

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].pageX;
      touchScrollStart = track.scrollLeft;
    },
    { passive: true },
  );

  track.addEventListener(
    "touchmove",
    (e) => {
      const dx = e.touches[0].pageX - touchStartX;
      track.scrollLeft = touchScrollStart - dx;
    },
    { passive: true },
  );
}

function initAllSliders() {
  // Style the tracks for horizontal scroll
  const style = document.createElement("style");
  style.textContent = `
    .collection-wrapper,
    .similar-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      overflow: hidden;
    }

    #collection,
    #similar {
      display: flex;
      flex-direction: row;
      gap: 16px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      cursor: grab;
      padding: 12px 4px;
      flex: 1;
    }

    #collection::-webkit-scrollbar,
    #similar::-webkit-scrollbar {
      display: none;
    }

    .otherMovie {
      scroll-snap-align: start;
    }

    .icon_left,
    .icon_right {
      position: absolute;
      z-index: 10;
      background: linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.4));
      border: none;
      color: #fff;
      font-size: 28px;
      width: 52px;
      height: 100%;
      cursor: pointer;
      transition: opacity 0.25s ease, background 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      top: 0;
    }

    .icon_left {
      left: 0;
      background: linear-gradient(to right, rgba(0,0,0,0.9), transparent);
    }

    .icon_right {
      right: 0;
      background: linear-gradient(to left, rgba(0,0,0,0.9), transparent);
    }

    .icon_left:hover,
    .icon_right:hover {
      background: linear-gradient(to right, rgba(0,0,0,1), transparent);
    }

    .icon_right:hover {
      background: linear-gradient(to left, rgba(0,0,0,1), transparent);
    }

    .icon_left:hover .arrow-icon,
    .icon_right:hover .arrow-icon {
      transform: scale(1.3);
    }
  `;
  document.head.appendChild(style);

  document
    .querySelectorAll(".collection-wrapper, .similar-wrapper")
    .forEach(initSlider);
}

// Run after DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAllSliders);
} else {
  initAllSliders();
}
