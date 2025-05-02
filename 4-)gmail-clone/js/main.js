import { renderMails, uiElement, updateMail } from "./ui.js";

// ! LocaleStorage'daki mail verisi
const mails = JSON.parse(localStorage.getItem("mails")) || [];

// Sayfa yüklendiğinde mailleri renderlayan fonksiyon
document.addEventListener("DOMContentLoaded", () => {
  renderMails(uiElement.mailsArea, mails);
});

// createBtn elemanına tıklanınca modal'ı açan fonksiyon
uiElement.createBtn.addEventListener("click", () => {
  uiElement.modal.classList.add("open");
});

// closeBtn elemanına tıklanınca modal'ı kapatan fonksiyon
uiElement.closeBtn.addEventListener("click", () => {
  uiElement.modal.classList.remove("open");
});

// hamburgerMenu elemanına tıklayınca aside kısmındaki yazıları yok eden fonksiyon

uiElement.hamburgerMenu.addEventListener("click", () => {
  uiElement.leftAside.classList.toggle("hide");
});

// Ekran genişliğini izle ve 1100 px altında leftAside elemanına hide classı ekle
window.addEventListener("resize", (e) => {
  // Ekran genişliğini izle
  const screenWidth = e.target.innerWidth;

  // Ekran genişliği 1100px altındayken leftAside elemanına hide classı ekle
  if (screenWidth < 1100) {
    // leftAside elemanına hide classı ekle
    uiElement.leftAside.classList.add("hide");
  } else {
    // leftAside elemanından hide classı çıkar

    uiElement.leftAside.classList.remove("hide");
  }
});

// Modal içerisindeki formun gönderilmesini izle
uiElement.form.addEventListener("submit", (e) => {
  // Sayfa yenilemesini engelle
  e.preventDefault();
  // Formun içerisindeki değerlere eriş
  const receiver = e.target[0].value;
  const title = e.target[1].value;
  const message = e.target[2].value;

  // Form boş gönderilirse kullanıcıya uyarı ver
  if (!receiver && !title && !message) {
    Toastify({
      text: "Formu doldurunuz!",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #BF3131 , #7D0A0A)",
        borderRadius: "10px",
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    // Fonksiyonu durdur
    return;
  }

  // Bir mail objesi oluştur

  const newMail = {
    id: new Date().getTime(),
    receiver,
    title,
    message,
    stared: false,
    date: new Date().toLocaleDateString("tr", {
      day: "2-digit",
      month: "long",
    }),
  };

  // mails dizisine yeni oluşturulan maili ekle
  mails.unshift(newMail);

  // localStorage'i güncelle
  localStorage.setItem("mails", JSON.stringify(mails));

  // Formu resetle
  e.target.reset();

  // Modalı kapat
  uiElement.modal.classList.remove("open");

  // Kullanıcıya bildirim gönder
  Toastify({
    text: "Mail gönderildi.",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #67AE6E, #328E6E)",
      borderRadius: "10px",
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  // Mailleri render et
  renderMails(uiElement.mailsArea, mails);
});

// Mail alanındaki tıklanmaları izle
uiElement.mailsArea.addEventListener("click", updateMail);

// Categories Kısmındaki tıklanmalarda çalışacak fonksiyon

uiElement.navigation.addEventListener("click", (e) => {
  // Tıklanılan elemana en yakın a etiketine eriş
  const clickedCategory = e.target.closest("a");

  // a etiketlerindeki active classını kaldır
  const links = uiElement.navigation.querySelectorAll("a");
  links.forEach((link) => link.classList.remove("active"));

  // Tıklanılan elemana active classını ekle
  clickedCategory.classList.add("active");

  // Tıklanılan elemanın içerisindeki yazı değerine eriş
  const categoryName = clickedCategory.innerText;

  // categoryName "Yıldızlananlar" a eşitse mails içerisinden yıldızlanan mailleri al ve ekranda renderla
  if (categoryName === "Yıldızlananlar") {
    // Yıldızlanan mailleri al
    const staredMails = mails.filter((mail) => mail.stared === true);

    // Yıldızlanan mailleri renderla
    renderMails(uiElement.mailsArea, staredMails);
  } else {
    // Yıldızlananlar haricinde bir category seçiliyse tüm mailleri renderla
    renderMails(uiElement.mailsArea, mails);
  }
});

// Search form gönderildiğinde çalışacak fonksiyon
uiElement.searchForm.addEventListener("submit", (e) => {
  // Sayfa yenilmesini engelle
  e.preventDefault();
  // Input içerisindeki değere eriş
  const query = e.target[1].value;

  // Aratılan kelimeye göre mails dizisi içerisinde bulunan elemanları bul
  const filtredMails = mails.filter((i) =>
    i.receiver.toLowerCase().includes(query.toLowerCase())
  );

  // Aratılan mailleri renderla
  renderMails(uiElement.mailsArea, filtredMails);
});

export { mails };
