export const stopEvent = (e) => {
  if (e.cancelable) {
    e.preventDefault();
  }
  e.stopPropagation();
};