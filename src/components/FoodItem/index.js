import './index.css'
import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'

import CartContext from '../context/CartContext'

class FoodItem extends Component {
  state = {quantity: 0}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem, addQuantity, decreaseQuantity} = value
          const {quantity} = this.state
          const {foodItemDetails} = this.props
          const {id, imageUrl, name, cost, rating} = foodItemDetails

          const onClickAddToCart = () => {
            this.setState(
              prevState => ({
                quantity: prevState.quantity + 1,
              }),
              addCartItem({...foodItemDetails, quantity: 1}),
            )
          }

          const onAddQuantity = () => {
            this.setState(prevState => ({
              quantity: prevState.quantity + 1,
            }))
            addQuantity(id)
          }

          const onDecreaseQuantity = () => {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
            decreaseQuantity(id)
          }

          return (
            <li testid="foodItem" className=" li-food ">
              <img src={imageUrl} className="food1" alt="food item" />
              <div className="dish-item-details">
                <h1 className="name">{name}</h1>
                <div className="flex">
                  <BiRupee />
                  <p className="dish-price">{cost}</p>
                </div>
                <div className="flex">
                  <AiFillStar color="#FFCC00" />
                  <p className="dish-rating">{rating}</p>
                </div>

                {quantity === 0 ? (
                  <button
                    onClick={onClickAddToCart}
                    className="add-item-button"
                    type="button"
                  >
                    Add
                  </button>
                ) : (
                  <div className="cart-quantity-container">
                    <button
                      testid="decrement-count"
                      onClick={onDecreaseQuantity}
                      type="button"
                      className="quantity-controller-button"
                    >
                      <BsDashSquare
                        className="quantity-controller-icon"
                        color="#52606D"
                        size={12}
                      />
                    </button>
                    <p testid="active-count" className="cart-quantity">
                      {quantity}
                    </p>
                    <button
                      testid="increment-count"
                      onClick={onAddQuantity}
                      type="button"
                      className="quantity-controller-button"
                    >
                      <BsPlusSquare
                        className="quantity-controller-icon"
                        color="#52606D"
                        size={12}
                      />
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default FoodItem
