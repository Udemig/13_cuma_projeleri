// * localStorage'a kayıt yapacak fonksiyon
const setToLocal = (key, data) => {
  // localStorage'a kayıt edilecek veriyi JSON'a çevir
  const strData = JSON.stringify(data);

  // localStorage'a kayıt yap
  localStorage.setItem(key, strData);
};

// * localStorage'dan veri alacak fonksiyon
const getFromLocal = (key) => {
  // localStorage'dan belirtilen key değerine sahip elemanları al
  const strData = localStorage.getItem(key);

  // Gelen veriyi Js nesnesine çevir
  const data = JSON.parse(strData);

  // Fonksiyon çağırıldığında data'yı döndür
  return data;
};

// * localStorage'dan veri kaldıracak fonksiyon
const removeFromLocal = (key) => {
  // Belirtilen key'e sahip elemanı localStorage'dan kaldır
  localStorage.removeItem(key);
};

// Tweet içerisindeki media kısmını render edecek fonksiyon
const getMedia = (media) => {
  // Eğer verilen media bir resim ise
  if (media.photo) {
    return `<img src='${media.photo[0].media_url_https}' />`;
  }

  // Eğer verilen media bir video ise

  if (media.video) {
    // Gelen veri içerisinde type'ı mp4 olanı filtrele
    const filtredVideo = media.video[0].variants.filter(
      (item) => item.content_type === "video/mp4"
    );

    return `<video src='${filtredVideo[0].url}' controls></video>`;
  }
  // Eğer verilen media içeriği yoksa

  return "";
};

// Sayıyı bin,onbin,milyon şeklinde formatlayan bir fonksiyon
const formatNumber = (count) => {
  if (count >= 1e9) {
    return (count / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (count >= 1e6) {
    return (count / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (count >= 1e3) {
    return (count / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return count.toString();
};

export { setToLocal, getFromLocal, removeFromLocal, getMedia, formatNumber };
