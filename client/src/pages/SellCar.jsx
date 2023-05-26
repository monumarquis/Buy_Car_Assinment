import { Box, Button, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux';
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
const SellCar = () => {
    const toast = useToast()
    const [formData, setFormData] = useState(initState);
    const [loading, setLoading] = useState(false)
    const [previewSource, setpreviewSource] = useState("")
    const { userId } = useSelector((state) => state.auth)

    const onDrop = useCallback((acceptedFiles) => {
      
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
    const files = acceptedFiles.map(file => <div className='selected__file' key={file.path}>{file.path}</div>);
    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    };
    const handelForm = async (e) => {
        e.preventDefault();
        // console.log(formData);
        setLoading(true)
        try {
            let { message } = await axios.post("https://car-dealer-server-production.up.railway.app/oldCars", { ...formData, imageUrl: previewSource, userId })
            console.log(message);
            toast({
                title: 'Added Car.',
                description: "We've Added your car in Market Place Inventory",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            setLoading(false)
        } catch ({ response: { data: { message } } }) {
            setLoading(false)
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
    return (
        <section>

            <Flex w="70%" m="auto" className='old__car__form' py="40px" flexDir="column" >
                <Heading textAlign="center" fontSize="25px">Sell Your Car and Get a Quick Offer</Heading>
                <Text textAlign="center" fontSize="15px" mb="20px" >Streamline the Selling Process with our Easy-to-Use Car Information Form</Text>
                <form onSubmit={handelForm} >
                    <label>Title</label>
                    <input name='title' onChange={handleChange} value={FormData.title} placeholder='Enter Title' type='text' />
                    <label>Upload Image Here </label>
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
                    {files}
                    <Flex flexDir="row" >
                        <Box w="50%" >
                            <label>Kms on Odometer</label>
                            <input name='odometerDistance' min='0' onChange={handleChange} value={FormData.odometerDistance} placeholder='Enter kms on Odometer' type='number' />
                        </Box>
                        <Box w="50%" pl="10px" >
                            <label>Number of Accidents</label>
                            <input name='totalAccident' min="0" max="100" onChange={handleChange} value={FormData.totalAccident} placeholder='Enter Number of Accidents' type='number' />
                        </Box>
                    </Flex>
                    <Flex flexDir="row" >
                        <Box w="50%" >
                            <label>Original Paint</label>
                            <input name='color' onChange={handleChange} value={FormData.color} placeholder='Enter Original Paint' type='text' />
                        </Box>
                        <Box w="50%" pl="10px" >
                            <label>Number of previous buyers</label>
                            <input name='totalBuyers' min="0" max="100" onChange={handleChange} value={FormData.totalBuyers} placeholder='Enter Number of Previous Buyers' type='number' />
                        </Box>
                    </Flex>
                    <Flex flexDir="row" >
                        <Box w="50%" >
                            <label> Price (₹)</label>
                            <input name='price' onChange={handleChange} value={FormData.price} placeholder='Enter Price e.g: 5.3 lakhs*' type='text' />
                        </Box>
                        <Box w="50%" pl="10px" >
                            <label>Mileage (in kilometers per litre)</label>
                            <input name='mileage' min="0"  onChange={handleChange} value={FormData.mileage} placeholder='Enter Mileage e.g: 30' type='number' />
                        </Box>
                    </Flex>
                    <label>Place Of Registration</label>
                    <textarea name='registrationPlace' onChange={handleChange} value={FormData.registrationPlace} placeholder='Enter Registration Place' type='text' />
                    <Button type='submit' className='thm-btn' isLoading={loading} loadingText="Checking..."  >Sell Car</Button>
                </form>
            </Flex>
        </section>
    )
}

export default SellCar