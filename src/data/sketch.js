const sketchImages = import.meta.glob("../assets/sketch/*.avif", {
  eager: true,
  import: "default",
});

// ✅ 根據檔名中的數字排序（如 sketch_1 → 1）
const sketch = Object.entries(sketchImages)
  .sort(([aPath], [bPath]) => {
    const getNumber = (p) => {
      const match = p.match(/sketch_(\d+)\.avif$/);
      return match ? parseInt(match[1], 10) : 0;
    };
    return getNumber(aPath) - getNumber(bPath);
  })
  .map(([path, image], index) => {
    const id = index + 1;
    return {
      id,
      title: `SKETCH ${id}`,
      price: Math.floor(Math.random() * 1000) + 100,
      image,
    };
  });

export default sketch;
