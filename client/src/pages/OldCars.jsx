import { Flex, Heading, Input, SimpleGrid, Text } from '@chakra-ui/react'
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
  const [searchCar, setSearchCar] = useState("");
  const handlePagination = (value) => setPage(value)
  const onChange = async (value) => {
    console.log(value, "call api")
    setSearchCar(value)
    if (!value) {
      dispatch(getAllOldCars(`https://car-dealer-server-production.up.railway.app/oldCars?page=${page}`))
    }
    else {
      dispatch(getAllOldCars(`https://car-dealer-server-production.up.railway.app/oldCars?page=${page}&color=${value}`))
    }

  }
  const debounceOnChange = useCallback(debounce(onChange, 1000), []);
  useEffect(() => {
    dispatch(getAllOldCars(`https://car-dealer-server-production.up.railway.app/oldCars?page=${page}`))
  }, [page])
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

      <Flex px="5%" justifyContent="space-between" alignItems={"center"} >
        <Text fontSize={["15px", "15px", "20px", "25px", "25px"]} color="#000" >Page {page} of {totalPages}</Text>
        <Input
          value={searchCar || ""}
          onChange={({ target: { value } }) => {
            setSearchCar(value)
            debounceOnChange(value)
          }}
          variant="flushed"
          placeholder='Search Color of Car..'
          pl="10px"
          borderBottom="1px solid var(--primary-color)"
          bg="var(--primary-light)"
          w={["60%", "60%", "40%", "30%", "20%"]}
        />
      </Flex>
      <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing={10} w="90%" m="auto" pt="60px" >
        {data && data.length > 0 && data.map((el) => <SingleOldCar page={page} data={el} key={el._id} />)}
      </SimpleGrid>
      {data && data.length > 0 && <Pagination page={page} totalPages={totalPages} handlePagination={handlePagination} />}

    </section>
  )
}

export default OldCars