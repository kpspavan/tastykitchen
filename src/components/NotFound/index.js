import {Link} from 'react-router-dom'
import Header from '../Header/index'
import Group from '../../assets/NotFoundImg/Group.png'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img src={Group} className="not-found-img" alt="Not Found" />
      <h1>Page Not Found</h1>
      <p className="nt-para">
        we are sorry, the page you requested could not be found
      </p>
      <Link className="Link-route" to="/">
        <button className="nt-button" type="button">
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFound
