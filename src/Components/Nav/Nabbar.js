import React from 'react'
import {Link} from "react-router-dom";

const Nabbar = () => {
  return (
    <div className='navbar'>
      <Link>
      <h1>Snippet Manager</h1>
      </Link>
      <Link><h2>Login</h2></Link>
      <Link><h2>Register</h2></Link>
    </div>
  )
}

export default Nabbar