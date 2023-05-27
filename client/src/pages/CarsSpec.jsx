import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOemCars, getAllOemCarsSearch } from '../redux/oemCars/oemCars.actions'
import SimpleLoading from '../components/SimpleLoading'
import { Flex, Heading, Input, SimpleGrid, Text } from '@chakra-ui/react'
import SingleOemCar from '../components/SingleOemCar'
import Pagination from '../components/Pagination'
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


const CarsSpec = () => {
  const dispatch = useDispatch()
  const { data, loading, totalPages } = useSelector((state) => state.oem_cars)
  const [page, setPage] = useState(1)
  const [searchCar, setSearchCar] = useState("");
  const handlePagination = (value) => setPage(value)
  const onChange = async (value) => {
    // console.log(value, "call api")
    setSearchCar(value)
    if (!value) {
      dispatch(getAllOemCars(`https://car-dealer-server-production.up.railway.app/cars?page=${page}`))
      return
    }
    let query = value.split(" ")
    if (query.length === 1) {
      dispatch(getAllOemCarsSearch(`https://car-dealer-server-production.up.railway.app/cars/search?manufacturer=${query[0]}&page=${page}`))
    }
    else if (query.length === 2) {
      dispatch(getAllOemCarsSearch(`https://car-dealer-server-production.up.railway.app/cars/search?manufacturer=${query[0]}&name=${query[1]}&page=${page}`))
    }
    else if (query.length === 3) {
      dispatch(getAllOemCarsSearch(`https://car-dealer-server-production.up.railway.app/cars/search?manufacturer=${query[0]}&name=${query[1]}&year=${query[2]}&page=${page}`))
    }
    console.log(searchCar);
  }
  const debounceOnChange = useCallback(debounce(onChange, 1000), []);
  useEffect(() => {
    dispatch(getAllOemCars(`https://car-dealer-server-production.up.railway.app/cars?page=${page}`))
  }, [page])
  // console.log(loading)
  if (loading) {
    return <Flex py="20px" justifyContent="center" >
      <SimpleLoading />
    </Flex>
  }
  return (
    <section >
      <Heading textAlign="center" fontSize={["15px","15px","20px","25px","25px"]} m="auto" mt="40px" w="80%" >Explore a Wide Range of Cars and Discover Models from Leading Manufacturers</Heading>
      <Text textAlign="center" fontSize="15px" mb="20px" >Find Your Perfect Ride</Text>
      <Flex   mt="30px" px="5%" justifyContent="space-between" alignItems={"center"}>
      <Text  fontSize={["15px", "15px", "20px", "25px", "25px"]} color="#000" >Page {page} of {totalPages}</Text>
        <Input
          value={searchCar || ""}
          onChange={({ target: { value } }) => {
            setSearchCar(value)
            debounceOnChange(value)
          }}
          variant="flushed"
          placeholder='Search Car...'
          pl="10px"
          borderBottom="1px solid var(--primary-color)"
          bg="var(--primary-light)"
          w={["60%","60%","40%","30%","20%"]}
        />
      </Flex>
      <SimpleGrid columns={[1,1,2,2,3]} spacing={10} w="90%" m="auto" pt="60px" >
        {data && data.length > 0 && data.map((el) => <SingleOemCar data={el} key={el._id} />)}
      </SimpleGrid>
      {data && data.length > 0 && <Pagination page={page} totalPages={totalPages} handlePagination={handlePagination} />}
    </section>
  )
}

export default CarsSpec