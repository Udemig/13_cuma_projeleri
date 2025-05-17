import { createIngredient } from "./helpers.js";

// Arayüz elemanlarını tutan obje
const uiElements = {
  form: document.querySelector("form"),
  resultList: document.querySelector(".results"),
  recipeArea: document.querySelector(".recipe"),
  basketList: document.querySelector(".basket ul"),
  clearBtn: document.querySelector("#clear"),
};

// Arama sonuçlarını render eden fonksiyon
const renderResults = (recipes) => {
  // uiElements içerisindeki resultsList'in içeriğini temizle
  uiElements.resultList.innerHTML = "";
  // Gelen recipe'nin ilk 10 elemanına eriş ve her recipe elemanı için arayüze bir arama sonucu render et
  recipes.slice(0, 12).forEach((recipe) => {
    // Dizinin dönülen her elemanı için bir html oluştur
    const markup = ` <a href='#${recipe.recipe_id}' class="result-link">
            <img
              src="${recipe.image_url}"
              alt="result-link-image"
            />
            <div class="data">
              <h4>${recipe.title}</h4>
              <p>${recipe.publisher}</p>
            </div>
          </a>`;

    // Oluşturulan arayüz elemanını uiElement içerisindeki resultList'e ekle
    uiElements.resultList.insertAdjacentHTML("beforeend", markup);
  });
};

// Tarif bilgilerini render eden fonksiyon
const renderRecipes = (recipe) => {
  // Recipe kısmında render edilecek html'i oluştur
  const recipeMarkup = ` <figure>
            <img
              src="${recipe.image_url}"
              alt="recipe-image"
            />

            <h1>${recipe.title}</h1>

            <div class="like-area">
              <i id='like-btn' class="bi bi-heart"></i>
            </div>
          </figure>

          <div class="ingredients">
            <ul>
            ${createIngredient(recipe.ingredients.slice(0, 15))}
            
             
            </ul>
          </div>

          <button id="add-to-basket">
            <i class="bi bi-cart"></i>
            <span>Alışveriş Sepetine Ekle</span>
          </button>

          <div class="directions">
            <h2>Nasıl Pişirilir?</h2>
            <p>
              Bu tarif dikkatlice <span>${recipe.publisher}</span> tarafından
              hazırlanmış ve test edilmiştir. Diğer detaylara onların websitesi
              üzerinden erişebilirsiniz.
            </p>

            <a href="${recipe.publisher}" target="_blank">Yönerge</a>
          </div>`;

  // Oluşturulan Html'i arayüze ekle
  uiElements.recipeArea.innerHTML = recipeMarkup;
};

// Loader render eden fonksiyon
const renderLoader = (outlet) => {
  const loader = `
              <div class='loader'>
              <img src='../assets/food-load.gif'/>
              </div>
              
              `;

  // Oluşturulan loader'ı outlet'in Html'i olarak belirle

  outlet.innerHTML = loader;
};

// Basket elemanlarını render edecek fonksiyon

const renderBasketItem = (items) => {
  // items dizisini dönerek basket elemanları için birer html oluştur
  const markup = items
    .map(
      (item) => `       <li data-id=${item.id} >
              <i class="bi bi-x"></i>
              <span>${item.title}</span>
            </li>`
    )
    .join("");

  // Oluşturulan html'i uiElements içerisindeki basketList'içerisine ekle
  uiElements.basketList.innerHTML = markup;
};

export {
  uiElements,
  renderResults,
  renderRecipes,
  renderLoader,
  renderBasketItem,
};
