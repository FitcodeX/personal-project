import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/navbar'
import './App.css'
import Customers from './pages/customers'
import AddCustomer from './pages/addCustomer'
import Vehicles from './pages/vehicles'
import AddVehicle from './pages/addVehicle'
import WorkOrders from './pages/workOrders'
import Home from './pages/home'
import Services from './pages/services'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/customers' element={<Customers />}/>
      <Route path='/addCustomer' element={<AddCustomer />}/>
      <Route path='/vehicles' element={<Vehicles />}/>
      <Route path='/addVehicle' element={<AddVehicle />}/>
      <Route path='/workOrders' element={<WorkOrders/>}/>
      <Route path='/services' element={<Services/>}/>
      {/* <Route path='/create_workOrder' element={<AddVehicle />}/> //create a createWorkOrder file */}
      {/* {//path for services }
      {//path for create services} */}

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
