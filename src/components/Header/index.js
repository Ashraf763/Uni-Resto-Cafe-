import './index.css'
import {withRouter} from 'react-router-dom'
import {useContext} from 'react'
import {HiOutlineShoppingCart} from 'react-icons/hi'
import {CartContext} from '../../context/CartContext'

const Header = props => {
  const {history} = props
  const {cartItems} = useContext(CartContext)

  const onClickCart = () => {
    history.push('cart')
  }
  const onCLickHome = () => {
    history.push('/')
  }

  return (
    <div className="header-container">
      <div className="header">
        <h1 className="header-txt" onClick={onCLickHome}>
          UNI Resto Cafe
        </h1>
        <div className="cart-container-1">
          <h1 className="my-orders">My Orders</h1>

          <button type="button" className="cart" onClick={onClickCart}>
            <i className="cart-icon">
              <HiOutlineShoppingCart />
            </i>
            <span className="cart-count">{cartItems.length}</span>
          </button>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default withRouter(Header)
