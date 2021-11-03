import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import './index.css'

class Carousel extends Component {
  state = {
    carouselList: [],
    isOffersLoading: true,
  }

  componentDidMount() {
    this.getCoroseel()
  }

  getCoroseel = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const updatedOffers = data.offers.map(eachOffers => ({
      id: eachOffers.id,
      ImageUrl: eachOffers.image_url,
    }))
    this.setState({carouselList: updatedOffers, isOffersLoading: false})
  }

  renderCarouselList = () => {
    const {carouselList} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <Slider {...settings}>
        {carouselList.map(image => (
          <ul className="Home-ul">
            <li key={image.id}>
              <img src={image.ImageUrl} className="home-img" alt="offer" />
            </li>
          </ul>
        ))}
      </Slider>
    )
  }

  renderLoader = () => (
    <div testid="restaurants-offers-loader" className="loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isOffersLoading} = this.state
    return isOffersLoading ? this.renderLoader() : this.renderCarouselList()
  }
}

export default Carousel
