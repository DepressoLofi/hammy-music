import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import hammylogo from '../../assets/images/hammylogo.png'
import useSignup from '../../hooks/useSignup'
import {Toaster, toast, useToasterStore } from 'react-hot-toast'

function SignUp() {

  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })

  const {loading, signup} = useSignup();
  const { toasts } = useToasterStore();

  useEffect(() => {
    // Limit the toast, only show 3 toast
    toasts.filter((t) => t.visible)
    .filter((_, i) => i >= 3)
    .forEach((t) => toast.dismiss(t.id));
  }, [toasts])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs)
  }

  return (
    <div className="singup d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#fcf0f0' }}>

      <Toaster />


      <div className="bg-white rounded shadow p-3 w-25" style={{ minWidth: '350px' }}>

        <div className="d-flex justify-content-center">
          <a href="#">
          <img src={hammylogo} alt="logo" width="50"  />
          </a>
        </div>

        <h3 className="text-center mb-3">Sign Up</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullname">Full Name</label>
            <input type="text" placeholder="Enter Full Name" className="form-control"
            value={inputs.fullName} 
            onChange={(e) => setInputs({...inputs, fullName: e.target.value}) }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Enter Username" className="form-control"
            value={inputs.username}
            onChange={(e) => setInputs({...inputs, username: e.target.value}) }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Password" className="form-control"
            value={inputs.password}
            onChange={(e) => setInputs({...inputs, password: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" className="form-control"
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value })}
            />
          </div>
  
          <div>
            <label htmlFor="gender">Gender</label>
            <div className="d-flex">
            <div className="form-check mx-2">
              <input type="radio" name="gender" id="gender-male" className="form-check-input"
              value="male"
              onChange={(e) => setInputs({...inputs, gender: e.target.value })}
              />
              <label htmlFor="gender-male" className="form-check-label">male</label>
            </div>
            <div className="form-check mx-2">
              <input type="radio" name="gender" id="gender-female" className="form-check-input"
              value="female"
              onChange={(e) => setInputs({...inputs, gender: e.target.value })}
              />
              <label htmlFor="gender-female" className="form-check-label">female</label>
            </div>
            </div>
          </div>
  
          <div className="d-grid mt-5 mb-2">
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </form>

        <p>Already have an account? <Link to="/login">Login!</Link></p>

      </div>
      
    </div>
  )
}

export default SignUp