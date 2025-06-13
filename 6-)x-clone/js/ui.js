import { formatNumber, getMedia } from "./helpers.js";

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

  let tweetsHTML = tweets
    .map(
      (tweet) => `        <div class="tweet">
 
          <div class="user">
            <a href='?user#${tweet.screen_name}' class="tweet-user-info">
              <img src="./images/default.png" alt="user-image" />
              <h4>${tweet.user_info.name} </h4>
              <div>@${tweet.screen_name} </div>
              <p id='tweet-date'>${moment(tweet.created_at).fromNow()}</p>
            </a>
            <i class="fa-solid fa-ellipsis"></i>
          </div>
 
          <div class="tweet-content">
            <a href='?status/${tweet.screen_name}#${tweet.tweet_id}'>
      ${tweet.text}

      ${getMedia(tweet.media)}
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
  console.log(user);

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
  
  <h1>${user.name}</h1>

  <p class='username'>@${user.profile}</p>


  <p class='description'>${user.desc}</p>

  <div class='bottom'>
  <p><span>${formatNumber(user.friends)} </span> Takip Edilen</p>
  <p><span>${formatNumber(user.sub_count)} </span> Takipçi</p>
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
      
      ${getMedia(tweet.media)}
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
const renderTweetDetail = (tweet) => {
  mainEle.topArea.innerHTML = `
  <div class='top'>
  
  <a href='/'>
  <i class="fa-solid fa-arrow-left"></i>
  </a>

  <h2>Gönderi </h2>
  
  </div>



  <div class='tweet-detail'>
  <div>
  <img src='${tweet.author.image}' class='tweet-user-image'/>
  <h1>${tweet.author.name}</h1>
  <h4>@${tweet.author.screen_name}</h4>
</div>


   <button>Abone Ol</button>
 </div>


  <p class='tweet-text'>${tweet.display_text}</p>

  
   <div class="tweet-info">
            <button>
              <i class="fa-regular fa-comment"></i> <span>${tweet.quotes}</span>
            </button>
            <button><i class="fa-solid fa-retweet"></i> <span>${tweet.retweets}</span></button>
            <button><i class="fa-regular fa-heart"></i> <span>${tweet.likes}</span></button>
            <button>
              <i class="fa-regular fa-bookmark"></i> <span>${tweet.bookmarks}</span>
            </button>
          </div>

  
  </div>
  
  
  
  `;
};

// Loader render eden fonksiyon
const renderLoader = (outlet) => {
  outlet.innerHTML = `
  <div class='loader-wrapper'>
<div class="loader">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
    <div class="bar4"></div>
    <div class="bar5"></div>
    <div class="bar6"></div>
    <div class="bar7"></div>
    <div class="bar8"></div>
    <div class="bar9"></div>
    <div class="bar10"></div>
    <div class="bar11"></div>
    <div class="bar12"></div>
</div>
</div>`;
};

export {
  authEle,
  mainEle,
  renderTimeline,
  renderUserInfo,
  renderTweetDetail,
  renderUsersTweets,
  renderLoader,
};
