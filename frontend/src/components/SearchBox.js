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
   <Form onSubmit={onSubmitHandler}>
       <Form.Control type='text'name='search' className='mr-sm-2 ml-sm-5'  placeholder='Search Products' onChange={(e) => setKeyword(e.target.value)}>

       </Form.Control>
       <Button type='submit' className='p-2' variant='outline-success'>
           Submit

       </Button>
   </Form>
   </>
  )
}

export default SearchBox