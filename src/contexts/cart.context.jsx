import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";
// below is a helper function that will help to find inside our existing array any cart items that exists
// match the id of that product(productToAdd),if found increment the quantity else make a new cart item

const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contains productToAdd

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  //If found,increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //retuen new array with modified cartItem/new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  //find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  //check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity == 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  //return back cartItems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});
const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};
const INITIAL_STATE = {
  cartCount: 0,
  cartTotal: 0,
  cartItems: [],
  isCartOpen: false,
};

const CartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unhandled type of${type} in the cartReducer`);
  }
};
export const CartProvider = ({ children }) => {
  //   const [isCartOpen, setIsCartOpen] = useState(false);
  //   const [cartItems, setCartItems] = useState([]);
  //   const [cartCount, setCartCount] = useState(0);
  //   const [cartTotal, setCartTotal] = useState(0);

  //   //folowing one is for total price
  //   useEffect(() => {
  //     const newCartTotal = cartItems.reduce(
  //       (total, cartItem) => total + cartItem.quantity * cartItem.price,
  //       0
  //     );
  //     setCartTotal(newCartTotal);
  //   }, [cartItems]);

  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(CartReducer, INITIAL_STATE);

  const upsateCartItemsReducer = (newCartItems) => {
    // generate newCartTotal
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    //generate newCartCount
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  //   useEffect(() => {
  //     const newCartCount = cartItems.reduce(
  //       (total, cartItem) => total + cartItem.quantity,
  //       0
  //     );
  //     setCartCount(newCartCount);
  //   }, [cartItems]);

  const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    //it is a function when a user click add to cart , it added that item to dropdown menu

    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    upsateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    //it is a function when a user click add to cart , it added that item to dropdown menu

    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    upsateCartItemsReducer(newCartItems);
  };

  const addItemToCart = (productToAdd) => {
    //it is a function when a user click add to cart , it added that item to dropdown menu

    const newCartItems = addCartItem(cartItems, productToAdd);
    upsateCartItemsReducer(newCartItems);
  };
  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
