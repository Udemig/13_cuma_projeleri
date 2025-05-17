class API {
  // Kurucu metod
  constructor() {
    this.results = [];
    this.recipe = {};
    this.ingredients = [];
  }

  // Arama sonucunda verileri api'dan getirecek fonksiyon
  async getResults(query) {
    // Api'dan verileri al
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${query}`
    );
    // Gelen veriyi js nesnesine çevir

    const data = await response.json();

    // Api'dan gelen recipes verisini class içerisindeki results dizisine aktar
    this.results = data.recipes;
  }

  // Tarif verilerini api'da alacak fonksiyon
  async getRecipe(id) {
    // Api'a istek at
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );

    // Gelen veriyi js nesnesine çevir
    const data = await response.json();

    // Data içerisindeki recipe objesini Api classı içerisindeki recipe objesine aktar
    this.recipe = data.recipe;

    // Data içerisindeki ingredients'ı Api classı içerisindeki ingredients dizisine aktar
    this.ingredients = data.recipe.ingredients;

    //
  }
}

export default API;
