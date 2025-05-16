const sketchImages = import.meta.glob("../assets/sketch/*.png", {
  eager: true,
  import: "default",
});

const sketch = Object.entries(sketchImages).map(([path, image], index) => {
  const id = index + 1;
  return {
    id,
    title: `Sketch ${id}`,
    price: Math.floor(Math.random() * 1000) + 100, // 100~1099
    image,
  };
});

console.log(sketchImages); // Debugging: Log loaded images

export default sketch;