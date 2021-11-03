import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import Header from '../Header'
import Carousel from '../Carousel'
import PopularRestaurants from '../PopularRestaurant/index'
import FooterSection from '../Footer'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header activeTab="HOME" />
      <Carousel />
      <PopularRestaurants />
      <FooterSection />
    </>
  )
}

export default Home
