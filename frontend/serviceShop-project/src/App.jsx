import { useState } from 'react'
import Navbar from './components/navbar'
import './App.css'
import Customers from './pages/customers'
import AddCustomer from './pages/addCustomer'
import Vehicles from './pages/vehicles'
import AddVehicle from './pages/addVehicle'
import WorkOrders from './pages/workOrders'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home />}/>
      <Route path='customers' element={<Customers />}/>
      <Route path='addCustomer' element={<AddCustomer />}/>
      <Route path='vehicles' element={<Vehicles />}/>
      <Route path='addVehicle' element={<AddVehicle />}/>
      <Route path='workOrders' element={<WorkOrders/>}/>
      <Route path='create_workOrder' element={<AddVehicle />}/> //create a createWorkOrder file
      {//path for services }
      {//path for create services}

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
