import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import SuitBanner from "./assets/images/SuitBanner.jpg";
import itemList from "./itemList.js";
function App() {
  const [basket, setBasket] = useState([]);
  const [closeBasket, setCloseBasket] = useState(true);
  const buyItem = (item) => {
    setBasket([...basket, item]);
  };
  const deletItem = (item) => {
    const findIndex = basket.findIndex((basket) => basket === item);
    basket.splice(findIndex, 1);
    setBasket([...basket]);
  };
  const getItemGroup = () => {
    const list = [];
    basket.forEach((item) => {
      const finded = list.find((i) => i.item === item);
      if (finded) {
        finded.count++;
      } else {
        list.push({ count: 1, item });
      }
    });
    return list;
  };
  return (
    <div className="bg-[#f1f1f1]">
      {/* header section */}
      <div className="flex p-3 px-6 items-center">
        <i className="fa-solid fa-bars text-lg"></i>
        <div className="flex items-center mr-8">
          <h1 className="text-2xl">فروشگاه شیک</h1>
        </div>
        <div className="flex-1"></div>
        <div
          className="relative"
          onClick={() => {
            if (basket.length > 0) {
              setCloseBasket(false);
            }
          }}
        >
          <FontAwesomeIcon icon={faBagShopping} className="w-7 h-7 ml-2" />
          {/* <img src={bagadd} alt="" className="w-7 h-7 ml-2" /> */}
          {basket.length !== 0 && (
            <span className="absolute bg-red-500 text-white rounded-full w-6 h-6 text-center top-[50%] left-[50%]">
              {(basket.length > 99 ? "+99" : basket.length).toLocaleString(
                "fa-ir"
              )}
            </span>
          )}
        </div>
        <h2>سبد خرید</h2>
      </div>
      {/* Banner section */}
      <div className="h-[1px] bg-slate-300 mx-4"></div>
      <img
        src={SuitBanner}
        className="mt-2 m-auto w-[70%] h-2/6 rounded-3xl p-4 "
      />
      {/* product list section */}
      <div className="flex flex-wrap p-6 gap-4">
        {itemList.map((value) => {
          const buyCount = basket.filter((item) => item === value).length;
          return (
            <div className="flex-1 rounded-lg  border-gray-300 border-[1px] min-w-[200px] bg-white relative">
              <div className="absolute bg-red-500 text-white rounded-full w-20 h-6 text-center top-[1px] left-[68%]">
                {value.mojodi.toLocaleString("fa-ir")} عدد
              </div>
              <img src={value.image} className="w-28 m-auto" />
              <div className="rounded-t-2xl border-gray-300 border-[1px] p-4">
                <h4 className="font-bold">{value.title}</h4>
                <p className="font-thin">{value.desc}</p>
                <p className="font-thin text-left line-through decoration-slate-400">
                  {value.price.toLocaleString("fa-ir")}
                </p>
                <p className="font-bold text-left ">
                  {value.salePrice.toLocaleString("fa-ir")} تومان
                </p>
                {buyCount === 0 && (
                  <button
                    disabled={value.mojodi === 0}
                    className="w-full h-[30px] m-2 text-center bg-black text-white rounded-2xl disabled:bg-slate-200"
                    onClick={() => buyItem(value)}
                  >
                    خرید کالا
                  </button>
                )}
                {buyCount !== 0 && (
                  <div className="flex">
                    <button onClick={() => deletItem(value)}>-</button>
                    <button
                      disabled={value.mojodi === 0}
                      className="w-full h-[30px] m-2 text-center bg-black text-white rounded-2xl disabled:bg-slate-200"
                    >
                      {buyCount} عدد
                    </button>
                    <button
                      onClick={() => {
                        if (buyCount >= value.mojodi)
                          return alert("cant buy more");
                        buyItem(value);
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* basket dialog */}
      {closeBasket == false && (
        <div
          className="fixed w-full h-full top-0 p-6 backdrop-blur-sm"
          onClick={() => setCloseBasket(true)}
        >
          <div className="flex flex-col gap-4 p-4 bg-white rounded-xl">
            {getItemGroup().map((itembuyed) => {
              const { item, count } = itembuyed;
              return (
                <div key={item.id} className="flex gap-3">
                  <img src={item.image} className="w-8 h-8" />
                  <p>
                    {item.title},{item.desc}, تعداد خرید : ({count})
                  </p>
                </div>
              );
            })}
            <p>تعداد کل: {basket.length.toLocaleString("fa-ir")} عدد</p>
            <p>
              قیمت کل:{" "}
              {getItemGroup()
                .reduce((price, orderitem) => {
                  return orderitem.count * orderitem.item.salePrice + price;
                }, 0)
                .toLocaleString("fa-ir")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
