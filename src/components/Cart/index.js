import {useContext} from 'react'
import './index.css'

import {CartContext} from '../../context/CartContext'

const Cart = props => {
  const {cartItems, addToCart, removeFromCart} = useContext(CartContext)
  let totalBill = 0
  for (let i = 0; i < cartItems.length; i++) {
    totalBill += cartItems[i].dishPrice * cartItems[i].addedtoCart
  }

  const onCLickHome = () => {
    const {history} = props
    history.push('/')
  }

  const renderCartItems = () => (
    <div className="cart-container">
      <ul className="cart-list-items-container">
        <p>Cart Details</p>
        <hr className="hr" />
        {cartItems.map(each => (
          <li className="cart-dish" key={each.dishId}>
            <div className="det-container">
              <img
                src={each.dishImage}
                alt={each.dishName}
                className="cart-dish-image"
              />
              <div className="description-container-2">
                <h1 className="name">{each.dishName}</h1>
                <details>
                  <summary>Description</summary>
                  <p>{each.dishDescription}</p>
                </details>
              </div>
            </div>

            <div className="buttons-container btn">
              <button type="button" onClick={() => removeFromCart(each)}>
                -
              </button>
              <p>{each.addedtoCart}</p>
              <button type="button" onClick={() => addToCart(each)}>
                +
              </button>
            </div>

            <p className="currency">
              {each.dishCurrency} {each.dishPrice}
            </p>
          </li>
        ))}
      </ul>

      <div className="summary-container">
        <p>billing details</p>
        <hr className="hr" />
        <p className="text">
          Address <span className="blue-txt">add address</span>
        </p>
        <p className="text">
          Mobile No. <span className="blue-txt">add mobile number</span>
        </p>
        <p className="text">
          Total Bill: <span className="amount">{totalBill}</span>
        </p>
        <button type="button" className="pay-btn">
          Proceed to Pay
        </button>
      </div>
    </div>
  )

  return cartItems.length > 0 ? (
    renderCartItems()
  ) : (
    <div className="empty-cart-container">
      <p>Cart is Empty!</p>
      <button type="button" onClick={onCLickHome} className="pay-btn">
        See Menu
      </button>
    </div>
  )
}
export default Cart
