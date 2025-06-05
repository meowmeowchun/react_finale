// src/data/fanart.js
const images = import.meta.glob('../assets/fanart/*.avif', { eager: true });

const sortedImageEntries = Object.entries(images).sort(([a], [b]) => {
  const getNum = (str) => Number(str.match(/fanart_(\d+)\.avif/)?.[1]);
  return getNum(a) - getNum(b);
});

const fanarts = sortedImageEntries.map(([path, module], index) => ({
  id: index + 1,
  title: `FANART ${index + 1}`,
  price: Math.floor(Math.random() * 1000), // 你可以改成實際價格資料
  image: module.default,
}));

export default fanarts;
