import { useContext } from "react";
import { ShoppingCartContext } from "../../context";

function ProductListPage() {
    const { listOfProducts} = useContext(ShoppingCartContext);
    console.log(listOfProducts);
    
    return (
    <div>Product List Page</div>
    )
}

export default ProductListPage;