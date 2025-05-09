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

export { createIngredient, setToLocalStorage, getFromLocalStorage, controlBtn };
