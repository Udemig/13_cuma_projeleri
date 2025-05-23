import API from "./api.js";
import { setToLocal } from "./helpers.js";
import { authEle } from "./ui.js";

// API class'ından örnek al
const api = new API();

// 1 küçük harf,1 büyük harf,1 özel karakter ve enaz 6 karakter olma durumu için regex
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;

// Hata varsa hataları render edecek fonksiyon

const renderWarns = (nameWarning, passWarning) => {
  // İsim hatası
  if (nameWarning) {
    authEle.nameWarning.innerHTML = `<p class="name-warning">${nameWarning}</p>`;
  } else {
    authEle.nameWarning.innerHTML = "";
  }

  // Şifre hatası
  if (passWarning) {
    authEle.passwordWarning.innerHTML = `<p class="password-warning">${passWarning}</p>`;
  } else {
    authEle.passwordWarning.innerHTML = "";
  }
};

// Auth formu'nun gönderilmesi durumunda çalışacak fonksiyon
const handleSubmit = async (e) => {
  // Sayfa yenilemesini engelle
  e.preventDefault();

  // Name ve Password inputların değerine eriş
  const name = e.target[0].value;
  const password = e.target[1].value;

  // İsim ve şifre hatası için değişkenler
  let nameWarning = null;
  let passwordWarning = null;

  // İsim alanı ile alakalı hata kontrolü
  if (!name) {
    nameWarning = `İsim alanı boş bırakılamaz.`;
  } else if (name.length < 5) {
    nameWarning = `İsim 5 karakterden kısa olamaz.`;
  } else {
    nameWarning = null;
  }

  // Şifre alanı ile alakalı hata kontrolü
  if (!password) {
    passwordWarning = `Şifre alanı zorunludur.`;
  } else if (password.length < 6) {
    passwordWarning = `Şifre 6 karakterden kısa olamaz.`;
  } else if (!regex.test(password)) {
    passwordWarning = `Zayıf şifre.Daha güçlü şifre giriniz.`;
  }

  // Hata varsa bu hataları render et
  renderWarns(nameWarning, passwordWarning);

  // Hata yoksa
  if (!nameWarning && !passwordWarning) {
    // Api'a istek at ve kullanıcı verisini al
    const userData = await api.getUser(name);

    console.log(userData);

    // Kullanıcı verisini localStorage'a kayıt et
    setToLocal("user", userData);

    // kullanıcıyı ana sayfaya yönlendir
    window.location = "/";
  }
};

// Auth formu'nun gönderilmesini izle

authEle.loginForm.addEventListener("submit", handleSubmit);
