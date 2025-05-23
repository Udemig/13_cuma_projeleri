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

export { setToLocal, getFromLocal, removeFromLocal };
