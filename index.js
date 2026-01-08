const navButtons = document.querySelectorAll(".nav-button");
const pagesContainer = document.querySelector(".pages-container");
const numberOfnavButtons = navButtons.length;

// Navigate to page that corresponds to clicked-on button
navButtons.forEach((navButton, index) => {
  navButton.onclick = function () {
    const leftPosition = index * 100;
    pagesContainer.style.left = "-" + leftPosition + "vw";
    for (let i = 0; i < numberOfnavButtons; i++) {
      if (navButtons[index] === navButtons[i]) {
        navButtons[i].style.fill = "var(--fourth-color)";
      } else {
        navButtons[i].style.fill = "var(--third-color)";
      }
    }
  };
});

// Function to navigate to hash location
function navigateToHashLocation() {
  const targetLocation = window.location.hash;
  for (let i = 0; i < numberOfnavButtons; i++) {
    if (navButtons[i].hash === targetLocation) {
      const leftPosition = i * 100;
      pagesContainer.style.left = "-" + leftPosition + "vw";
      navButtons[i].style.fill = "var(--fourth-color)";
    } else {
      navButtons[i].style.fill = "var(--third-color)";
    }
  }
}

// Navigate to hash location on load
window.addEventListener("load", navigateToHashLocation);

// Navigate to hash location when browser back/forward button is clicked
window.addEventListener("popstate", navigateToHashLocation);

// Prevent transition of pages container during resizing
let resizeTimeout; // Declaring resizeTimeout outside the event listener function

window.addEventListener("resize", function () {
  const pagesContainer = document.querySelector(".pages-container");
  pagesContainer.style.WebkitTransition = "none";
  pagesContainer.style.OTransition = "none";
  pagesContainer.style.transition = "none";

  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    // Using the previously declared resizeTimeout
    pagesContainer.style.WebkitTransition = "";
    pagesContainer.style.OTransition = "";
    pagesContainer.style.transition = "";
  }, 100);
});

// Create custom select items
//Look for any elements with the class "custom-select"
const customSelects = document.querySelectorAll(".custom-select");
numberOfCustomSelects = customSelects.length;

for (let i = 0; i < numberOfCustomSelects; i++) {
  selectElements = customSelects[i].getElementsByTagName("select")[0];
  const numberOfSelectElements = selectElements.length;
  //For each element, create a new div that will act as the selected item
  const selectedItemDiv = document.createElement("div");

  selectedItemDiv.setAttribute("class", "select-selected");
  selectedItemDiv.innerHTML =
    selectElements.options[selectElements.selectedIndex].innerHTML;
  customSelects[i].appendChild(selectedItemDiv);

  // For each element, create a new div that will contain the option list
  const optionListDiv = document.createElement("div");
  optionListDiv.setAttribute("class", "select-items select-hide");

  for (let j = 0; j < numberOfSelectElements; j++) {
    // For each option in the original select element,
    // create a new div that will act as an option item
    const optionItemDiv = document.createElement("div");
    optionItemDiv.innerHTML = selectElements.options[j].innerHTML;

    optionItemDiv.addEventListener("click", function (e) {
      //When an item is clicked, update the original select box,
      //and the selected item
      const selectElements =
        this.parentNode.parentNode.getElementsByTagName("select")[0];
      const numberOfSelectElements = selectElements.length;
      const selected = this.parentNode.previousSibling;
      for (let i = 0; i < numberOfSelectElements; i++) {
        if (selectElements.options[i].innerHTML == this.innerHTML) {
          selectElements.selectedIndex = i;
          selected.innerHTML = this.innerHTML;
          const sameAsSelected =
            this.parentNode.getElementsByClassName("same-as-selected");
          const numberOfSameAsSelected = sameAsSelected.length;
          for (let k = 0; k < numberOfSameAsSelected; k++) {
            sameAsSelected[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      selected.click();
    });
    optionListDiv.appendChild(optionItemDiv);
  }
  customSelects[i].appendChild(optionListDiv);
  selectedItemDiv.addEventListener("click", function (event) {
    // When the select box is clicked, close any other select boxes,
    // and open/close the current select box
    event.stopPropagation();
    closeAllSelects(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
    this.nextSibling.classList.toggle("select-show");
    if (this.nextSibling.classList.contains("select-show")) {
      const optionItemDivs = Array.from(this.nextElementSibling.children);
      optionItemDivs.forEach((optionItemDiv, index) => {
        setTimeout(function () {
          optionItemDiv.classList.add("show-menu-item");
        }, index * 100);
      });
    } else {
      const optionItemDivs = Array.from(this.nextElementSibling.children);
      optionItemDivs.forEach((optionItemDiv) => {
        optionItemDiv.classList.remove("show-menu-item");
      });
    }
  });
}
function closeAllSelects(element) {
  // A function that will close all select boxes in the document,
  // except the current select box
  const arrayNumber = [];
  const optionListDivs = document.querySelectorAll(".select-items");
  const selectedItems = document.getElementsByClassName("select-selected");
  const numberOfoptionListDivs = optionListDivs.length;
  const numberOfSelectedItems = selectedItems.length;
  for (let i = 0; i < numberOfSelectedItems; i++) {
    if (element == selectedItems[i]) {
      arrayNumber.push(i);
    } else {
      selectedItems[i].classList.remove("select-arrow-active");
    }
  }
  for (let i = 0; i < numberOfoptionListDivs; i++) {
    if (arrayNumber.indexOf(i)) {
      optionListDivs[i].classList.add("select-hide");
      optionListDivs[i].classList.remove("select-show");
    }
  }
  // Remove '.show-menu-item' if user clicks outside the box
  optionListDivs.forEach((optionListDiv) => {
    const optionItemDivs = optionListDiv.querySelectorAll("div");
    optionItemDivs.forEach((optionItemDiv) => {
      optionItemDiv.classList.remove("show-menu-item");
    });
  });
}
// If the user clicks anywhere outside the select box,
// close all select boxes
document.addEventListener("click", closeAllSelects);

customSelects.forEach((customSelect) => {
  const selectElement = customSelect.querySelector("select");

  // Make each custom-select div have a class based on the ID of the default/hidden select menu,
  // eg. the custom-select div of fonts has the class custom-select-fonts
  const selectId = selectElement.id;
  customSelect.setAttribute("id", "custom-select-" + selectId);

  // Before user selects an option, make the item in the dropdown menu that
  // corresponds with the default selection take the class "same-as-selected"
  const selected = customSelect.querySelector(".select-selected");
  const optionItemDivs = customSelect.querySelectorAll(".select-items div");
  const numberOfOptionItemDivs = optionItemDivs.length;
  for (let i = 0; i < numberOfOptionItemDivs; i++) {
    if (selected.innerHTML === optionItemDivs[i].innerHTML) {
      optionItemDivs[i].setAttribute("class", "same-as-selected");
    }
  }
});

// Apply styling to text
const editorButtons = document.querySelectorAll(".editor-button");

function editorButtonsFunction() {
  const command = this.dataset["element"];
  document.execCommand(command, false, null);
}

editorButtons.forEach((editorButton) => {
  editorButton.addEventListener("click", editorButtonsFunction);
  editorButton.addEventListener("touchstart", editorButtonsFunction);
});

// Submit typed text & add blur for line mode
const previewContent = document.querySelector("#preview-content");
const containerForFocusLine = document.querySelector(
  "#container-for-focus-line"
);

const editor = document.querySelector("#editor");
const submittedText = document.querySelector("#submitted-text");
const submitButton = document.querySelector("#submit-button");

function submitTextFunction() {
  // When submit button is clicked, wrap div around first paragraph (like the rest of the paragraphs) and submit text
  const content = editor.innerHTML;
  const submittedParagraphs = content.split("<br>");
  const firstParagraph = submittedParagraphs.shift(); // Remove the first paragraph from the array
  const wrappedFirstParagraph = "<div>" + firstParagraph + "</div>";
  const modifiedContent =
    wrappedFirstParagraph + submittedParagraphs.join("<br>");
  submittedText.innerHTML = modifiedContent;

  // Display preview of text, with limit of 50 words.
  const words = editor.innerHTML.split(" ");
  const limitedWords = words.slice(0, 50).join(" ");
  previewContent.innerHTML = limitedWords;

  editor.innerHTML = "";
  if (submittedText.innerHTML.trim() !== "") {
    // Add margin-bottom to submitted text
    submittedText.style.marginBottom = "50vh";

    // Change size of focus line when text is submitted
    let selectedFontSize = document.querySelector(
      "#custom-select-font-sizes .select-selected"
    ).innerHTML;
    const selectedLineHeightInnerHTML = document.querySelector(
      "#custom-select-line-heights .select-selected"
    ).innerHTML;

    selectedFontSize = selectedFontSize.replace("px", "");
    focusLine.style.height =
      selectedFontSize * selectedLineHeightInnerHTML + "px";

    // Add padding-bottom of 1px to focus line if line height of submitted text is 1.25
    if (selectedLineHeightInnerHTML === "1.25") {
      focusLine.style.paddingBottom = "1px";
    } else {
      focusLine.style.paddingBottom = "";
    }

    // Replace <br> tags with </div><div> to wrap paragraphs inside <div> tags
    // (Because Firefox divides paragraphs by <br> rather than <div>)
    const submittedTextInnerHTML = submittedText.innerHTML;
    let newText = submittedTextInnerHTML.replace(/<br>/g, "</div><div>");
    newText = "<div>" + newText + "</div>";
    document.getElementById("submitted-text").innerHTML = newText;

    // Add class to paragraphs for paragraph mode when text is submitted
    const submittedTextDivs = submittedText.querySelectorAll("div");
    submittedTextDivs.forEach((submittedTextDiv) => {
      // Check if the submittedTextDiv has any text
      const hasText = submittedTextDiv.textContent.trim().length > 0;

      // Check if the submittedTextDiv has any child divs
      const hasChildDivs = Array.from(submittedTextDiv.children).some(
        (child) => child.tagName.toLowerCase() === "div"
      );
      // If the submittedTextDiv has text and no child divs, it's a paragraph (add 'paragraph' class)
      // If it has no text, it's not a paragraph (remove it)
      if (hasText && !hasChildDivs) {
        submittedTextDiv.classList.add("paragraph");
      } else if (!hasText) {
        submittedTextDiv.parentNode.removeChild(submittedTextDiv);
      }
    });

    // Change mode according to selected mode.
    selectedModeFunction();
  }
}

submitButton.addEventListener("click", submitTextFunction);
submitButton.addEventListener("touchstart", submitTextFunction);

editor.addEventListener("paste", function (e) {
  // Cancel paste
  e.preventDefault();

  // Get text representation of clipboard
  const text = (e.originalEvent || e).clipboardData.getData("text/plain");

  // insert text manually
  document.execCommand("insertText", false, text);
});

// Change font of dropdown menu items to correspond to each option.
const fontNames = document.querySelectorAll(
  "#custom-select-fonts .select-items div"
);
fontNames.forEach((fontName) => {
  fontName.style.fontFamily = fontName.innerHTML;
});

// Change font of preview and submitted text + change font of selected font to correspond to the selected font
const fonts = document.querySelector("#custom-select-fonts .select-items");
fonts.onclick = function () {
  const selectedFont = document.querySelector(
    "#custom-select-fonts .select-selected"
  );
  previewContent.style.fontFamily = selectedFont.innerHTML;
  submittedText.style.fontFamily = selectedFont.innerHTML;
  selectedFont.style.fontFamily = selectedFont.innerHTML;
};

const selectedFontSizeDiv = document.querySelector(
  "#custom-select-font-sizes .select-items"
);
const focusLine = document.querySelector("#focus-line");

selectedFontSizeDiv.onclick = function () {
  let selectedFontSize = document.querySelector(
    "#custom-select-font-sizes .select-selected"
  ).innerHTML;
  const selectedLineHeightInnerHTML = document.querySelector(
    "#custom-select-line-heights .select-selected"
  ).innerHTML;
  // Change font size of preview and submitted text
  previewContent.style.fontSize = selectedFontSize;
  submittedText.style.fontSize = selectedFontSize;

  // Change size of focus line when font size is changed
  selectedFontSize = selectedFontSize.replace("px", "");
  focusLine.style.height =
    selectedFontSize * selectedLineHeightInnerHTML + "px";
};

const selectedLineHeightDiv = document.querySelector(
  "#custom-select-line-heights .select-items"
);
selectedLineHeightDiv.onclick = function () {
  let selectedFontSize = document.querySelector(
    "#custom-select-font-sizes .select-selected"
  ).innerHTML;
  const selectedLineHeightInnerHTML = document.querySelector(
    "#custom-select-line-heights .select-selected"
  ).innerHTML;
  // Change line height of preview and submitted text
  previewContent.style.lineHeight = selectedLineHeightInnerHTML;
  submittedText.style.lineHeight = selectedLineHeightInnerHTML;

  // Change size of focus line when line height is changed
  selectedFontSize = selectedFontSize.replace("px", "");
  focusLine.style.height =
    selectedFontSize * selectedLineHeightInnerHTML + "px";

  // Add padding-bottom to focus line of 1px if line height of submitted text is 1.25
  if (selectedLineHeightInnerHTML === "1.25") {
    focusLine.style.paddingBottom = "1px";
  } else {
    focusLine.style.paddingBottom = "";
  }
};

// Change mode
const selectedModeDiv = document.querySelector(
  "#custom-select-modes .select-items"
);
selectedModeDiv.addEventListener("click", selectedModeFunction);

// Function for line mode up button
const topBlurForFocusLine = document.querySelector("#top-blur-for-focus-line");
const initialHeightOfTopBlur = window
  .getComputedStyle(topBlurForFocusLine, null)
  .getPropertyValue("height");
const numbersOnlyStringOfInitialHeightOfTopBlur =
  initialHeightOfTopBlur.replace(/\D/g, "");
const numericValueOfInitialHeightOfTopBlur = parseInt(
  numbersOnlyStringOfInitialHeightOfTopBlur,
  10
);

const submittedTextMarginTop = window
  .getComputedStyle(submittedText, null)
  .getPropertyValue("margin-top");
const numbersOnlyStringOfSubmittedTextMarginTop =
  submittedTextMarginTop.replace(/\D/g, "");
const numericValueOfSubmittedTextMarginTop = parseInt(
  numbersOnlyStringOfSubmittedTextMarginTop,
  10
);
let buttonCounter = numericValueOfInitialHeightOfTopBlur;

function lineModeUpButtonFunction() {
  let selectedFontSize = document.querySelector(
    "#custom-select-font-sizes .select-selected"
  ).innerHTML;
  const selectedLineHeightInnerHTML = document.querySelector(
    "#custom-select-line-heights .select-selected"
  ).innerHTML;

  selectedFontSize = selectedFontSize.replace("px", "");
  const focusLineHeight = selectedFontSize * selectedLineHeightInnerHTML;
  if (buttonCounter > numericValueOfSubmittedTextMarginTop) {
    buttonCounter -= focusLineHeight;
  }
  topBlurForFocusLine.style.height = buttonCounter + "px";
}

// Function for line mode down button
function lineModeDownButtonFunction() {
  const offsetTopOfSubmittedText = submittedText.offsetTop;
  const heightOfSubmittedText = submittedText.offsetHeight;
  const offsetBottomOfSubmittedText =
    offsetTopOfSubmittedText + heightOfSubmittedText;
  const heightOfReadingPage =
    document.querySelectorAll(".page")[0].offsetHeight;
  const heightOfNav = document.querySelector(".nav").offsetHeight;
  const heightOfVisiblePage = heightOfReadingPage - heightOfNav;
  let focusLineHeight = window
    .getComputedStyle(focusLine, null)
    .getPropertyValue("height");
  const numbersOnlyStringOfFocusLineHeight = focusLineHeight.replace(
    /[^\d.]/g,
    ""
  );
  const numericValueOfFocusLineHeight = parseInt(
    numbersOnlyStringOfFocusLineHeight,
    10
  );
  // Function to check if the element's bottom is visible in the viewport
  function isElementBottomVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.bottom >= 0 &&
      rect.bottom <=
        (window.innerHeight - heightOfNav ||
          document.documentElement.clientHeight - heightOfNav)
    );
  }

  // Find bottom position of submitted text
  const rect = submittedText.getBoundingClientRect();
  const bottomPositionOfSubmittedText = rect.bottom;
  let bottomLimitOfFocusLine;
  if (offsetBottomOfSubmittedText < heightOfVisiblePage) {
    bottomLimitOfFocusLine =
      offsetBottomOfSubmittedText - numericValueOfFocusLineHeight;
  } else if (
    offsetBottomOfSubmittedText > heightOfVisiblePage &&
    isElementBottomVisible(submittedText)
  ) {
    bottomLimitOfFocusLine =
      bottomPositionOfSubmittedText - numericValueOfFocusLineHeight;
  } else {
    bottomLimitOfFocusLine =
      heightOfVisiblePage - numericValueOfFocusLineHeight * 2;
  }

  let selectedFontSize = document.querySelector(
    "#custom-select-font-sizes .select-selected"
  ).innerHTML;
  const selectedLineHeightInnerHTML = document.querySelector(
    "#custom-select-line-heights .select-selected"
  ).innerHTML;

  selectedFontSize = selectedFontSize.replace("px", "");
  focusLineHeight = selectedFontSize * selectedLineHeightInnerHTML;
  if (buttonCounter + 1 < bottomLimitOfFocusLine) {
    // (Add 1 to make up for 0.5 increments when the font size is an odd number and the line height is 1.5.)
    buttonCounter += focusLineHeight;
  }
  topBlurForFocusLine.style.height = buttonCounter + "px";
}

const wrapperForLineModeButtons = document.querySelector(
  "#wrapper-for-line-mode-buttons"
);
const wrapperForParagraphModeButtons = document.querySelector(
  "#wrapper-for-paragraph-mode-buttons"
);

const upButtonForLineMode = document.querySelector("#up-button-for-line-mode");
const downButtonForLineMode = document.querySelector(
  "#down-button-for-line-mode"
);
const upButtonForParagraphMode = document.querySelector(
  "#up-button-for-paragraph-mode"
);
const downButtonForParagraphMode = document.querySelector(
  "#down-button-for-paragraph-mode"
);

function lineMode() {
  containerForFocusLine.style.display = "-webkit-box";
  containerForFocusLine.style.display = "-ms-flexbox";
  containerForFocusLine.style.display = "flex";

  wrapperForLineModeButtons.style.display = "block";
  wrapperForParagraphModeButtons.style.display = "none";

  const paragraphs = document.querySelectorAll(".paragraph");

  paragraphs.forEach((paragraph) => {
    paragraph.classList.remove("blurred-paragraph");
  });

  // Reset height of top blur when line mode is selected
  topBlurForFocusLine.style.height = initialHeightOfTopBlur;
  buttonCounter = numericValueOfInitialHeightOfTopBlur;

  // In line mode, change position of focus line when up button is clicked
  upButtonForLineMode.onclick = lineModeUpButtonFunction;
  upButtonForLineMode.ontouchstart = lineModeUpButtonFunction;

  // In line mode, change position of focus line when down button is clicked
  downButtonForLineMode.onclick = lineModeDownButtonFunction;
  downButtonForLineMode.ontouchstart = lineModeDownButtonFunction;

  // Add up/down arrow functionality for line mode
  document.onkeydown = function (event) {
    if (event.key === "ArrowUp") {
      lineModeUpButtonFunction();
    } else if (event.key === "ArrowDown") {
      lineModeDownButtonFunction();
    }
  };
}

function paragraphMode() {
  containerForFocusLine.style.display = "none";

  wrapperForLineModeButtons.style.display = "none";
  wrapperForParagraphModeButtons.style.display = "block";

  const paragraphs = document.querySelectorAll(".paragraph");
  paragraphs.forEach((paragraph, index) => {
    if (index !== 0) {
      paragraph.classList.add("blurred-paragraph");
    }
  });

  // In paragraph mode, change paragraph when down button is clicked
  let currentIndex = 1;
  let nextParagraphIndex = 1;
  const readingPage = document.querySelectorAll(".page")[0];

  // In paragraph mode, change paragraph when up button is clicked
  function paragraphModeUpButtonFunction() {
    if (currentIndex <= paragraphs.length && currentIndex > 1) {
      currentIndex--;

      // Remove the "blurred-paragraph" class from the current paragraph
      if (paragraphs[currentIndex - 1]) {
        paragraphs[currentIndex - 1].classList.remove("blurred-paragraph");

        // Add the "blurred-paragraph" class to the following paragraph
        paragraphs[currentIndex].classList.add("blurred-paragraph");
      }
    }
    if (nextParagraphIndex >= 2 && nextParagraphIndex <= paragraphs.length) {
      const currentParagraph = paragraphs[nextParagraphIndex - 2];
      readingPage.scrollTo({
        top: currentParagraph.offsetTop - numericValueOfSubmittedTextMarginTop,
        behavior: "smooth",
      });
      nextParagraphIndex--;
    }
  }

  function paragraphModeDownButtonFunction() {
    if (currentIndex < paragraphs.length) {
      // Remove the "blurred-paragraph" class from the current paragraph
      paragraphs[currentIndex].classList.remove("blurred-paragraph");

      // Add the "blurred-paragraph" class to the previous paragraph
      if (paragraphs[currentIndex - 1]) {
        paragraphs[currentIndex - 1].classList.add("blurred-paragraph");
      }
      currentIndex++;
    }
    if (nextParagraphIndex < paragraphs.length) {
      const nextParagraph = paragraphs[nextParagraphIndex];

      readingPage.scrollTo({
        top: nextParagraph.offsetTop - numericValueOfSubmittedTextMarginTop,
        behavior: "smooth",
      });
      nextParagraphIndex++;
    }
  }

  downButtonForParagraphMode.onclick = paragraphModeDownButtonFunction;
  downButtonForParagraphMode.ontouchstart = paragraphModeDownButtonFunction;

  upButtonForParagraphMode.onclick = paragraphModeUpButtonFunction;
  upButtonForParagraphMode.ontouchstart = paragraphModeUpButtonFunction;

  // Add up/down arrow functionality for paragraph mode
  document.onkeydown = function (event) {
    if (event.key === "ArrowUp") {
      paragraphModeUpButtonFunction();
    } else if (event.key === "ArrowDown") {
      paragraphModeDownButtonFunction();
    }
  };
}

// Function to change mode
function selectedModeFunction() {
  const selectedMode = document.querySelector(
    "#custom-select-modes .select-selected"
  ).innerHTML;
  if (selectedMode == "Paragraph") {
    paragraphMode();
  } else {
    lineMode();
  }
}

// Style up buttons on touch/click
function upButtonsStylesFunction(event) {
  event.preventDefault();
  if (event.type === "mouseenter") {
    this.style.WebkitTransform = "translate(-50%, -3px)";
    this.style.msTransform = "translate(-50%, -3px)";
    this.style.transform = "translate(-50%, -3px)";
  } else if (event.type === "mouseleave") {
    this.style.WebkitTransform = "translate(-50%, 0)";
    this.style.msTransform = "translate(-50%, 0)";
    this.style.transform = "translate(-50%, 0)";
  } else if (event.type === "touchstart") {
    this.style.WebkitTransform = "translate(-50%, -3px)";
    this.style.msTransform = "translate(-50%, -3px)";
    this.style.transform = "translate(-50%, -3px)";
  } else if (event.type === "touchend") {
    setTimeout(() => {
      this.style.WebkitTransform = "translate(-50%, 0)";
      this.style.msTransform = "translate(-50%, 0)";
      this.style.transform = "translate(-50%, 0)";
    }, 200);
  }
}

upButtonForLineMode.addEventListener("mouseenter", upButtonsStylesFunction);
upButtonForLineMode.addEventListener("mouseleave", upButtonsStylesFunction);
upButtonForLineMode.addEventListener("touchstart", upButtonsStylesFunction);
upButtonForLineMode.addEventListener("touchend", upButtonsStylesFunction);
upButtonForParagraphMode.addEventListener(
  "mouseenter",
  upButtonsStylesFunction
);
upButtonForParagraphMode.addEventListener(
  "mouseleave",
  upButtonsStylesFunction
);
upButtonForParagraphMode.addEventListener(
  "touchstart",
  upButtonsStylesFunction
);
upButtonForParagraphMode.addEventListener("touchend", upButtonsStylesFunction);

// Style down buttons on touch/click
function downButtonsStylesFunction(event) {
  event.preventDefault();
  if (event.type === "mouseenter") {
    this.style.WebkitTransform = "translate(-50%, 3px)";
    this.style.msTransform = "translate(-50%, 3px)";
    this.style.transform = "translate(-50%, 3px)";
  } else if (event.type === "mouseleave") {
    this.style.WebkitTransform = "translate(-50%, 0)";
    this.style.msTransform = "translate(-50%, 0)";
    this.style.transform = "translate(-50%, 0)";
  } else if (event.type === "touchstart") {
    this.style.WebkitTransform = "translate(-50%, 3px)";
    this.style.msTransform = "translate(-50%, 3px)";
    this.style.transform = "translate(-50%, 3px)";
  } else if (event.type === "touchend") {
    setTimeout(() => {
      this.style.WebbkitTransform = "translate(-50%, 0)";
      this.style.msTransform = "translate(-50%, 0)";
      this.style.transform = "translate(-50%, 0)";
    }, 200);
  }
}

downButtonForLineMode.addEventListener("mouseenter", downButtonsStylesFunction);
downButtonForLineMode.addEventListener("mouseleave", downButtonsStylesFunction);

downButtonForLineMode.addEventListener("touchstart", downButtonsStylesFunction);
downButtonForLineMode.addEventListener("touchend", downButtonsStylesFunction);

downButtonForParagraphMode.addEventListener(
  "mouseenter",
  downButtonsStylesFunction
);
downButtonForParagraphMode.addEventListener(
  "mouseleave",
  downButtonsStylesFunction
);

downButtonForParagraphMode.addEventListener(
  "touchstart",
  downButtonsStylesFunction
);
downButtonForParagraphMode.addEventListener(
  "touchend",
  downButtonsStylesFunction
);

// Style editor buttons on touch/click
function editorButtonsStylesFunction(event) {
  event.preventDefault();
  if (event.type === "mouseenter") {
    this.style.backgroundColor = "var(--third-color)";
  } else if (event.type === "mouseleave") {
    this.style.backgroundColor = "var(--fourth-color)";
  } else if (event.type === "touchstart") {
    this.style.backgroundColor = "var(--third-color)";
  } else if (event.type === "touchend") {
    this.style.backgroundColor = "var(--fourth-color)";
  }
}

editorButtons.forEach((editorButton) => {
  editorButton.addEventListener("mouseenter", editorButtonsStylesFunction);
  editorButton.addEventListener("mouseleave", editorButtonsStylesFunction);
  editorButton.addEventListener("touchstart", editorButtonsStylesFunction);
  editorButton.addEventListener("touchend", editorButtonsStylesFunction);
});

// Style submit button on touch/click
function submitButtonStylesFunction(event) {
  event.preventDefault(); // Prevent touch event from triggering the click event
  if (event.type === "mouseenter") {
    this.style.opacity = "0.75";
  } else if (event.type === "mouseleave") {
    this.style.opacity = "1";
  } else if (event.type === "touchstart") {
    this.style.opacity = "0.75";
  } else if (event.type === "touchend") {
    this.style.opacity = "1";
  }
}

submitButton.addEventListener("mouseenter", submitButtonStylesFunction);
submitButton.addEventListener("mouseleave", submitButtonStylesFunction);
submitButton.addEventListener("touchstart", submitButtonStylesFunction);
submitButton.addEventListener("touchend", submitButtonStylesFunction);

// Prevent default behaviour of up/down arrow keys on reading page to prevent
// the text from moving up/down in line mode when keys are used to move the focus line
let isReadingPageClicked = false;

pagesContainer.addEventListener("click", function (event) {
  const clickedPage = event.target.closest(".page");

  if (clickedPage) {
    const pages = document.querySelectorAll(".page");
    const pageIndex = Array.from(pages).indexOf(clickedPage);

    if (pageIndex === 0) {
      if (!isReadingPageClicked) {
        document.addEventListener("keydown", arrowKeyHandler);
        isReadingPageClicked = true;
      }
    } else {
      if (isReadingPageClicked) {
        document.removeEventListener("keydown", arrowKeyHandler);
        isReadingPageClicked = false;
      }
    }
  }
});

function arrowKeyHandler(event) {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
  }
}

// Add hover effect to links (to differentiate between hover and touch, so that
// hover can end after touch when user navigates outside the document.)
const links = document.querySelectorAll(".link");
const kofiButton = document.querySelector(".kofi-button");
const linksAndKofiButton = Array.from(links).concat(kofiButton);

linksAndKofiButton.forEach((linkOrKofiButton) => {
  linkOrKofiButton.addEventListener("mouseover", hoverEffect);
  linkOrKofiButton.addEventListener("mouseout", unhoverEffect);
  linkOrKofiButton.addEventListener("click", unhoverEffect);
  linkOrKofiButton.addEventListener("touchstart", hoverEffect);
  linkOrKofiButton.addEventListener("touchend", unhoverEffect);

  function hoverEffect() {
    linkOrKofiButton.classList.add("hovered");
  }

  function unhoverEffect() {
    linkOrKofiButton.classList.remove("hovered");
  }
});

// When page reloads, revert selection menus to display default settings (because the settings return to the default but the menus don't reset)

// Revert settings for Font menu
const selectedFont = document.querySelector(
  "#custom-select-fonts .select-selected"
);

selectedFont.textContent = "Arial";
fontNames.forEach((fontName, index) => {
  if (index === 1) {
    fontName.classList.add("same-as-selected");
  } else {
    fontName.classList.remove("same-as-selected");
  }
});

// Revert settings for Font Size menu
const selectedFontSize = document.querySelector(
  "#custom-select-font-sizes .select-selected"
);
const fontSizes = document.querySelectorAll(
  "#custom-select-font-sizes .select-items div"
);

selectedFontSize.textContent = "16px";
fontSizes.forEach((fontSize, index) => {
  if (index === 0) {
    fontSize.classList.add("same-as-selected");
  } else {
    fontSize.classList.remove("same-as-selected");
  }
});

// Revert settings for Line Height menu
const selectedLineHeight = document.querySelector(
  "#custom-select-line-heights .select-selected"
);
const lineHeights = document.querySelectorAll(
  "#custom-select-line-heights .select-items div"
);

selectedLineHeight.textContent = "1.25";
lineHeights.forEach((lineHeight, index) => {
  if (index === 0) {
    lineHeight.classList.add("same-as-selected");
  } else {
    lineHeight.classList.remove("same-as-selected");
  }
});

// Revert settings for Mode menu
const selectedMode = document.querySelector(
  "#custom-select-modes .select-selected"
);
const modes = document.querySelectorAll(
  "#custom-select-modes .select-items div"
);

selectedMode.textContent = "Line";
modes.forEach((mode, index) => {
  if (index === 0) {
    mode.classList.add("same-as-selected");
  } else {
    mode.classList.remove("same-as-selected");
  }
});
