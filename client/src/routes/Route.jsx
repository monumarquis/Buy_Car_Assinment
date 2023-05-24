import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PrivateRoutes from './PrivateRoutes';
import { useSelector } from 'react-redux';
import CarsSpec from '../pages/CarsSpec';
const AllRoute = () => {
    const { isAuth } = useSelector((state) => state.auth)
    return (
        <Routes>
            <Route path='/' element={<PrivateRoutes><CarsSpec /></PrivateRoutes>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
        </Routes>
    )
}

export default AllRoute