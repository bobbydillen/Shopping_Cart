import { useContext } from "react";
import { ShoppingCartContext } from "../../context";

function CartPage() {

    const { cartItem} =useContext(ShoppingCartContext)
    return (
        <div className="max-w-5xl mx-auto max-md:max-w-xl py-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center">My Cart Page</h1>
    
          {/* Begin grid layout */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {/* your cart items here */}
            </div>
    
            {/* Order Summary */}
            <div className="bg-gray-100 rounded-sm p-4 h-max">
              <h3 className="text-xl font-extrabold text-gray-950 border-b border-gray-300 pb-2">
                Ordered Summary
              </h3>
              <ul className="text-gray-700 mt-4 ">
                <p className="flex flex-wrap gap-4 text-sm font-bold ">
                    Total <span></span>
                </p>
              </ul>
              <div className="mt-4 flex gap-2 space-y-2">
                <button className="text-sm px-4 py-3 bg-black text-white font-extrabold">Checkout</button>
                <button className="text-sm px-4 py-3 bg-black text-white font-extrabold">Continue Shopping</button>
              </div>
            </div>
    
          </div>
        </div>
      );
    }

export default CartPage;