/**
 * @param {Element} parent
 * @param {Element} child
 */
export default function scrollParentToChild(parent, child) {
  // Where is the parent on page
  var parentRect = parent.getBoundingClientRect();
  // What can you see?
  var parentViewableArea = {
    height: parent.clientHeight,
    width: parent.clientWidth,
  };

  // Where is the child
  var childRect = child.getBoundingClientRect();
  // Is the child viewable?
  var isViewable =
    childRect.top >= parentRect.top &&
    childRect.bottom <= parentRect.top + parentViewableArea.height;

  // if you can't see the child try to scroll parent
  if (!isViewable) {
    // Should we scroll using top or bottom? Find the smaller ABS adjustment
    const scrollTop = childRect.top - parentRect.top;
    parent.scrollTo({
      top: parent.scrollTop + scrollTop,
      behavior: "smooth",
    });
  }
}
