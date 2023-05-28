import { Flex, Heading, Input, OrderedList, Select, SimpleGrid, Text } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOldCars } from '../redux/oldCars/oldCars.actions'
import SearchLoader from "../components/SearchLoader"
import SingleOldCar from '../components/SingleOldCar'
import Pagination from '../components/Pagination'
import SimpleLoading from '../components/SimpleLoading'
const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}


const OldCars = () => {
  const dispatch = useDispatch()
  const { data, loading, totalPages } = useSelector((state) => state.old_cars)
  const [page, setPage] = useState(1)
  const [isSearch, setisSearch] = useState(false)
  const [priceOrder, setPriceOrder] = useState("")
  const [searchCar, setSearchCar] = useState("");
  const handlePagination = (value) => setPage(value)
  const onChange = async (value) => {
    // console.log(value, "call api")
    setSearchCar(value)
    if (!value) {
      setisSearch(false)
      // dispatch(getAllOldCars(`https://car-dealer-server-production.up.railway.app/oldCars?page=${page}`))
    }
    else {
      setisSearch(true)

    }

  }
  const debounceOnChange = useCallback(debounce(onChange, 1000), []);
  useEffect(() => {
    console.log(searchCar, "call api", priceOrder, "priceOrder");
    if (isSearch && priceOrder) {
      dispatch(getAllOldCars(`https://car-dealer-server-production.up.railway.app/oldCars?color=${searchCar}&priceOrder=${priceOrder}`))
    }
    else if(isSearch){
      dispatch(getAllOldCars(`https://car-dealer-server-production.up.railway.app/oldCars?color=${searchCar}`))
    }
    else if(priceOrder){
      dispatch(getAllOldCars(`https://car-dealer-server-production.up.railway.app/oldCars?page=${page}&priceOrder=${priceOrder}`))
    }
    else dispatch(getAllOldCars(`https://car-dealer-server-production.up.railway.app/oldCars?page=${page}`))
  }, [page, isSearch, priceOrder])
  console.log(data);
  if (loading) {
    return <Flex py="20px" justifyContent="center" >
      <SimpleLoading />
    </Flex>
  }
  return (
    <section>
      <Heading textAlign="center" fontSize={["15px", "15px", "20px", "25px", "25px"]} m="auto" mt="40px" w="80%">Browse Listings from Trusted Dealers</Heading>
      <Text textAlign="center" fontSize="15px" mb="20px" >Explore a Variety of Makes and Models from Reliable Dealerships</Text>

      <Flex px="5%" flexDir={['column','column','column','row','row']} justifyContent="space-between" alignItems={"center"} >
        <Text fontSize={["15px", "15px", "20px", "25px", "25px"]} mb={["10px","10px","10px","0","0"]} color="#000" >Page {page} of {totalPages}</Text>
        <Flex w={["100%","100%","100%","50%","40%"]} flexDir={['column','column','column','row','row']} justifyContent="space-between" alignItems={"center"} >
          <Input
            value={searchCar || ""}
            onChange={({ target: { value } }) => {
              setSearchCar(value)
              debounceOnChange(value)
            }}
            variant="flushed"
            placeholder='Search Color of Car..'
            pl="10px"
            mb={["10px","10px","10px","0","0"]}
            borderBottom="1px solid var(--primary-color)"
            bg="var(--primary-light)"
            w={["100%", "100%", "40%", "45%", "50%"]}
          />

          <Select  w={["100%", "100%", "40%", "45%", "45%"]}  border="1px solid var(--primary-color)" bg="var(--primary-light)" placeholder='Sort Price of Car..' value={priceOrder} onChange={({ target: { value } }) => setPriceOrder(value)} >
            <option value="">Deafult</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </Select>
        </Flex>
      </Flex>
      <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing={10} w="90%" m="auto" pt="60px" >
        {data && data.length > 0 && data.map((el) => <SingleOldCar page={page} data={el} key={el._id} />)}
      </SimpleGrid>
      {data && data.length > 0 && <Pagination page={page} totalPages={totalPages} handlePagination={handlePagination} />}

    </section>
  )
}

export default OldCars