import { createContext, useEffect, useState } from "react";


export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({children}){
    const [loading, setLoading] = useState(true);
    const [ listOfProducts, setlistOfProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null);

    async function fetchListofProducts() {
        const apiResponse = await fetch('https://dummyjson.com/products');
        const result = await apiResponse.json();
        
        if(result && result?.products){
            setlistOfProducts(result?.products);
            setLoading(false);
        }
    }

    //console.log(listOfProducts);
    

    useEffect(()=>{
        fetchListofProducts()
    },[]);
    return(
        <ShoppingCartContext.Provider value={{listOfProducts,loading,setLoading,productDetails, setProductDetails}}>
            {children}
            </ShoppingCartContext.Provider>
    )

}

export default ShoppingCartProvider;
