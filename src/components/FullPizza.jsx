import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PIZZA_BY_ID } from '@/constants/api.js'
import axios from 'axios'
import { PizzaBlock } from '@/components/PizzaItem/PizzaBlock.jsx'

export const FullPizza = () => {
  const navigate = useNavigate();
  console.log(navigate)
  const { id } = useParams()
  const [pizza, setPizza] = useState({})
  
  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        const {data} = await axios.get(`${PIZZA_BY_ID}${id}`)
        setPizza(data)
      } catch (error) {
        alert('Произошла ошибка при получении пиццы')
        console.log(error.message)
        navigate('/')
      }
    }

    fetchData()
  }, [id])
  
  if (!pizza?.title) return (
    <div className='container'>
      <h2>Загрузка...</h2>
    </div>
  )
  
  return (
    <div className='container'>
      <PizzaBlock {...pizza} />
    </div>
  )
}
