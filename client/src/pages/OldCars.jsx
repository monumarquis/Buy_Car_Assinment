import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOldCars } from '../redux/oldCars/oldCars.actions'
import SearchLoader from "../components/SearchLoader"
import SingleOldCar from '../components/SingleOldCar'
import Pagination from '../components/Pagination'
const OldCars = () => {
  const dispatch = useDispatch()
  const { data, loading, totalPages } = useSelector((state) => state.old_cars)
  const [page, setPage] = useState(1)
  const handlePagination = (value) => setPage(value)
  useEffect(() => {
    dispatch(getAllOldCars(`https://car-dealer-server-production.up.railway.app/oldCars?page=${page}`))
  }, [page])
  console.log(data);
  if (loading) {
    return <Flex py="20px" justifyContent="center" >
      <SearchLoader />
    </Flex>
  }
  return (
    <section>
      <Heading textAlign="center" fontSize="25px" mt="40px">Browse Listings from Trusted Dealers</Heading>
      <Text textAlign="center" fontSize="15px" mb="20px" >Explore a Variety of Makes and Models from Reliable Dealerships</Text>
      <SimpleGrid columns={3} spacing={10} w="90%" m="auto" pt="60px" >
        {data && data.length > 0 && data.map((el) => <SingleOldCar data={el} key={el._id} />)}
      </SimpleGrid>
      {data && data.length > 0 && <Pagination page={page} totalPages={totalPages} handlePagination={handlePagination} />}

    </section>
  )
}

export default OldCars