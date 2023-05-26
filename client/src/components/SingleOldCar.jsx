import { Flex, useDisclosure, useToast } from '@chakra-ui/react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { FaRegEdit, FaHeart, FaOpencart } from 'react-icons/fa'
import { useRef } from 'react'
import DeleteAlert from '../pages/DeleteAlert'
import { useNavigate } from 'react-router-dom'

const SingleOldCar = ({ data }) => {
    const navigate = useNavigate()
    const { isOpen: isDelete, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const cancelRef = useRef()
    return (
        <div class="old__car-grid">
            <div class="old__car-image">
                <a class="image">
                    <img src={data.img} alt="img" />
                </a>
                <ul class="old__car-links">
                    <li><div className='old__car__icons' ><FaHeart color="var(--primary-color)" /></div></li>
                    <li onClick={() => navigate(`edit/${data._id}`)} ><div className='old__car__icons' ><FaRegEdit color="var(--primary-color)" /></div></li>
                    <li><div className='old__car__icons' ><FaOpencart color="var(--primary-color)" /></div></li>
                    <li onClick={onDeleteOpen} ><div className='old__car__icons' ><RiDeleteBin7Fill color="var(--primary-color)" /></div></li>
                </ul>
            </div>
            <div class="old__car-content">
                <h3 class="title">{data.title}</h3>
                <Flex>
                    <div class="price"> ₹{data.price}*</div>
                </Flex>
            </div>
            {/* delete Confirm */}
            <DeleteAlert onDeleteClose={onDeleteClose} id={data._id} onDeleteOpen={onDeleteOpen} isDelete={isDelete} cancelRef={cancelRef} />
        </div >
    )
}

export default SingleOldCar