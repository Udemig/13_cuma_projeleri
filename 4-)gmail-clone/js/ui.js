// Arayüz Elemanları

import { formatText } from "./helpers.js";
import { mails } from "./main.js";

const uiElement = {
  hamburgerMenu: document.querySelector("#hamburger-menu"),
  modal: document.querySelector(".modal-wrapper"),
  closeBtn: document.querySelector("#close-btn"),
  navigation: document.querySelector(".left-aside-middle"),
  createBtn: document.querySelector(".create"),
  leftAside: document.querySelector(".left-aside"),
  form: document.querySelector("#mail-form"),
  mailsArea: document.querySelector(".mails-area"),
  searchForm: document.querySelector("#search-form"),
};

// Mailleri renderlayacak fonksiyon
const renderMails = (outlet, data) => {
  outlet.innerHTML = data
    .map(
      (mail) => ` <div class="mail" data-id="${mail.id}">
            <div class="left">
              <input type="checkbox" />
              <i class="bi bi-star${mail.stared ? "-fill" : ""} "></i>
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

// Maillerde güncelleme yapan fonksiyon
const updateMail = (e) => {
  // ! Eğer delete icon'a tıklandıysa
  if (e.target.classList.contains("bi-trash-fill")) {
    // Silme işlemi için kullanıcıdan onay al
    const res = confirm("Silme işlemini onaylıyormusunuz?");

    // Eğer kullanıcı silme işlemini onaylarsa
    if (res) {
      // Silinecek mail'e eriş
      const mail = e.target.closest(".mail");
      // Mail'in id'sine eriş
      const mailId = +mail.dataset.id;
      // Id'si bilinen mail'i mails dizisinden kaldır
      const filtredMails = mails.filter((mail) => mail.id != mailId);

      // Filtrelenmiş diziyi string'e çevir ve  localstorage'a gönder
      localStorage.setItem("mails", JSON.stringify(filtredMails));

      // Silinen maili arayüzden'de kaldır
      mail.remove();

      // Kullanıcıya bildirim gönder
      Toastify({
        text: "Mail silindi.",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #F7374F, #FF6363)",
          borderRadius: "10px",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }

  // ! Eğer star iconu'na tıklandıysa
  if (
    e.target.classList.contains("bi-star") ||
    e.target.classList.contains("bi-star-fill")
  ) {
    // Yıldızlanacak maile eriş
    const mail = e.target.closest(".mail");
    // Mail'in id'sine eriş
    const mailId = parseInt(mail.dataset.id);
    // Mails dizisi içerisinden yıldızlanacak elemanı bul
    const foundedMail = mails.find((i) => i.id == mailId);
    // Yıldızlanacak elemanın içerisindeki tüm değerleri sabit tut sadece stared değerini mevcut değerin tam tersine çevir

    const updatedMail = { ...foundedMail, stared: !foundedMail.stared };

    // Yıldızlanan elemanın mails dizisindeki index'ini bul
    const index = mails.findIndex((i) => i.id == mailId);

    // Index'i bilinen elemanı mails dizisi içerisinde güncelle
    mails[index] = updatedMail;

    // Localstorage'ı güncelle
    localStorage.setItem("mails", JSON.stringify(mails));

    // Arayüzü renderla
    renderMails(uiElement.mailsArea, mails);
  }
};

export { uiElement, renderMails, updateMail };
