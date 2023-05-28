import {
  Box, Flex, Image, FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  InputRightElement,
  InputGroup,
  InputLeftElement,
  Text,
  Heading,
  useToast
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { MdAlternateEmail, MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { TiLockClosed } from 'react-icons/ti'
import car from "../images/car.jpg"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const initState = {
  name: "",
  email: "",
  password: "",
};
const Signup = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [formData, setFormData] = useState(initState);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClick = () => setShow(!show);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };
  const handelForm = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      let { data } = await axios.post("https://car-dealer-server-production.up.railway.app/users/register", formData)
      console.log(data)
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        position: 'top',
        isClosable: true,
      })
      navigate("/login")
      setLoading(false)
    } catch ({ response: { data } }) {
      console.log(data);
      toast({
        title: 'Something Went Wrong',
        description: data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      setLoading(false)
    }
    console.log(formData);
  };
  return (
    <Flex flexDir={["column", "column", "column", "row", "row"]} h={"100vh"} >
      {/* left Image */}
      <Flex className='Image' pos="relative" w={["100%", "100%", "100%", "60%", "60%"]}>
        <Box bg="rgba(10, 10, 10,0.3)" position='absolute' h="100%" w="100%" top="0" left="0" ></Box>
        <Image src={car} alt="car" objectFit={"cover"} w="100%" />
      </Flex>

      {/* form Section */}
      <Flex className='Singup__Form' alignItems="center" mt={["30px", "30px", "30px", "0", "0"]} w={["100%", "100%", "100%", "60%", "60%"]}>
        <form onSubmit={handelForm} style={{ width: "100%" }}>
          <Container
            maxW={["90%","90%","80%","70%","70%"]}
            mb="10"
            paddingTop="20px"
            boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          >
            <Heading color="var(--primary-color)" ml="10%" textAlign="left" >Register</Heading>
            <Text color="var(--grey-color)" mt="10px" ml="10%" >Signup now and get full access to our app.</Text>
            <FormControl py="10" maxW="80%" margin="auto">
              <FormLabel fontWeight="700">
                Name
              </FormLabel>
              <InputGroup size="md">
                <InputLeftElement pointerEvents='none'>
                  <MdOutlineDriveFileRenameOutline color='#000' fontSize="25px" />
                </InputLeftElement>
                <Input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  variant="flushed"
                  pr="4.5rem"
                  borderBottom="1px solid var(--primary-color)"
                  bg="var(--primary-light)"
                />
              </InputGroup>
              <FormLabel fontWeight="700" mt="20px">
                Email
              </FormLabel>
              <InputGroup size="md">
                <InputLeftElement pointerEvents='none'>
                  <MdAlternateEmail color='#000' fontSize="25px" />
                </InputLeftElement>
                <Input
                  name="email"
                  type="text"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="flushed"
                  pr="4.5rem"
                  borderBottom="1px solid var(--primary-color)"
                  bg="var(--primary-light)"
                />
              </InputGroup>
              <FormLabel fontWeight="700" mt="20px">
                Password
              </FormLabel>
              <InputGroup size="md">
                <InputLeftElement pointerEvents='none'>
                  <TiLockClosed color='#000' fontSize="25px" />
                </InputLeftElement>
                <Input
                  pr="4.5rem"
                  name="password"
                  type={show ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  variant="flushed"
                  borderBottom="1px solid var(--primary-color)"
                  bg="var(--primary-light)"
                />
                <InputRightElement>
                  <Button h="1.75rem" size={"sm"} onClick={handleClick}>
                    {show ? <AiFillEyeInvisible fontSize="50px" /> : <AiFillEye fontSize="50px" />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button className='thm-btn' mt="15px" type="submit" isLoading={loading}
                loadingText='Submitting' >
                Register
              </Button>
              <Text color="var(--grey-color)" mt="10px" > Already have an account ? <span style={{ "color": "var(--primary-color)", "fontWeight": "700" }} ><Link to="/login" >Login</Link></span> </Text>
            </FormControl>


          </Container>
        </form>
      </Flex>

    </Flex>
  )
}

export default Signup