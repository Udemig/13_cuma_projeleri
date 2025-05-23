import API from "./api.js";
import {
  addLike,
  controlBtn,
  getFromLocalStorage,
  isRecipeLiked,
  removeLike,
  setToLocalStorage,
} from "./helpers.js";
import {
  renderBasketItem,
  renderLikes,
  renderLoader,
  renderRecipes,
  renderResults,
  uiElements,
} from "./ui.js";

// API class'ının örneğini al
const api = new API();

// Localstorage'dan sepet verilerini al ve bir basket dizisine aktar
let basket = getFromLocalStorage("basket") || [];

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

  // Eğer id varsa api isteği at
  if (id) {
    // loader'ı render et
    renderLoader(uiElements.recipeArea);
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

    Toastify({
      text: "Ürünler sepete eklendi",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        borderRadius: "5px",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  }
  // Like butonuna tıklandıysa
  else if (e.target.id === "like-btn") {
    // Like'lanacak elemanın id'sine eriş
    const id = api.recipe.recipe_id;

    // Tarif like'landı mı kontrol et
    const isLiked = isRecipeLiked(id);

    if (isLiked) {
      removeLike(id);
    } else {
      addLike(api.recipe);
    }

    renderRecipes(api.recipe);

    renderLikes();
  }
};

// Sepete eklenen ürünü kaldıran fonksiyon
const deleteItem = (e) => {
  // Eğer delete icon'a tıklandıysa
  if (e.target.classList.contains("bi-x")) {
    // Sil ikonunun kapsayıcısına eriş
    const parentElement = e.target.parentElement;
    // ParentEleman'daki id değerine eriş
    const parentId = parentElement.dataset.id;
    // Id'si bilinen elemanı sepetten kaldır
    basket = basket.filter((i) => i.id != parentId);

    // Basket'ın güncel halini localStorage'a gönder
    setToLocalStorage("basket", basket);

    // Silinen sepet elemanını arayüzden kaldır
    parentElement.remove();

    // Sepette eleman varmı kontrol et
    controlBtn(basket);
  }
};

// Sepeti temizleyen fonksiyon
const clearBasket = () => {
  // Kullanıcıdan onay al
  const res = confirm("Bütün sepet silinecek!! Eminmisiniz ??");

  // Eğer onay verilirse sepeti temizle
  if (res) {
    // localstorage'ı temizle
    setToLocalStorage("basket", null);
    // basket dizisi sıfırla
    basket = [];
    // Sepetin html'ini sıfırla
    uiElements.basketList.innerHTML = "";

    // Sepetteki ürün miktarına göre clearBtn'in görünürlüğünü ayarla
    controlBtn(basket);
  }
};

// Sayfanın yüklenme anı ve Url'deki değişimi izle
["load", "hashchange"].forEach((eventName) => {
  window.addEventListener(eventName, controlUrl);
  // Sepete eklenen elemanları render et
  renderBasketItem(basket);
  // clearBtn'i render edecek fonksiyonu çalıştır
  controlBtn(basket);

  renderLikes();
});

// Arayüzdeki form'un gönderilmesini izle
uiElements.form.addEventListener("submit", handleSubmit);

// RecipeArea kısmındaki tıklanmaları izle
uiElements.recipeArea.addEventListener("click", handleClick);

// Sepet elemanlarına tıklanınca çalışacak fonksiyon
uiElements.basketList.addEventListener("click", deleteItem);

// Sepeti temizle butonuna tıklanınca sepeti temizleyecek fonksiyon
uiElements.clearBtn.addEventListener("click", clearBasket);
