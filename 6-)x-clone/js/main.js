import API from "./api.js";
import { getFromLocal } from "./helpers.js";
import {
  mainEle,
  renderTimeline,
  renderUserInfo,
  renderUsersTweets,
} from "./ui.js";

// Api class'ından örnek al
const api = new API();

// localStorage'dan user verisini al
const user = getFromLocal("user");

// Url'i kontrol eden fonksiyon
const controlURL = async () => {
  // Url'e geçilen parametrelere eriş
  const path = window.location.search.split("?")[1];
  const userName = window.location.hash.split("#")[1];

  // Eğer kullanıcı giriş yapmadıysa auth sayfasına yönlendir
  if (!user) {
    window.location = "/auth.html";
  }

  // Eğer ana sayfadaysak
  if (!path) {
    // Api'a istek at
    let tweets = await api.fetchData(user.profile);
    // Elde edilen tweets ile arayüzü renderla
    renderTimeline(tweets, mainEle.tweetsArea);
  }

  // Eğer kullanıcı detay sayfasındaysak
  if (path == "user") {
    const userData = await api.getDetail(user.profile);

    console.log(userData);

    renderUserInfo(userData.user);

    renderUsersTweets(userData.timeline, userData.user);
  }

  // Eğer tweet detay sayfasındaysak
  if (path.split("/")[0] == "status") {
    console.log(`Tweet detay sayfası`);
  }
};

controlURL();
