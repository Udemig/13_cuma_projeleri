// Html'den elemanları çek
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const navLinks = document.querySelector(".nav-links");

// menuBtn'e tıklanınca navLinks ve closeBtn'i görünür kıl menuBtn'ise yok et
menuBtn.addEventListener("click", () => {
  navLinks.classList.add("active");
  closeBtn.style.display = "block";
  menuBtn.style.display = "none";
});

// closeBtn'e tıklanınca navLinks ve closeBtn'i yok et menuBtn'ise görünür kıl
closeBtn.addEventListener("click", () => {
  navLinks.classList.remove("active");
  closeBtn.style.display = "none";
  menuBtn.style.display = "block";
});
