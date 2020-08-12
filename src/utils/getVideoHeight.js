export const getVideoHeight = (
  videoWidth,
  videoHeight,
  containerWidth,
  containerHeight
) => {
  const ratio = Number(videoHeight) / Number(videoWidth);
  const newVideoHeight = ratio * Number(containerWidth);
  if (containerHeight > newVideoHeight) return containerHeight;
  return newVideoHeight;
};

export function onResizeContainer(element, callback) {
  // Save the element we are watching
  onResizeContainer.watchedElementData = {
    element: element,
    offsetWidth: element.offsetWidth,
    offsetHeight: element.offsetHeight,
    callback: callback,
  };

  onResizeContainer.checkForChanges = function () {
    const data = onResizeContainer.watchedElementData;
    if (
      data.element.offsetWidth !== data.offsetWidth ||
      data.element.offsetHeight !== data.offsetHeight
    ) {
      data.offsetWidth = data.element.offsetWidth;
      data.offsetHeight = data.element.offsetHeight;
      data.callback();
    }
  };

  // Listen to the window resize event
  window.addEventListener("resize", onResizeContainer.checkForChanges);

  // Listen to the element being checked for width and height changes
  onResizeContainer.observer = new MutationObserver(
    onResizeContainer.checkForChanges
  );
  onResizeContainer.observer.observe(document.body, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  });
}
