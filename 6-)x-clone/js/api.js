class API {
  constructor() {
    this.baseUrl = "https://twitter-api45.p.rapidapi.com";
    this.options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8f32504ce5mshdcbaaca26770543p1829d9jsnefacb353beac",
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
}

export default API;
