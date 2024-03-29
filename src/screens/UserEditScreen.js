import React, {useState, useEffect} from 'react'
import { Form, Button } from "react-bootstrap"
import {useDispatch, useSelector} from 'react-redux'
import Loader from "../components/Loader"
import Message from "../components/Message"
import FormContainer from "../components/FormContainer"
import { getUserDetails, updateUser } from "../actions/userActions"
import {Link} from 'react-router-dom'
import {USER_LIST_RESET, USER_UPDATE_RESET} from '../constants/userConstant'


export default function UserEditScreen({match, location, history}) {

    const userId = match.params.id
    console.log(match)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails 

    const userUpdate = useSelector(state => state.userUpdate)
    const { 
        loading: loadingUpdate, 
        success: successUpdate, 
        error: errorUpdate, 
    } = userUpdate 

    useEffect(() => {
        if(successUpdate){
            dispatch({type:USER_LIST_RESET})
            history.push('/admin/userlist')
        } else {

            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
     
        }

    }, [dispatch, userId, user, history, successUpdate]) 
 
    const submitHandler = (e) => { 
        e.preventDefault()
        dispatch(updateUser({_id: userId, name, email, isAdmin}))
    }


    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
            
            <FormContainer>
                <h1>Edit User</h1>

                {loadingUpdate && <Loader />}
                
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Control 
                            type='name' 
                            placeholder='Enter name' 
                            value={name} 
                            onChange={(e)=>setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                            type='email' 
                            placeholder='Enter email' 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isadmin'>
                        <Form.Check 
                            type='checkbox' 
                            label='is Admin' 
                            value={isAdmin}
                            checked={isAdmin} 
                            onChange={(e)=>setIsAdmin(e.target.checked)}
                        >
                        </Form.Check>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Update</Button>
                
                </Form>


    )}
                
            </FormContainer>
        </>
)
}
