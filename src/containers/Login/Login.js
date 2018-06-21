import * as React from 'react'
import { NavLink } from 'react-router-dom'

class Login extends React.PureComponent {
  render () {
    return (
      <div>
        <button onClick={this.props.login}>登陆</button>
        <NavLink to="/">
          <button>返回主页</button>
        </NavLink>
      </div>
    )
  }
}
export default Login