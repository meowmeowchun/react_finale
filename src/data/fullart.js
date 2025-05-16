const images = import.meta.glob('../assets/fullart/*.png', {
  eager: true,
  import: 'default',
});

// 依檔名排序，確保順序一致（例如 fullart_1.png, fullart_2.png...）
const sortedImageEntries = Object.entries(images).sort(([a], [b]) =>
  a.localeCompare(b, undefined, { numeric: true })
);

const fullart = sortedImageEntries.map(([path, module], index) => ({
  id: index + 1,
  title: `Fullart ${index + 1}`,
  price: Math.floor(Math.random() * 1000), // 可改成你要的價格邏輯
  image: module,
}));

export default fullart;
