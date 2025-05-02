class API {
  // Kurucu metod
  constructor(query) {
    this.query = query;
  }

  // Arama sonucunda verileri api'dan getirecek fonksiyon
  async getResults() {
    // Api'dan verileri al
    const response = await fetch(
      "https://forkify-api.herokuapp.com/api/search?q=pizza"
    );
    // Gelen veriyi js nesnesine çevir

    const data = await response.json();

    console.log(data);
  }
}

export default API;
