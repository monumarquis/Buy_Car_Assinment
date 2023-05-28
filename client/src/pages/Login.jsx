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
    useToast,
    Alert,
    AlertIcon
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { MdAlternateEmail } from 'react-icons/md'
import { TiLockClosed } from 'react-icons/ti'
import car from "../images/car.jpg"
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LogIn } from '../redux/user/user.actions'
const initState = {
    email: "",
    password: "",
};

const Login = () => {
    const dispatch = useDispatch()
    const toast = useToast()
    const { isAuth, loading, error, errorMessage } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState(initState);
    const [show, setShow] = useState(false);
    if (isAuth) {
        toast({
            title:"Log in Successfull",
            description: "Welcome to Best Car Selling Market",
            status: 'success',
            duration: 2000,
            position: 'top',
            isClosable: true,
        })
        return <Navigate to="/" />
    }


    const handleClick = () => setShow(!show);

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    };
    const handelForm = (e) => {
        e.preventDefault();
        console.log(errorMessage);
        dispatch(LogIn(formData))
    };

    return (
        <Flex flexDir={["column","column","column","row","row"]} h={"100vh"} >
            {/* form Section */}
            <Flex className='Singup__Form' alignItems="center" w={["100%","100%","100%","50%","50%"]} >
                <form onSubmit={handelForm} style={{ width: "100%" }}>
                    <Container
                       maxW={["90%","90%","80%","70%","70%"]}
                        mb="10"
                        paddingTop="20px"
                        boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
                    >
                        <Heading color="var(--primary-color)" ml="10%" textAlign="left" >Login</Heading>
                        <Text color="var(--grey-color)" mt="10px" ml="10%" >Get started with our app, just create an account and enjoy the experience.</Text>
                        <FormControl py="10" maxW="80%" margin="auto">
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
                            {error ? <Alert status='error' mt="20px" >
                                <AlertIcon />
                                {errorMessage}
                            </Alert> : null}
                            <Button className='thm-btn' mt="15px" type="submit" isLoading={loading}
                                loadingText='Logging In' >
                                Login
                            </Button>
                            <Text color="var(--grey-color)" mt="10px" > Don't have an account? <span style={{ "color": "var(--primary-color)", "fontWeight": "700" }} ><Link to="/signup" >Register</Link></span> </Text>
                        </FormControl>


                    </Container>
                </form>
            </Flex>
            {/* left Image */}
            <Flex className='Image' pos="relative" w={["100%","100%","100%","50%","50%"]} >
                <Box bg="rgba(10, 10, 10,0.3)" position='absolute' h="100%" w="100%" top="0" left="0" ></Box>
                <Image src={car} alt="car" objectFit={"cover"} w="100%" />
            </Flex>
        </Flex>
    )
}

export default Login