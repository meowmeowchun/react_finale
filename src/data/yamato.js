const images = import.meta.glob("../assets/yamato/*.avif", { eager: true });

const yamato = [
  { id: 1, title: "YAMATO 1", price: 850 },
  { id: 2, title: "YAMATO 2", price: 469 },
  { id: 3, title: "YAMATO 3", price: 222 },
  { id: 4, title: "YAMATO 4", price: 441 },
  { id: 5, title: "YAMATO 5", price: 223 },
  { id: 6, title: "YAMATO 6", price: 449 },
  { id: 7, title: "YAMATO 7", price: 152 },
  { id: 8, title: "YAMATO 8", price: 873 },
  { id: 9, title: "YAMATO 9", price: 105 },
  { id: 10, title: "YAMATO 10", price: 528 },
  { id: 11, title: "YAMATO 11", price: 497 },
  { id: 12, title: "YAMATO 12", price: 262 },
  { id: 13, title: "YAMATO 13", price: 874 },
].map((item) => {
  const imagePath = `../assets/yamato/yamato_${item.id}.avif`;
  const image = images[imagePath]?.default || Object.values(images)[item.id - 1]?.default;
  return { ...item, image };
});

export default yamato;
