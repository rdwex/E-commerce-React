import axios from "axios";

// import { createContext, useState } from "react";
const { createContext, useState } = require("react");

export let storeContext = createContext(0);

async function addToCart(productId) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

async function addToWishList(productId) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}
async function getCart() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}

async function getWishlist() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}

async function deleteItem(productId) {
  return axios
    .delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}
async function UpdateCart(productId, count) {
  return axios
    .put(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      { count },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

async function clearItem() {
  return axios
    .delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}
async function deleteWish(productId) {
  return axios
    .delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}
async function pay(cartId, shippingAdd) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" +
        cartId,
      { shippingAdd },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}
export default function StoreContextProvider({ children }) {
  let [counter, setCounter] = useState(0);
  let [counter2, setCounter2] = useState(0);
  return (
    <storeContext.Provider
      value={{
        counter,
        setCounter,
        addToCart,
        getCart,
        deleteItem,
        UpdateCart,
        clearItem,
        pay,
        addToWishList,
        getWishlist,
        counter2,
        setCounter2,
        deleteWish,
      }}
    >
      {children}
    </storeContext.Provider>
  );
}
