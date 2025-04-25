// Arayüz Elemanları

import { formatText } from "./helpers.js";

const uiElement = {
  hamburgerMenu: document.querySelector("#hamburger-menu"),
  modal: document.querySelector(".modal-wrapper"),
  closeBtn: document.querySelector("#close-btn"),
  navigation: document.querySelector(".left-aside-middle"),
  createBtn: document.querySelector(".create"),
  leftAside: document.querySelector(".left-aside"),
  form: document.querySelector("#mail-form"),
  mailsArea: document.querySelector(".mails-area"),
};

// Mailleri renderlayacak fonksiyon

const renderMails = (outlet, data) => {
  outlet.innerHTML = data
    .map(
      (mail) => ` <div class="mail">
            <div class="left">
              <input type="checkbox" />
              <i class="bi bi-star"></i>
              <span>${mail.receiver}</span>
            </div>

            <div class="center">
              <p class="mail-title">${mail.title}</p>
              <p class="mail-description">${formatText(mail.message, 35)}</p>
            </div>

            <div class="right">
              <p class="mail-date">${mail.date}</p>
              <div class="delete">
                <i class="bi bi-trash-fill"></i>
              </div>
            </div>
          </div>`
    )
    .join(" ");
};

export { uiElement, renderMails };
