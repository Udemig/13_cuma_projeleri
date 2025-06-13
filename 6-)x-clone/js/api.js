class API {
  constructor() {
    this.baseUrl = "https://twitter-api45.p.rapidapi.com";
    this.options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "463cb6bdb3msh544272941ec8857p1bb2a9jsn24372257dfc0",
        "x-rapidapi-host": "twitter-api45.p.rapidapi.com",
      },
    };
  }

  // Kullanıcı verisini alacak fonksiyon
  async getUser(username) {
    try {
      // Api'a istek at
      const res = await fetch(
        `${this.baseUrl}/screenname.php?screenname=${username}`,
        this.options
      );

      // Api'dan gelen veriyi js nesnesine çevir
      const user = await res.json();

      // Api'dan gelen veriyi return et
      return user;
    } catch (err) {
      // Api isteği sırasında bir hata olursa
      console.log(`Hataa: ${err}`);
    }
  }

  // Kullanıcının attığı tweetleri alacak fonksiyon
  async fetchData(query) {
    const response = await fetch(
      `${this.baseUrl}/search_communities_latest.php?query=${query}`,
      this.options
    );
    const data = await response.json();

    return data.timeline;
  }

  // Kullanıcının detay sayfası için verileri alacak fonksiyon
  async getDetail(username) {
    // Api'a istek at
    const response = await fetch(
      `${this.baseUrl}/usermedia.php?screenname=${username}`,
      this.options
    );

    // Api'dan gelen veriyi js nesnesine çevir
    const data = await response.json();

    // Api'dan elde edilen veriyi geri dönder
    return data;
  }

  // Tweet detay sayfası için verileri alacak fonksiyon
  async getTweetDetail(tweetId) {
    const res = await fetch(
      `${this.baseUrl}/tweet.php?id=${tweetId}`,
      this.options
    );

    const data = await res.json();

    return data;
  }
}

export default API;
