import './index.css'
import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'

import DishDetails from '../DishDetails'
import FailureView from '../FailureView'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const MainSection = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  })
  const [activeCategory, setActiveCAtegory] = useState('Salads and Soup')

  const onClickCategory = category => {
    setActiveCAtegory(category)
  }

  useEffect(() => {
    const fetchData = async () => {
      setApiResponse({
        data: null,
        errorMsg: null,
        status: apiStatusConstants.inProgress,
      })
      const url =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      const options = {
        method: 'GET',
      }
      const response = await fetch(url, options)
      const jsonData = await response.json()

      if (response.ok) {
        setApiResponse(prevApiResponse => ({
          ...prevApiResponse,
          status: apiStatusConstants.success,
          data: jsonData[0].table_menu_list,
        }))
      } else {
        setApiResponse(prevApiResponse => ({
          ...prevApiResponse,
          status: apiStatusConstants.failure,
          errorMsg: jsonData.error_msg,
        }))
      }
    }

    fetchData()
  }, [])

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderFailureView = () => <FailureView />

  const renderSuccessView = () => {
    const {data} = apiResponse

    const formattedData = data.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      categoryDishes: each.category_dishes.map(eachDish => ({
        addonCat: eachDish.addonCat,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        dishCalories: eachDish.dish_calories,
        dishCurrency: eachDish.dish_currency,
        dishDescription: eachDish.dish_description,
        dishId: eachDish.dish_id,
        dishImage: eachDish.dish_image,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        nexturl: eachDish.nexturl,
        addedtoCart: 0,
      })),
    }))

    const filteredData = formattedData.filter(
      each => each.menuCategory === activeCategory,
    )

    return (
      <>
        <ul className="categories-container">
          {formattedData.map(each => (
            <li
              key={each.menuCategoryId}
              onClick={() => onClickCategory(each.menuCategory)}
              className={`category ${
                activeCategory === each.menuCategory ? 'active' : ''
              }`}
            >
              {each.menuCategory}
            </li>
          ))}
        </ul>
        <hr />

        <ul className="dish-details-container">
          {filteredData[0].categoryDishes.map(each => (
            <DishDetails key={each.dishId} details={each} />
          ))}
        </ul>
      </>
    )
  }

  const renderData = () => {
    const {status} = apiResponse

    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return renderData()
}
export default MainSection
