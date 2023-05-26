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

const DeleteAlert = ({ onDeleteClose, isDelete, cancelRef, id }) => {
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const DeleteCarHandle = async () => {
        setLoading(true)
        try {

            let { message } = await axios.delete(`http://localhost:8001/oldCars/${id}`)
            toast({
                title: 'Item Deleted',
                description: message,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            setLoading(false)
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