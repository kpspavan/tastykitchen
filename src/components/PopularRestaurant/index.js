import {Component} from 'react'
import {FaLessThan, FaGreaterThan} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import Footer from '../Footer/index'
import Filter from '../Filter/index'
import RestaurantCard from '../RestaurantCard/index'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    isRestaurantsLoading: true,
    CokkingDetails: [],
    limit: 9,
    activePage: 1,
    activesort: sortByOptions[1].value,
  }

  componentDidMount() {
    this.getFoodDetails()
  }

  getFoodDetails = async () => {
    const {limit, activePage, activesort} = this.state
    const jwtToken1 = Cookies.get('jwt_token')
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activesort}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken1}`,
      },
      method: 'GET',
    }
    const response1 = await fetch(url, options)
    const data = await response1.json()

    const updatedCookies = data.restaurants.map(eachCookies => ({
      costForTwo: eachCookies.cost_for_two,
      cuisine: eachCookies.cuisine,
      groupByTime: eachCookies.group_by_time,
      hasOnlineDelivery: eachCookies.has_online_delivery,
      hasTableBooking: eachCookies.has_table_booking,
      id: eachCookies.id,
      imageUrl: eachCookies.image_url,
      isDeliveringNow: eachCookies.is_delivering_now,
      location: eachCookies.location,
      menuType: eachCookies.menu_type,
      name: eachCookies.name,
      opensAt: eachCookies.opens_at,
      userRating: eachCookies.user_rating,
    }))

    this.setState({CokkingDetails: updatedCookies, isRestaurantsLoading: false})
  }

  updateaction = activesort => {
    this.setState({activesort}, this.getFoodDetails)
  }

  onIncrement = () => {
    const {activePage} = this.state

    if (activePage < 4 && activePage > 0) {
      this.setState(
        prevstate => ({activePage: prevstate.activePage + 1}),
        this.getFoodDetails,
      )
    }
  }

  onDecrement = () => {
    const {activePage} = this.state
    if (activePage < 5 && activePage > 1) {
      this.setState(
        prevstate => ({activePage: prevstate.activePage - 1}),
        this.getFoodDetails,
      )
    }
  }

  renderpaginationview = () => {
    const {limit} = this.state
    const total = Math.ceil(30 / limit)
    const {activePage, decrement} = this.state
    return (
      <div className="center">
        <button
          testid="pagination-left-button"
          type="button"
          onClick={this.onDecrement}
        >
          <FaLessThan className="icons" />
        </button>
        <p testid="active-page-number">
          {activePage} of {total} {decrement}
        </p>
        <button
          type="button"
          testid="pagination-right-button"
          onClick={this.onIncrement}
        >
          <FaGreaterThan className="icons" />
        </button>
      </div>
    )
  }

  renderCookingDetails = () => {
    const {CokkingDetails, activesort, isRestaurantsLoading} = this.state
    return (
      <>
        {isRestaurantsLoading ? (
          <div
            className="restaurants-loader-container"
            testid="restaurants-list-loader"
          >
            <Loader type="Oval" color="#F7931E" height="50" width="50" />
          </div>
        ) : (
          <div className="pd">
            <Filter
              updateaction={this.updateaction}
              sortByOptions={sortByOptions}
              activesort={activesort}
            />
            <hr />
            <ul className="home-ul-flex">
              {CokkingDetails.map(eachItem => (
                <RestaurantCard key={eachItem.id} eachItem={eachItem} />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }

  render() {
    return (
      <div className="over">
        {this.renderCookingDetails()}
        {this.renderpaginationview()}
      </div>
    )
  }
}

export default Home
