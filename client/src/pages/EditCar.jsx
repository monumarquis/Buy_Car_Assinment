import { Box, Button, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate, useParams } from 'react-router-dom'
import SimpleLoading from '../components/SimpleLoading'
const initState = {
    title: "",
    odometerDistance: "",
    totalAccident: "",
    color: "",
    totalBuyers: "",
    registrationPlace: "",
    price: "",
    mileage: "",
};
const EditCar = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const toast = useToast()
    const [formData, setFormData] = useState(initState);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [updateLoading, setupdateLoading] = useState(false)
    const [previewSource, setpreviewSource] = useState("")
    // const { userId } = useSelector((state) => state.auth)
    const onDrop = useCallback((acceptedFiles) => {
        setIsFileUploaded(true)
        acceptedFiles.forEach((file) => {
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
    const files = acceptedFiles.map(file => <div className='selected__file' key={file.path}>{file.path}</div>);
    const getCarHandle = async () => {
        setLoading(true)
        try {
            let { data: { carData } } = await axios.get(`http://localhost:8001/oldCars/Single/${id}`)
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
            let { message } = await axios.patch(`http://localhost:8001/oldCars/${id}`, { ...formData, isFileUploaded, imageUrl: previewSource })
            console.log(message);
            toast({
                title: 'Added Car.',
                description: "We've Added your car in Market Place Inventory",
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
                title: 'All the Fields Mandatory',
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
    // console.log(data);
    return (
        <section>
            <Flex w="70%" m="auto" className='old__car__form' py="40px" flexDir="column" >
                <Heading textAlign="center" fontSize="25px">Sell Your Car and Get a Quick Offer</Heading>
                <Text textAlign="center" fontSize="15px" mb="20px" >Streamline the Selling Process with our Easy-to-Use Car Information Form</Text>
                <form onSubmit={handelForm} >
                    <label>Title</label>
                    <input name='title' onChange={handleChange} value={data['title'] && !loading ? data.title : FormData.title} placeholder='Enter Title' type='text' />
                    <label>Change Image Here </label>
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
                    {isFileUploaded ? files : <a href={data['img'] && !loading ? data.img : "#"} target="_blank" ><div className='selected__file'>Click to See Your Current Image</div></a>}
                    <Flex flexDir="row" >
                        <Box w="50%" >
                            <label>Kms on Odometer</label>
                            <input name='odometerDistance' onChange={handleChange} value={data['odometerDistance'] && !loading ? data.odometerDistance : FormData.odometerDistance} placeholder='Enter kms on Odometer' type='number' />
                        </Box>
                        <Box w="50%" pl="10px" >
                            <label>Number of Accidents</label>
                            <input name='totalAccident' onChange={handleChange} value={data['totalAccident'] && !loading ? data.totalAccident : FormData.totalAccident} placeholder='Enter Number of Accidents' type='number' />
                        </Box>
                    </Flex>
                    <Flex flexDir="row" >
                        <Box w="50%" >
                            <label>Original Paint</label>
                            <input name='color' onChange={handleChange} value={data['color'] && !loading ? data.color : FormData.color} placeholder='Enter Original Paint' type='text' />
                        </Box>
                        <Box w="50%" pl="10px" >
                            <label>Number of previous buyers</label>
                            <input name='totalBuyers' onChange={handleChange} value={data['totalBuyers'] && !loading ? data.totalBuyers : FormData.totalBuyers} placeholder='Enter Number of Previous Buyers' type='number' />
                        </Box>
                    </Flex>
                    <Flex flexDir="row" >
                        <Box w="50%" >
                            <label> Price (₹)</label>
                            <input name='price' onChange={handleChange} value={data['price'] && !loading ? data.price : FormData.price} placeholder='Enter Price e.g: 5.3 lakhs*' type='text' />
                        </Box>
                        <Box w="50%" pl="10px" >
                            <label>Mileage (in kilometers per litre)</label>
                            <input name='mileage' onChange={handleChange} value={data['mileage'] && !loading ? data.mileage : FormData.mileage} placeholder='Enter Mileage e.g: 30' type='number' />
                        </Box>
                    </Flex>
                    <label>Place Of Registration</label>
                    <textarea name='registrationPlace' onChange={handleChange} value={data['registrationPlace'] && !loading ? data.registrationPlace : FormData.registrationPlace} placeholder='Enter Registration Place' type='text' />
                    <Button type='submit' className='thm-btn' isLoading={updateLoading} >Update Info</Button>
                </form>
            </Flex>
        </section>
    )
}

export default EditCar