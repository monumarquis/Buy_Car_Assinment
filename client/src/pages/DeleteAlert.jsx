import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllOldCars } from '../redux/oldCars/oldCars.actions'

const DeleteAlert = ({ onDeleteClose, isDelete, cancelRef, id ,page}) => {
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const dispatch = useDispatch()
    const DeleteCarHandle = async () => {
        setLoading(true)
        try {

            let { message } = await axios.delete(`https://car-dealer-server-production.up.railway.app/oldCars/${id}`)
            toast({
                title: 'Item Deleted',
                description: message,
                status: 'success',
                position: 'top',
                duration: 9000,
                isClosable: true,
            })
            setLoading(false)
            dispatch(getAllOldCars(`https://car-dealer-server-production.up.railway.app/oldCars?page=${page}`))
        }
        catch (err) {
            toast({
                title: 'Internal Serer error',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            setLoading(false)
        }
    }

    return (
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onDeleteClose}
                isOpen={isDelete}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Delete Car ?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to delete your Cars from Market Place Inventory ? It will be
                        deleted Permenantly.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onDeleteClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={DeleteCarHandle} isLoading={loading} >
                            Yes, Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeleteAlert