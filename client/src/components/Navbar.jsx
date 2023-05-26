import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { LogOut } from '../redux/user/user.actions'

const Navbar = () => {
  const dispatch = useDispatch()
  return (
    <nav className='nav'>
      <Flex bg="var(--white-color)" py="20px" justifyContent="space-around" alignItems="center" w="60%" >
        <Flex w="20%" px="10px"  >
          <Image src="https://bracketweb.com/treck-html/main-html/assets/images/resources/logo-1.png" alt="logo" w="100%" />
        </Flex>
        <Link to="/" ><Text className='link' >Home</Text></Link>
        <Link to="/oldCars" ><Text className='link' >Old Cars</Text></Link>
      </Flex>
      <Flex w="60%" justifyContent="flex-end" px="20px" className='btn' >
        <NavLink to="/sellcar" className='thm-btn'  >Sell Car</NavLink>
        <button className='thm-btn' onClick={()=>dispatch(LogOut())} >Log Out</button>
      </Flex>
    </nav>
  )
}

export default Navbar