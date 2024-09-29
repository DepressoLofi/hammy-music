import React from 'react'
import { Link } from 'react-router-dom';
import hammylogo from '../../assets/images/hammylogo.png';
import {Toaster } from 'react-hot-toast'

function Login() {
  return (
    <div className="login d-flex justify-content-center align-items-center vh-100" style={{backgroundColor: '#fcf0f0' }}>

      <div className="bg-white rounded shadow  p-3 w-25"  style={{ minWidth: '350px' }}>

        <div className="d-flex justify-content-center">
          <a href="#">
          <img src={hammylogo} alt="logo" width="50" />
          </a>
        </div>

        <h3 className="text-center mb-3">Login</h3>
        
        <form action="">
        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Enter Username" className="form-control"/>
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter Password" className="form-control"/>
        </div>

        <div className="d-grid mt-5 mb-2">
          <button className="btn btn-primary">Login</button>
        </div>
        </form>

        <p>Don't have an account? <Link to="/signup">Sign Up here!</Link></p>

      </div>
      <Toaster
      position="top-center"
      reverseOrder={false} />

    </div>
    
  )
}

export default Login