import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProducts} from '../actions/productActions'

export default function HomeScreen() {

  const dispatch =  useDispatch()

  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList

  useEffect(() => {
      dispatch(listProducts())
  }, [dispatch])
  
    return (
        <>
          <h1>Latest Products</h1>
          {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <Row>
            {products.map(product => (
                  <Product product={product} key={product._id}/>
            ))}    
          </Row>   }
        </>
    )
}
