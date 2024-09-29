import Login from './pages/auth/Login.jsx'
import SignUp from './pages/auth/SignUp.jsx'
import Home from './pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import {Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext.jsx'

function App() {
  const {authUser} = useAuthContext()
  return (
    <>
    <Routes>
      <Route path="/" element={ <Home/>} />
      <Route path="/login" element={ <Login /> } />
      <Route path="/signup" element={ authUser ? <Navigate to ="/" /> : <SignUp /> } />
    </Routes>
    </>
  )
}

export default App
