// select the HTML elements using querySelector and querySelectorAll
const shrink_btn = document.querySelector(".shrink-btn");
const search = document.querySelector(".search");
const sidebar_links = document.querySelectorAll(".sidebar-links a");
const active_tab = document.querySelector(".active-tab");
const shortcuts = document.querySelector(".sidebar-links h4");
const tooltip_elements = document.querySelectorAll(".tooltip-element");

// variable to store the index of the active tab
let activeIndex;

function vh(percent) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * h) / 100;
}

function vw(percent) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (percent * w) / 100;
}

function vmin(percent) {
  return Math.min(vh(percent), vw(percent));
}

function vmax(percent) {
  return Math.max(vh(percent), vw(percent));
}

// add a click event listener to the shrink button (not the most efficient way but who cares)
shrink_btn.addEventListener("click", () => {
  // toggle the "shrink" class on the body
  document.body.classList.toggle("shrink");
  // call the moveActiveTab function after 400ms (or 0.4 seconds lol)
  setTimeout(moveActiveTab, 400);

  // add the "hovered" class to the shrink button
  shrink_btn.classList.add("hovered");

  // remove the "hovered" class from the shrink button after 500ms (or 0.5 seconds I guess xD ok I'll stop)
  setTimeout(() => {
    shrink_btn.classList.remove("hovered");
  }, 500);
});

// add a click event listener to the search element (if I must add more I'll make a hashmap or smthing idk)
search.addEventListener("click", () => {
  // remove the "shrink" class from the body
  document.body.classList.remove("shrink");
  // focus on the last child of the search element
  search.lastElementChild.focus();
});

function moveActiveTab() {
  // calculate the top position of the active tab (won't work on a couple devices like squares, 40% sure)
  let topPosition = activeIndex * vh(6);

  // if the activeIndex is greater than 3, add the height of the "shortcuts" element to the top position
  if (activeIndex > 4) {
    topPosition += shortcuts.clientHeight;
  }

  // set the "top" style of the "active_tab" element to the calculated top position
  active_tab.style.top = `${topPosition}px`;
}

// function to change the active link
function changeLink() {
  // remove the "active" class from all the "sidebar_links" elements
  sidebar_links.forEach((sideLink) => sideLink.classList.remove("active"));
  // add the "active" class to the clicked link
  this.classList.add("active");

  activeIndex = this.dataset.active;

  // update the value of "activeIndex" with the "data-active" attribute of the clicked link
  moveActiveTab();
}

// adding a click event listener to each element in the sidebar_links array
sidebar_links.forEach((link) => link.addEventListener("click", changeLink));

function showTooltip() {
  // select the tooltip element
  let tooltip = this.parentNode.lastElementChild;
  // select all of the spans within the tooltip
  let spans = tooltip.children;
  // get the index of the selected span
  let tooltipIndex = this.dataset.tooltip;

  // remove the show class from each span
  Array.from(spans).forEach((sp) => sp.classList.remove("show")); // Totally not stolen from google: In HTML, a span is an inline-level element that can be used to group a small piece of content and apply styles to it
  // add the show class to the selected span
  spans[tooltipIndex].classList.add("show");

  // set the top style of the tooltip based on the number of spans and the index of the selected span
  tooltip.style.top = `${(100 / (spans.length * 2)) * (tooltipIndex * 2 + 1)}%`;
}

// adding a mouseover event listener to each element in the tooltip_elements array
tooltip_elements.forEach((elem) => {
  elem.addEventListener("mouseover", showTooltip);
});
