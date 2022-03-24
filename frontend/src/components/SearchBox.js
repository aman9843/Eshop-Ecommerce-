import React,{useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const SearchBox = () => {
    const history = useHistory()
   const [keyword,setKeyword] = useState('')
   const onSubmitHandler = (e) => {
           e.preventDefault()
           if(keyword.trim()) {
               history.push(`/search/${keyword}`)
           } else {

            history.push('/')

           }
   }
  return (
   <>
   <Form onSubmit={onSubmitHandler} style={{display:'inline-flex'}}>
       <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} className='mr-sm-2 ml-sm-5' placeholder='Search Products' ></Form.Control>
       <Button type='submit' variant='outline-success' className='mx-2 py-2'>
           Submit
        </Button>
     
   </Form>
   </>
  )
}

export default SearchBox