import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, Heading, Text, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate, useParams } from 'react-router-dom'
import SimpleLoading from '../components/SimpleLoading'

const EditCar = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const initState = {
        title: data.title,
        odometerDistance: data.odometerDistance,
        totalAccident: data.totalAccident,
        color: data.color,
        totalBuyers: data.totalBuyers,
        registrationPlace: data.registrationPlace,
        price: data.price,
        mileage: data.mileage,
    };
    const toast = useToast()
    const [formData, setFormData] = useState(initState);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [updateLoading, setupdateLoading] = useState(false)
    const [previewSource, setpreviewSource] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    // const { userId } = useSelector((state) => state.auth)
    const onDrop = useCallback((acceptedFiles) => {
        setIsFileUploaded(true)
        acceptedFiles.forEach((file) => {
            toast({
                title: 'Image Selected',
                description: file.path,
                status: 'info',
                position: 'top',
                duration: 2000,
                isClosable: true,
            })
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.readAsDataURL(file);
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                setpreviewSource(binaryStr)
                console.log(binaryStr)
            }
        })

    }, [])
    const { getRootProps, getInputProps, open, isDragActive, acceptedFiles } = useDropzone({ onDrop, noClick: true })
    const files = acceptedFiles.map(file => <div className='selected__file' key={file.path}>Image Select Path - <span>{file.path}</span></div>);
    const getCarHandle = async () => {
        setLoading(true)
        try {
            let { data: { carData } } = await axios.get(`https://car-dealer-server-production.up.railway.app/oldCars/Single/${id}`)
            // console.log(res)
            setData(carData)
            setLoading(false)

        }
        catch (err) {

            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    };

    const handelForm = async (e) => {
        e.preventDefault();
        // console.log(formData);
        setupdateLoading(true)
        try {
            let { message } = await axios.patch(`https://car-dealer-server-production.up.railway.app/oldCars/${id}`, { ...formData, isFileUploaded, imageUrl: previewSource, user: data.user })
            console.log(message);
            toast({
                title: 'Updated Car Info Successfully',
                description: "Check Details Here",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            setupdateLoading(false)
            navigate("/oldCars")
        } catch ({ response: { data: { message } } }) {
            setupdateLoading(false)
            console.log(message);
            toast({
                title: 'Try Again',
                description: message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    };
    // console.log(id)
    useEffect(() => {
        getCarHandle()
    }, [])
    if (loading) {
        return <Flex py="20px" justifyContent="center" >
            <SimpleLoading />
        </Flex>
    }
    console.log(data, initState);
    return (
        <section>
            <Flex w="70%" m="auto" className='old__car__form' py="40px" flexDir="column" >
                <Heading textAlign="center" fontSize={["15px","15px","20px","25px","25px"]} >Edit Car Information</Heading>
                <Text textAlign="center" fontSize="15px" mb="20px" > Update details and specifications for your car</Text>
                <form onSubmit={handelForm} >
                    <label>Title</label>
                    <input name='title' onChange={handleChange} value={FormData.title} placeholder='Enter Title' type='text' />
                    <label>Change Image Here </label>
                    {isFileUploaded ? files : <a  href={data['img'] && !loading ? data.img : "#"} target="_blank" ><div className='selected__file'>Click to See Your Current Image</div></a>}
                    <div {...getRootProps()} className='drag-image' onClick={open} >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Drop the Image  here ...</p>
                        ) : (
                            <p>Drag 'n' drop Image here, or click to select Image</p>
                        )}
                        <span>Or</span>
                        <button type="button" >
                            Browse Image
                        </button>
                    </div>
                  
                    <Flex flexDir={["column","column","column","row","row"]} >
                        <Box w={["100%" ,"100%" ,"100%" ,"50%" ,"50%" ]} >
                            <label>Kms on Odometer</label>
                            <input name='odometerDistance' min="0" onChange={handleChange} value={FormData.odometerDistance} placeholder='Enter kms on Odometer' type='number' />
                        </Box>
                        <Box w={["100%" ,"100%" ,"100%" ,"50%" ,"50%" ]} pl={["0" ,"0" ,"0" ,"10px" ,"10px" ]} >
                            <label>Number of Accidents</label>
                            <input name='totalAccident' min="0" max="100" onChange={handleChange} value={FormData.totalAccident} placeholder='Enter Number of Accidents' type='number' />
                        </Box>
                    </Flex>
                    <Flex flexDir={["column","column","column","row","row"]} >
                        <Box w={["100%" ,"100%" ,"100%" ,"50%" ,"50%" ]} >
                            <label>Original Paint</label>
                            <input name='color' onChange={handleChange} value={FormData.color} placeholder='Enter Original Paint' type='text' />
                        </Box>
                        <Box w={["100%" ,"100%" ,"100%" ,"50%" ,"50%" ]} pl={["0" ,"0" ,"0" ,"10px" ,"10px" ]} >
                            <label>Number of previous buyers</label>
                            <input name='totalBuyers' min="0" max="100" onChange={handleChange} value={FormData.totalBuyers} placeholder='Enter Number of Previous Buyers' type='number' />
                        </Box>
                    </Flex>
                    <Flex flexDir={["column","column","column","row","row"]} >
                        <Box w={["100%" ,"100%" ,"100%" ,"50%" ,"50%" ]} >
                            <label> Price (₹)</label>
                            <input name='price' onChange={handleChange} value={FormData.price} placeholder='Enter Price e.g: 5.3 lakhs*' type='text' />
                        </Box>
                        <Box w={["100%" ,"100%" ,"100%" ,"50%" ,"50%" ]} pl={["0" ,"0" ,"0" ,"10px" ,"10px" ]} >
                            <label>Mileage (in kilometers per litre)</label>
                            <input name='mileage' min="0" onChange={handleChange} value={FormData.mileage} placeholder='Enter Mileage e.g: 30' type='number' />
                        </Box>
                    </Flex>
                    <label>Place Of Registration</label>
                    <textarea name='registrationPlace' onChange={handleChange} value={FormData.registrationPlace} placeholder='Enter Registration Place' type='text' />
                    <Button type='submit' ml={3} className='thm-btn' isLoading={updateLoading} loadingText="Uploading..." > Yes, Update Details</Button>
                </form>
            </Flex>
        </section>
    )
}

export default EditCar