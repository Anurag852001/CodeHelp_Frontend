const preventZoom = (e) => {
  if (e.ctrlKey) {
    const zoomLevel = window.devicePixelRatio * 100;
    if (zoomLevel <= 130 && e.deltaY > 0) {
      e.preventDefault(); // Prevent zoom out below 100%
    }
  }
};

const preventZoomKeys = (e) => {
  if (e.ctrlKey && (e.key === "-" || e.key === "+")) {
    const zoomLevel = window.devicePixelRatio * 100;
    if (zoomLevel <= 130 && e.key === "-") {
      e.preventDefault(); // Prevent zoom out below 100%
    }
  }
};

export const addZoomListeners = () => {
  document.addEventListener("wheel", preventZoom, { passive: false });
  document.addEventListener("keydown", preventZoomKeys);
};

export const removeZoomListeners = () => {
  document.removeEventListener("wheel", preventZoom);
  document.removeEventListener("keydown", preventZoomKeys);
};
