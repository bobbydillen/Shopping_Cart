import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItem, setCartItem] = useState([]);
  const navigate = useNavigate();

  async function fetchListofProducts() {
    const apiResponse = await fetch('https://dummyjson.com/products');
    const result = await apiResponse.json();

    if (result && result?.products) {
      setListOfProducts(result?.products);
      setLoading(false);
    }
  }

  function handleAddToCart(productDetails) {
    let cpyExistingCartItems = [...cartItem];
    const findIndexofCurrentItem = cpyExistingCartItems.findIndex(
      cartItem => cartItem.id === productDetails.id
    );

    if (findIndexofCurrentItem === -1) {
      cpyExistingCartItems.push({
        ...productDetails,
        quantity: 1,
        totalPrice: productDetails?.price,
      });
    } else {
      cpyExistingCartItems[findIndexofCurrentItem] = {
        ...cpyExistingCartItems[findIndexofCurrentItem],
        quantity: cpyExistingCartItems[findIndexofCurrentItem].quantity + 1,
        totalPrice:
          (cpyExistingCartItems[findIndexofCurrentItem].quantity + 1) *
          cpyExistingCartItems[findIndexofCurrentItem].price,
      };
    }

    setCartItem(cpyExistingCartItems);
    localStorage.setItem('cartItems', JSON.stringify(cpyExistingCartItems));
    navigate("/product-cart");
  }

  function handleRemoveFromCart(getProductDetails, isFullyRemoveFromCart) {
    let cpyExistingCartItems = [...cartItem];
    const findIndexofCurrentCartItem = cpyExistingCartItems.findIndex(
      item => item.id === getProductDetails.id
    );

    if (findIndexofCurrentCartItem !== -1) {
      if (isFullyRemoveFromCart || cpyExistingCartItems[findIndexofCurrentCartItem].quantity === 1) {
        cpyExistingCartItems.splice(findIndexofCurrentCartItem, 1);
      } else {
        cpyExistingCartItems[findIndexofCurrentCartItem] = {
          ...cpyExistingCartItems[findIndexofCurrentCartItem],
          quantity: cpyExistingCartItems[findIndexofCurrentCartItem].quantity - 1,
          totalPrice:
            (cpyExistingCartItems[findIndexofCurrentCartItem].quantity - 1) *
            cpyExistingCartItems[findIndexofCurrentCartItem].price,
        };
      }
    }

    setCartItem(cpyExistingCartItems);
    localStorage.setItem('cartItems', JSON.stringify(cpyExistingCartItems));
  }

  function handleUpdateCartItem(getProductDetails) {
    let cpyExistingCartItems = [...cartItem];
    const findIndexofCurrentCartItem = cpyExistingCartItems.findIndex(
      item => item.id === getProductDetails.id
    );

    if (findIndexofCurrentCartItem !== -1) {
      cpyExistingCartItems[findIndexofCurrentCartItem] = {
        ...cpyExistingCartItems[findIndexofCurrentCartItem],
        quantity: cpyExistingCartItems[findIndexofCurrentCartItem].quantity + 1,
        totalPrice:
          (cpyExistingCartItems[findIndexofCurrentCartItem].quantity + 1) *
          cpyExistingCartItems[findIndexofCurrentCartItem].price,
      };
    }

    setCartItem(cpyExistingCartItems);
    localStorage.setItem('cartItems', JSON.stringify(cpyExistingCartItems));
  }

  useEffect(() => {
    fetchListofProducts();
    setCartItem(JSON.parse(localStorage.getItem('cartItems') || '[]'));
  }, []);

  return (
    <ShoppingCartContext.Provider
      value={{
        listOfProducts,
        loading,
        setLoading,
        productDetails,
        setProductDetails,
        handleAddToCart,
        cartItem,
        handleRemoveFromCart,
        handleUpdateCartItem,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
