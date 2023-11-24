"use strict";
const accordionsContainer = document.getElementById("accordions-container");
const dropdownMenu = document.getElementById("menu-dropdown");
const notificationBtn = document.getElementById("notif-btn");
const notificationPopup = document.getElementById("notification-popup");
const dropdownMenuBtn = document.getElementById("menu-dropdown-btn");
const accordions = document.querySelectorAll(".accordion");
const sectionTop = document.querySelector(".section-top");
const sectionTopCloseBtn = sectionTop.querySelector("#close-btn");
const sectionContent = document.querySelector(".section-content");
const sectionContentToggleBtn = document.querySelector(".section-toggle-btn");
const taskCountElem = document.getElementById("task-count");
const taskCount = 5;
let completedTask = 0;
const progressBarFill = document.querySelector(".progress-bar-fill");

notificationBtn.addEventListener("click", () => {
  if (dropdownMenu.classList.contains("popup-open")) {
    dropdownMenu.classList.remove("popup-open");
    closeMenu();
  }
  const isExpanded =
    notificationBtn.attributes["aria-expanded"].value === "true";
  if (isExpanded) {
    closeNotification();
  } else {
    openNotification();
  }
  notificationPopup.classList.toggle("popup-open");
});
dropdownMenuBtn.addEventListener("click", () => {
  if (notificationPopup.classList.contains("popup-open")) {
    notificationPopup.classList.remove("popup-open");
    closeNotification();
  }
  toggleMenu();
});
function openNotification() {
  notificationBtn.ariaExpanded = "true";
  notificationBtn.ariaLabel = "close notification";
}
function closeNotification() {
  notificationBtn.ariaExpanded = "false";
  notificationBtn.ariaLabel = "expand notification";
}
function openMenu() {
  dropdownMenuBtn.ariaExpanded = "true";
  dropdownMenuBtn.ariaLabel = "close menu";
}
function closeMenu() {
  dropdownMenuBtn.ariaExpanded = "false";
  dropdownMenuBtn.ariaLabel = "open menu";
}
function toggleMenu() {
  const isExpanded =
    dropdownMenuBtn.attributes["aria-expanded"].value === "true";
  if (isExpanded) {
    closeMenu();
  } else {
    openMenu();
  }
  dropdownMenu.classList.toggle("popup-open");
}
accordionsContainer.addEventListener("change", (event) => {
  if (event.target.matches(".accordion-checkbox")) {
    const checkbox = event.target;
    const accordion = checkbox.closest(".accordion");
    if (!accordion.classList.contains("opened")) {
      controlAccordion(accordion);
    }
    const accordionTop = accordion.querySelector(".accordion-top");
    accordionTop.addEventListener("click", () => openAccordionByTop(accordion));
    const checkedBoxes = accordionsContainer.querySelectorAll(
      ".accordion-checkbox:checked"
    );
    completedTask = checkedBoxes.length;
    handleProgress(completedTask);
    if (checkbox.checked) {
      accordion.classList.remove("opened");
      const nextSibling = accordion.nextElementSibling;
      if (nextSibling && nextSibling.classList.contains("accordion")) {
        controlAccordion(nextSibling);
      }
    }
  }
});

function controlAccordion(accordion) {
  const activeAccordion =
    accordionsContainer.querySelector(".accordion.opened");
  if (activeAccordion) {
    activeAccordion?.classList.remove("opened");
    activeAccordion.ariaExpanded = "false";
  }

  const checkbox = accordion.querySelector(".accordion-checkbox");

  if (!checkbox.checked) {
    accordion.classList.add("opened");
    accordion.ariaExpanded = "true";
  }
}
function openAccordionByTop(accordion) {
  const activeAccordion =
    accordionsContainer.querySelector(".accordion.opened");
  if (activeAccordion) {
    activeAccordion?.classList.remove("opened");
    activeAccordion.ariaExpanded = "false";
  }
  if (!accordion.classList.contains("opened")) {
    accordion.classList.add("opened");
    accordion.ariaExpanded = "true";
  }
}
sectionTopCloseBtn.addEventListener("click", () => {
  sectionTop.style.display = "none";
});
sectionContentToggleBtn.addEventListener("click", () => {
  sectionContent.classList.toggle("minimize");
  if (sectionContent.classList.contains("minimize")) {
    sectionContent.ariaExpanded = "false";
    sectionContentToggleBtn.querySelector("img").src =
      "https://crushingit.tech/hackathon-assets/icon-arrow-down.svg";
    sectionContentToggleBtn.ariaLabel = "expand section";
  } else {
    sectionContentToggleBtn.querySelector("img").src =
      "https://crushingit.tech/hackathon-assets/icon-arrow-up.svg";
    sectionContentToggleBtn.ariaLabel = "minimize section";

    sectionContent.ariaExpanded = "true";
  }
});
function handleProgress(completedTask) {
  progressBarFill.style.width = `${(completedTask / 5) * 100}%`;
  taskCountElem.textContent = completedTask;
}
handleProgress(completedTask);

function old() {
  // const accordions = document.querySelectorAll(".accordion");
  // const sectionTop = document.querySelector(".section-top");
  // const sectionTopCloseBtn = sectionTop.querySelector("#close-btn");
  // const sectionContent = document.querySelector(".section-content");
  // const sectionContentToggleBtn = document.querySelector(".section-toggle-btn");
  // const taskCountElem = document.getElementById("task-count");
  // const taskCount = 5;
  // let completedTask = 0;
  // const progressBarFill = document.querySelector(".progress-bar-fill");
  // accordions.forEach((accordion, index) => {
  //   const checkbox = accordion.querySelector(".accordion-checkbox");
  //   const accordionTop = accordion.querySelector(".accordion-top");
  //   accordionTop.addEventListener("click", () => openAccordionByTop(accordion));
  //   checkbox.addEventListener("change", () => {
  //     const checkedBoxes = document.querySelectorAll(
  //       ".accordion-checkbox:checked"
  //     );
  //     completedTask = checkedBoxes.length;
  //     handleProgress(completedTask);
  //     if (!accordion.classList.contains("opened")) {
  //       controlAccordion(accordion);
  //     }
  //     if (checkbox.checked) {
  //       //   accordion.classList.remove("opened");
  //       const nextSibling = document.querySelector(".accordion:not(.opened)");
  //       const nextSiblingCheckbox = nextSibling?.querySelector(
  //         ".accordion-checkbox"
  //       );
  //       if (
  //         nextSibling &&
  //         nextSibling.classList.contains("accordion") &&
  //         !nextSiblingCheckbox?.checked
  //       ) {
  //         controlAccordion(nextSibling);
  //       }
  //     }
  //   });
  // });
  // function controlAccordion(accordion) {
  //   const activeAccordion = document.querySelector(".accordion.opened");
  //   if (activeAccordion) {
  //     activeAccordion?.classList.remove("opened");
  //     activeAccordion.ariaExpanded = "false";
  //   }
  //   accordion.classList.add("opened");
  //   accordion.ariaExpanded = "true";
  // }
  // function openAccordionByTop(accordion) {
  //   if (!accordion.classList.contains("opened")) {
  //     controlAccordion(accordion);
  //   }
  // }
  // sectionTopCloseBtn.addEventListener("click", () => {
  //   sectionTop.style.display = "none";
  // });
  // sectionContentToggleBtn.addEventListener("click", () => {
  //   sectionContent.classList.toggle("minimize");
  //   if (sectionContent.classList.contains("minimize")) {
  //     sectionContent.ariaExpanded = "false";
  //     sectionContentToggleBtn.querySelector("img").src =
  //       "https://crushingit.tech/hackathon-assets/icon-arrow-down.svg";
  //     sectionContentToggleBtn.ariaLabel = "expand section";
  //   } else {
  //     sectionContentToggleBtn.querySelector("img").src =
  //       "https://crushingit.tech/hackathon-assets/icon-arrow-up.svg";
  //     sectionContentToggleBtn.ariaLabel = "minimize section";
  //     sectionContent.ariaExpanded = "true";
  //   }
  // });
  // function handleProgress(completedTask) {
  //   progressBarFill.style.width = `${(completedTask / 5) * 100}%`;
  //   taskCountElem.textContent = completedTask;
  // }
  // handleProgress(completedTask);
}
