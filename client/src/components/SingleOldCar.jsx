import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { FaRegEdit, FaHeart, FaCartPlus } from 'react-icons/fa'
import { useRef } from 'react'
import DeleteAlert from '../pages/DeleteAlert'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SingleOldCar = ({ data, page }) => {
    const navigate = useNavigate()
    const { isOpen: isDelete, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const cancelRef = useRef()
    const { userId } = useSelector((state) => state.auth)
    return (
        <div class="old__car-grid">
            <div class="old__car-image">
                <a href='#' class="image">
                    <img src={data.img} alt="img" />
                </a>
                <ul class="old__car-links">
                    <li><div className='old__car__icons' ><FaHeart color="var(--primary-color)" /></div></li>
                    {userId === data.user && <li onClick={() => navigate(`edit/${data._id}`)} ><div className='old__car__icons' ><FaRegEdit color="var(--primary-color)" /></div></li>}
                    <li><div className='old__car__icons' ><FaCartPlus color="var(--primary-color)" /></div></li>
                    {userId === data.user && <li onClick={onDeleteOpen} ><div className='old__car__icons' ><RiDeleteBin7Fill color="var(--primary-color)" /></div></li>}
                </ul>
            </div>
            <div class="old__car-content">
                <h3 class="title">{data.title} <span className='old-color' >({data.color})</span> </h3>
                <Flex alignItems='center' justifyContent={"space-between"} >
                    <div class="price"> ₹{data.price}*</div>
                    <Text color="#333" fontSize="16px" >{data.totalBuyers} -Previous Buyers</Text>
                </Flex>
                <Text mt="10px" textAlign="left" color="#333" fontWeight="600" fontSize="12px" ><span className="detail__old" >{data.odometerDistance} </span>kms on Odometer with mileage of <span className="detail__old" >{data.mileage}</span> km/p</Text>
                <Text textAlign="left" color="#333" fontWeight="600" fontSize="12px" >it was registered at <span className="detail__old" > {data.registrationPlace}</span> </Text>
                <Text textAlign="left" color="#333" fontWeight="600" fontSize="12px" >Total Accidents is <span className="detail__old" >{data.totalAccident}</span>  </Text>
            </div>
            {/* delete Confirm */}
            <DeleteAlert onDeleteClose={onDeleteClose} page={page} id={data._id} onDeleteOpen={onDeleteOpen} isDelete={isDelete} cancelRef={cancelRef} />
        </div >
    )
}

export default SingleOldCar