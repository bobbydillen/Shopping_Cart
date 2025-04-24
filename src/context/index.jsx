import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({children}){
    const [loading, setLoading] = useState(true);
    const [ listOfProducts, setlistOfProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null);
    const [cartItem, setCartItem] = useState([]);
    const navigate = useNavigate();

    async function fetchListofProducts() {
        const apiResponse = await fetch('https://dummyjson.com/products');
        const result = await apiResponse.json();
        
        if(result && result?.products){
            setlistOfProducts(result?.products);
            setLoading(false);
        }
    }

    //console.log(listOfProducts);
    function handleAddToCart(productDetails){
        console.log(productDetails);

        let cpyExistingCartItems = [...cartItem];
        const findIndexofCurrentItem = cpyExistingCartItems.findIndex(cartItem=> cartItem.id === productDetails.id);

        console.log(findIndexofCurrentItem);

        if (findIndexofCurrentItem === -1){
            cpyExistingCartItems.push({
                ...productDetails,
                quantity :1,
                totalPrice : productDetails?.price
            })
        }else{

            console.log("Its Coming Here");
            
        }
        
        console.log(cpyExistingCartItems, "cpyexisting");
        setCartItem(cpyExistingCartItems);
        localStorage.setItem('cartItems',JSON.stringify(cpyExistingCartItems));
        navigate("/product-cart")

    }
    

    useEffect(()=>{
        fetchListofProducts()
    },[]);

    console.log(cartItem);
    
    return(
        <ShoppingCartContext.Provider value={{listOfProducts,loading,setLoading,productDetails, setProductDetails,handleAddToCart, cartItem,}}>
            {children}
            </ShoppingCartContext.Provider>
    )

}

export default ShoppingCartProvider;
