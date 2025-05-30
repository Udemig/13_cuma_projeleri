// Auth Elemanları
const authEle = {
  loginForm: document.querySelector("#login-form"),
  nameWarning: document.querySelector(".name-warning-wrapper"),
  passwordWarning: document.querySelector(".password-warning-wrapper"),
};

// Main Elemanları
const mainEle = {
  tweetsArea: document.querySelector("#tweets-area"),
  topArea: document.querySelector(".top-area"),
};

// ! Fonksiyonlar

// Kullanıcının atmış olduğu tweet'leri renderlayan fonksiyon
const renderTimeline = (tweets, outlet) => {
  // tweets dizisini dön ve her eleman için bir html oluştur
  console.log(tweets);

  let tweetsHTML = tweets
    .map(
      (tweet) => `        <div class="tweet">
 
          <div class="user">
            <div class="user-info">
              <img src="./images/default.png" alt="user-image" />
              <h4>${tweet.user_info.name} </h4>
              <a href='?user#${tweet.screen_name}'>@${tweet.screen_name} </a>
              <p id='tweet-date'>${moment(tweet.created_at).fromNow()}</p>
            </div>
            <i class="fa-solid fa-ellipsis"></i>
          </div>
     
          <div class="tweet-content">
            <a href='?status/${tweet.screen_name}'>
      ${tweet.text}
            </a>
          </div>

    
          <div class="tweet-info">
            <button>
              <i class="fa-regular fa-comment"></i> <span> ${
                tweet.replies
              }</span>
            </button>
            <button><i class="fa-solid fa-retweet"></i> <span> ${
              tweet.retweets
            }</span></button>
            <button><i class="fa-regular fa-heart"></i> <span> ${
              tweet.favorites
            }</span></button>
            <button>
              <i class="fa-regular fa-bookmark"></i> <span> ${
                tweet.bookmarks
              }</span>
            </button>
          </div>
        </div>`
    )
    .join("");

  outlet.innerHTML = tweetsHTML;
};

// Kullanıcı detay sayfasını renderlayacak fonksiyon
const renderUserInfo = (user) => {
  mainEle.topArea.innerHTML = `
  
  <div class='top'>
  
  <a href='/'>
  <i class="fa-solid fa-arrow-left"></i>
  </a>

  <h2>${user.name} </h2>
  
  </div>


  <div class='banner-image'>
  <img src='${user.header_image}' />
  </div>

  <div class='user-info'>
  
  <img src='${user.avatar}'/>

 <div class='btn-wrapper'>


  <button class='btn'><i class="fa-solid fa-ellipsis"></i></button>
  <button class='btn'><i class="fa-solid fa-envelope"></i></button>
  <button>Takip Et</button></div>

  </div>


  <div class='user-detail'>
  
  <h1> Mehmet Can Seyhan</h1>

  <p class='username'>@isvec_krali_</p>


  <p class='description'>CEO@Udemig,Yazılım Mühendisi. Akrediteli,iş garantili Yazılım Akademisi Software Eng. Job guaranteed,Accredited software academy https://t.co/bnY0pkKVtv</p>

  <div class='bottom'>
  <p><span>${user.friends} </span> Takip Edilen</p>
  <p><span>${user.sub_count} </span> Takipçi</p>
  </div>

  </div>
  
  `;
};

// Kullanıcının attığı tweetleri renderlayacak fonksiyon
const renderUsersTweets = (tweets, user) => {
  mainEle.tweetsArea.innerHTML = tweets
    .map(
      (tweet) => `<div class="tweet">
 
          <div class="user">
            <div class="tweet-user-info">
              <img src="${user.avatar}" alt="user-image" />
              <h4>${tweet.author.name} </h4>
              <a>@${tweet.author.screen_name} </a>
              <p id='tweet-date'>${moment(tweet.created_at).fromNow()}</p>
            </div>
            <i class="fa-solid fa-ellipsis"></i>
          </div>
     
          <div class="tweet-content">
            <a href='?status/${tweet.author.screen_name}'>
      ${tweet.text}
            </a>
          </div>

    
          <div class="tweet-info">
            <button>
              <i class="fa-regular fa-comment"></i> <span> ${
                tweet.replies
              }</span>
            </button>
            <button><i class="fa-solid fa-retweet"></i> <span> ${
              tweet.retweets
            }</span></button>
            <button><i class="fa-regular fa-heart"></i> <span> ${
              tweet.favorites
            }</span></button>
            <button>
              <i class="fa-regular fa-bookmark"></i> <span> ${
                tweet.bookmarks
              }</span>
            </button>
          </div>
        </div>`
    )
    .join("");
};

// Tweet detay sayfasını renderlayacak fonksiyon
const renderTweetDetail = () => {};

export {
  authEle,
  mainEle,
  renderTimeline,
  renderUserInfo,
  renderTweetDetail,
  renderUsersTweets,
};
