"use strict";
function app() {
  const accordionsContainer = document.getElementById("accordions-container");
  const dropdownMenu = document.getElementById("menu-dropdown");
  const notificationBtn = document.getElementById("notif-btn");
  const notificationPopup = document.getElementById("notification-popup");

  const dropdownMenuBtn = document.getElementById("menu-dropdown-btn");
  //   const accordions = document.querySelectorAll(".accordion");
  const sectionTop = document.querySelector(".section-top");
  const sectionTopCloseBtn = sectionTop.querySelector("#close-btn");
  const sectionContent = document.querySelector(".section-content");
  const sectionContentToggleBtn = document.querySelector(".section-toggle-btn");
  const taskCountElem = document.getElementById("task-count");
  const taskCount = 5;
  let completedTask = 0;
  const progressBar = document.querySelector(".progress-bar");
  const progressBarFill = progressBar.querySelector(".progress-bar-fill");

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
    dropdownMenu.classList.toggle("popup-open");
    const menuItems = dropdownMenu.querySelectorAll("[role='menuitem'] a");

    menuItems.forEach((menuItem, index) => {
      menuItem.addEventListener("keyup", (event) => {
        if (event.key === "Escape") {
          closeMenu();
        }
        const isLastItem = index === menuItems.length - 1;
        const nextItem = index + 1;
        const prevItem = index - 1;
        if (event.key == "ArrowRight" || event.key == "ArrowDown") {
          if (isLastItem) {
            menuItems.item(0).focus();
            return;
          }
          menuItems.item(nextItem).focus();
        }
        if (event.key == "ArrowLeft" || event.key == "ArrowUp") {
          if (index === 0) {
            menuItems.item(menuItems.length - 1).focus();
            return;
          }
          menuItems.item(prevItem).focus();
        }
      });
    });
    const isExpanded =
      dropdownMenuBtn.attributes["aria-expanded"].value === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
      menuItems.item(0).focus();
    }
    // toggleMenu();
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
    dropdownMenu.classList.remove("popup-open");
    dropdownMenuBtn.focus();
  }

  accordionsContainer.addEventListener("change", (event) => {
    if (event.target.matches(".accordion-checkbox")) {
      const checkbox = event.target;
      const accordion = checkbox.closest(".accordion");
      if (!accordion.classList.contains("opened")) {
        controlAccordion(accordion);
      }
      const accordionTop = accordion.querySelector(".accordion-top");
      accordionTop.addEventListener("click", () =>
        openAccordionByTop(accordion)
      );
      const checkedBoxes = accordionsContainer.querySelectorAll(
        ".accordion-checkbox:checked"
      );
      completedTask = checkedBoxes.length;
      handleProgress(completedTask);
      if (checkbox.checked) {
        accordion.classList.remove("opened");
        accordion.classList.add("completed");
        const nextSibling = accordionsContainer.querySelector(
          ".accordion:not(.completed)"
        );
        if (nextSibling) {
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
      accordion.classList.remove("completed");
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
      sectionContentToggleBtn.ariaExpanded = "false";
      sectionContentToggleBtn.querySelector("img").src =
        "https://crushingit.tech/hackathon-assets/icon-arrow-down.svg";
      sectionContentToggleBtn.ariaLabel = "expand section";
    } else {
      sectionContentToggleBtn.querySelector("img").src =
        "https://crushingit.tech/hackathon-assets/icon-arrow-up.svg";
      sectionContentToggleBtn.ariaLabel = "minimize section";

      sectionContentToggleBtn.ariaExpanded = "true";
    }
  });
  function handleProgress(completedTask) {
    const percent = (completedTask / taskCount) * 100;
    progressBarFill.style.width = `${percent}%`;
    progressBar.ariaLabel = `${Math.floor(percent)}% completed`;
    taskCountElem.textContent = completedTask;
    console.log({ percent, pe: Math.floor(percent) });
  }
  handleProgress(completedTask);
}

document.addEventListener("DOMContentLoaded", () => {
  app();
});
