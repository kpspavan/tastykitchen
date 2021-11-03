import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantCard = props => {
  const getUserRatings = eachrating => ({
    rating: eachrating.rating,
    ratingColor: eachrating.rating_color,
    ratingText: eachrating.rating_text,
    totalReviews: eachrating.total_reviews,
  })

  const {eachItem} = props

  const {imageUrl, name, userRating, id, cuisine} = eachItem
  console.log(cuisine)

  const UserRatings = getUserRatings(userRating)

  const {rating, totalReviews} = UserRatings

  return (
    <Link to={`restaurant/${id}`} className="link-items">
      <li className="food-li" testid="restaurant-item">
        <div className="flex-food">
          <div className="food-item-flex">
            <img src={imageUrl} className="food" alt="website logo" />
            <div>
              <h1 className="h1-food">{name}</h1>
              <p>{cuisine}</p>
              <div className="flex">
                <AiFillStar />
                <p>{rating}</p>
                <p>({totalReviews})</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurantCard
