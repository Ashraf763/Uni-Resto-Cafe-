import {createContext, useState} from 'react'

export const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = item => {
    const isItemInCart = cartItems.find(
      eachItem => eachItem.dishId === item.dishId,
    )
    if (isItemInCart) {
      setCartItems(
        cartItems.map(each =>
          each.dishId === item.dishId
            ? {...each, addedtoCart: each.addedtoCart + 1}
            : each,
        ),
      )
    } else {
      setCartItems([...cartItems, {...item, addedtoCart: 1}])
    }
  }

  const removeFromCart = item => {
    if (item.addedtoCart > 1) {
      setCartItems(
        cartItems.map(each =>
          each.dishId === item.dishId
            ? {...each, addedtoCart: each.addedtoCart - 1}
            : each,
        ),
      )
    } else {
      setCartItems(prevItems =>
        prevItems.filter(each => each.dishId !== item.dishId),
      )
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{cartItems, addToCart, removeFromCart, clearCart}}
    >
      {children}
    </CartContext.Provider>
  )
}
