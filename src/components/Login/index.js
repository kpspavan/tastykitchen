import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import logo from '../../assets/logo/logo.png'
import banner from '../../assets/logo/banner.png'
import logo1 from '../../assets/logo/logo1.png'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showerrMsg: false, err: ''}

  onSubmitSucces = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    const {history} = this.props
    history.replace('/')
  }

  onFailure = err => {
    this.setState({showerrMsg: true, err})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSucces(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangepasswoard = event => {
    this.setState({password: event.target.value})
  }

  renderdesktopViewbanner = () => {
    const {username, password, showerrMsg, err} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="desktop-view">
        <div className="login-flex">
          <img src={logo} className="login-banner" alt="website logo" />
          <div className="login-container-fluid">
            <div className="main-content">
              <img src={banner} className="login-logo" alt="website logo" />
              <img src={logo1} className="l" alt="website login" />
              <h1 className="h1-login">Tasty Kitchens</h1>
              <h1>Login</h1>
              <form onSubmit={this.submitForm} className="form">
                <div className="flex-1">
                  <div className="contents">
                    <label className="label-login" htmlFor="username">
                      USERNAME
                    </label>
                    <input
                      onChange={this.onChangeUsername}
                      value={username}
                      className="login-input"
                      type="text"
                      placeholder="Enter Your Username"
                      id="username"
                    />
                  </div>
                  <div className="contents">
                    <label className="label-login" htmlFor="password">
                      PASSWORD
                    </label>
                    <input
                      onChange={this.onChangepasswoard}
                      value={password}
                      className="login-input"
                      type="password"
                      placeholder="Enter Your Password"
                      id="password"
                    />
                  </div>
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                  {showerrMsg ? <p className="err">{err}</p> : ''}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  rendermobileViewbanner = () => {
    const {username, password, showerrMsg, err} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="mobile-view-banner">
        <div>
          <div>
            <div>
              <div>
                <img src={banner} className="login-logo" alt="website logo" />
              </div>

              <h1 className="h1-login">Tasty Kitchens</h1>
              <h1>Login</h1>
              <form onSubmit={this.submitForm} className="form">
                <div className="flex-1">
                  <div className="contents">
                    <label className="label-login" htmlFor="username">
                      USERNAME
                    </label>
                    <input
                      onChange={this.onChangeUsername}
                      value={username}
                      className="login-input"
                      type="text"
                      placeholder="Enter Your Username"
                      id="username"
                    />
                  </div>
                  <div className="contents">
                    <label className="label-login" htmlFor="password">
                      PASSWORD
                    </label>
                    <input
                      onChange={this.onChangepasswoard}
                      value={password}
                      className="login-input"
                      type="password"
                      placeholder="Enter Your Password"
                      id="password"
                    />
                  </div>
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                  {showerrMsg ? <p className="err">{err}</p> : ''}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderdesktopViewbanner()}
        {this.rendermobileViewbanner()}
      </div>
    )
  }
}

export default Login
