import { Fragment, useContext } from "react";
import { ShoppingCartContext } from "../../context";

function CartTile({ singleCartItem }) {
  const { handleRemoveFromCart, handleUpdateCartItem, handleAddToCart } = useContext(ShoppingCartContext);

  return (
    <Fragment>
      <div className="grid grid-cols-3 items-start gap-5 py-4">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
            <img
              src={singleCartItem?.thumbnail}
              alt={singleCartItem?.title || "Product Image"}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">{singleCartItem?.title}</h3>
            <button
              onClick={() => handleRemoveFromCart(singleCartItem, true)}
              className="text-sm mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
            >
              Remove
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end ml-auto">
          <h3 className="text-lg font-bold text-gray-900">
            ${singleCartItem?.totalPrice.toFixed(2)}
          </h3>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => handleRemoveFromCart(singleCartItem, false)}
              className="disabled: opacity-65 text-sm w-8 h-8 flex items-center justify-center bg-black text-white font-bold rounded"
              disabled={singleCartItem.quantity <= 1}
            >
              -
            </button>
            <span className="text-base font-medium">{singleCartItem?.quantity}</span>
            <button
              onClick={() => handleUpdateCartItem(singleCartItem)}
              className="text-sm w-8 h-8 flex items-center justify-center bg-black text-white font-bold rounded"
              
            >
              +
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-400" />
    </Fragment>
  );
}

export default CartTile;
