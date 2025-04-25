// Yazı formatlayan  fonksiyon
const formatText = (text, max) => {
  // Eğer yazı uzunluğu max karakterden küçükse yazıyı olduğu gibi return et
  if (text.length < max) {
    return text;
  } else {
    // Eğer yazı max karakterden uzunsa max karaktere kadar olan kısmı al devamına ... ekle
    return text.slice(0, max) + "...";
  }
};

export { formatText };
