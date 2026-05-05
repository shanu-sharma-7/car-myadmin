import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Components/Login'
import Createaccount from './Components/Createaccount'
import Contact from './Pages/Contact'
import Car from './Pages/Car'
import Cardetails from './Pages/Cardetails'
import Homecardetails from './Pages/Homecardetails'
import MyBookings from './Pages/myBookings'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
     <Routes>
<Route path='/' element = {<Home/>} />
<Route path='/login' element = {<Login/>} />
<Route path='/CreateAccount' element = {<Createaccount/>} />
<Route path='/Contact' element = {<Contact/>}  />
<Route path='/car' element = {<Car/>} />
<Route path='/car/:id' element= {<Cardetails/>} />
<Route path='/book/:id' element = {<Homecardetails/>} />
        <Route path="/booking" element={<MyBookings/>} />



     </Routes>
    </>
  )
}

export default App
