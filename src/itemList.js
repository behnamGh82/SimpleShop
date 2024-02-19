import item1 from "./assets/items/item1.jpg";
import item2 from "./assets/items/item2.jpg";
import item3 from "./assets/items/item3.jpg";
import item4 from "./assets/items/item4.jpeg";
import item5 from "./assets/items/item5.jpg";
import item6 from "./assets/items/item6.jpg";
import item7 from "./assets/items/item7.jpg";
import item8 from "./assets/items/item8.jpg";
import item9 from "./assets/items/item9.jpg";
const itemImage = [
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  item7,
  item8,
  item9,
];
const itemList = Array(Math.round(Math.random() * 1000))
  .fill(null)
  .map((value, index) => {
    const price = Math.round(Math.random() * 1000000) + 100000;
    return {
      id: index,
      image: itemImage[Math.round(Math.random() * itemImage.length)],
      title: "کالای شماره" + index + 1,
      desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
      price: price,
      salePrice: Math.round(price / 3),
      mojodi: Math.round(Math.random() * 100),
    };
  });
export default itemList;
