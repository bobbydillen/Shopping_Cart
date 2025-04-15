import { createContext, useEffect, useState } from "react";


export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({children}){
    const [loading, setLoading] = useState(false);
    const [ listOfProducts, setlistOfProducts] = useState([]);

    async function fetchListofProducts() {
        const apiResponse = await fetch('https://dummyjson.com/products');
        const result = await apiResponse.json();
        
        if(result && result?.products){
            setlistOfProducts(result?.products);
        }
    }

    //console.log(listOfProducts);
    

    useEffect(()=>{
        fetchListofProducts()
    },[]);
    return(
        <ShoppingCartContext.Provider value={{listOfProducts}}>
            {children}
            </ShoppingCartContext.Provider>
    )

}

export default ShoppingCartProvider;
