import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PrivateRoutes from './PrivateRoutes';
import CarsSpec from '../pages/CarsSpec';
import OldCars from '../pages/OldCars';
import SellCar from '../pages/SellCar';
import EditCar from '../pages/EditCar';
const AllRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<PrivateRoutes><CarsSpec /></PrivateRoutes>}></Route>
            <Route path='/oldCars' element={<PrivateRoutes><OldCars /></PrivateRoutes>}></Route>
            <Route path='/sellcar' element={<PrivateRoutes><SellCar /></PrivateRoutes>}></Route>
            <Route path='/oldCars/edit/:id' element={<PrivateRoutes><EditCar /></PrivateRoutes>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
        </Routes>
    )
}

export default AllRoute