import './index.css'
import {useContext} from 'react'

import {CartContext} from '../../context/CartContext'

const DishDetails = props => {
  const {details} = props
  const {addToCart} = useContext(CartContext)
  const {
    dishImage,
    dishName,
    dishCurrency,
    dishPrice,
    dishDescription,
    dishCalories,
    addonCat,
    dishAvailability,
    dishType,
  } = details

  const handleAddtoCart = () => {
    addToCart(details)
  }

  const veg =
    'https://www.pikpng.com/pngl/b/210-2108039_veg-logo-png-veg-symbol-clipart.png'
  const nonVeg =
    'https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png'

  return (
    <li className="dish">
      <div className="name-container">
        <img
          src={dishType === 2 ? veg : nonVeg}
          alt="veg/Non-veg"
          className="veg-nonveg"
        />
        <div className="description-container">
          <h1 className="name">{dishName}</h1>
          <p className="currency">
            {dishCurrency} {dishPrice}
          </p>
          <p className="description">{dishDescription}</p>

          {dishAvailability ? (
            <div>
              <button
                type="button"
                className="addto-cart-btn"
                onClick={handleAddtoCart}
              >
                Add to Cart
              </button>
            </div>
          ) : (
            <p className="not-available">Not available</p>
          )}

          {addonCat.length > 0 && (
            <p className="custm-txt">Customizations available</p>
          )}
        </div>
      </div>
      <p className="calories">{dishCalories} calories</p>

      <img src={dishImage} alt={dishName} className="image" />
    </li>
  )
}

export default DishDetails
