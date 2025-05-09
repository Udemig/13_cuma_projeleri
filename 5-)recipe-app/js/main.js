import API from "./api.js";
import {
  controlBtn,
  getFromLocalStorage,
  setToLocalStorage,
} from "./helpers.js";
import {
  renderBasketItem,
  renderLoader,
  renderRecipes,
  renderResults,
  uiElements,
} from "./ui.js";

// API class'ının örneğini al
const api = new API();

// Localstorage'dan sepet verilerini al ve bir basket dizisine aktar
const basket = getFromLocalStorage("basket") || [];

// * Form gönderildiğinde çalışacak fonksiyon
const handleSubmit = (e) => {
  // Sayfa yenilemesini engelle
  e.preventDefault();

  // Input içerisindeki değere eriş
  const query = e.target[0].value;

  // loader'ı render et
  renderLoader(uiElements.resultList);

  // Api'a istek at gelen veri sonucunda renderResults fonksiyonunu çalıştır
  api.getResults(query).then(() => {
    renderResults(api.results);
  });
};

// * Sayfa yüklendiğinde url'i kontrol edecek fonksiyon
const controlUrl = () => {
  // Url'i izle ve # ile geçilen  href attribute'üne eriş.Url'e geçilen bu href içerisindeki id'ye erişmek için # işaretini "" 'e çevir
  const id = window.location.hash.replace("#", "");

  // loader'ı render et
  renderLoader(uiElements.recipeArea);

  // Eğer id varsa api isteği at
  if (id) {
    api.getRecipe(id).then(() => {
      renderRecipes(api.recipe);
    });
  }
};

// Sepete ekle butonuna tıklandığında çalışacak fonksiyon
const handleClick = (e) => {
  // Sepete ekle butonuna tıklandıysa
  if (e.target.id === "add-to-basket") {
    // ingredients dizisi içerisindeki herbir elemana bir id değeri ata
    api.ingredients.forEach((title) => {
      // ingredients dizisi içerisindeki herbir eleman için bir obje oluştur.
      const newItem = {
        id: uuid.v4(),
        title,
      };

      // Oluşturulan obje'leri basket dizisine ekle
      basket.push(newItem);

      // Oluşturulan objelerin eklenmiş olduğu diziyi localStorage'a ekle
      setToLocalStorage("basket", basket);

      // Sepete eklenen ürünleri render et
      renderBasketItem(basket);

      // clearBtn'i render edecek fonksiyonu çalıştır
      controlBtn(basket);
    });
  }
  // Like butonuna tıklandıysa
};

// Sayfanın yüklenme anı ve Url'deki değişimi izle
["load", "hashchange"].forEach((eventName) => {
  window.addEventListener(eventName, controlUrl);
  // Sepete eklenen elemanları render et
  renderBasketItem(basket);
  // clearBtn'i render edecek fonksiyonu çalıştır
  controlBtn(basket);
});

// Arayüzdeki form'un gönderilmesini izle
uiElements.form.addEventListener("submit", handleSubmit);

// RecipeArea kısmındaki tıklanmaları izle
uiElements.recipeArea.addEventListener("click", handleClick);
