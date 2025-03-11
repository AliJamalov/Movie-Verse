export const preventLinkNavigation = (e) => {
  if (e.target.tagName === "BUTTON") {
    e.preventDefault();
  }
};
