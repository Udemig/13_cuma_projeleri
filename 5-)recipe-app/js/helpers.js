import { uiElements } from "./ui.js";

// ingredient elemanı oluşturan fonksiyon
const createIngredient = (ingredients) => {
  const ingredientHtml = ingredients
    .map(
      (ingredient) => `
              <li>
                <i class="bi bi-check-circle"></i>
                <span> ${ingredient} </span>
              </li>
              `
    )
    .join("");

  return ingredientHtml;
};

// localStorage'a kayıt yapan fonksiyon
const setToLocalStorage = (key, data) => {
  // Dışarıdan alınan datayı string'e çevir
  const strData = JSON.stringify(data);
  // string'e çevirilen veriyi localStorage'a kayıt et
  localStorage.setItem(key, strData);
};

// localStorage'dan veri alan fonksiyon
const getFromLocalStorage = (key) => {
  // Belirtilen key'e sahip olan elemanı localStorage'dan al
  const strData = localStorage.getItem(key);

  // string şekilde gelen veriyi js'de kullanılacak formata çevir
  const data = JSON.parse(strData);

  // Fonksiyon çağırıldığında data'yı return et
  return data;
};

// Sepetteki ürün miktarını kontrol eden fonksiyon
const controlBtn = (basket) => {
  // Sepette ürün varsa
  if (basket.length > 0) {
    // clearBtn'i görünür kıl
    uiElements.clearBtn.style.display = "block";
  } else {
    // clearBtn'i gizle
    uiElements.clearBtn.style.display = "none";
  }
};

// Tarif like'landı mı ?
const isRecipeLiked = (id) => {
  // localStorage'dan likes key'ine sahip elemanları al
  const likes = getFromLocalStorage("likes") || [];
  // Tarif like'landı mı?
  for (let i = 0; i < likes.length; i++) {
    if (likes[i].id === id) return true;
  }

  return false;
};

// Bir tarifi likela
const addLike = (recipe) => {
  const likes = getFromLocalStorage("likes") || [];

  likes.push({
    id: recipe.recipe_id,
    title: recipe.title,
    image_url: recipe.image_url,
  });

  setToLocalStorage("likes", likes);
};

// Bir elemandan like'ı kaldır

const removeLike = (id) => {
  // Likes dizisine eriş
  const likes = getFromLocalStorage("likes") || [];
  const newLikes = [];

  for (let i = 0; i < likes.length; i++) {
    if (likes[i].id !== id) {
      newLikes.push(likes[i]);
    }
  }

  setToLocalStorage("likes", newLikes);
};

export {
  createIngredient,
  setToLocalStorage,
  getFromLocalStorage,
  controlBtn,
  isRecipeLiked,
  addLike,
  removeLike,
};
