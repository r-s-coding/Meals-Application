import React, {useState, useContext, useEffect} from 'react'

const AppContext = React.createContext()

import axios from 'axios'
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({children}) => {
  
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  
  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const {data} = await axios(url)
      if (data.meals){
        setMeals(data.meals)
      } else {
        setMeals([])
      }      
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl)
  }

  const selectMeal = (idMeal, favouriteMeal) => {
    let meal;
    meal = meals.find((meal) => meal.idMeal === idMeal)
    setSelectedMeal(meal)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }
  
  // Can only use async/await by either creating a function inside or outside the useEffect function
  useEffect(() => {
    fetchMeals(allMealsUrl)
  }, [])
  
  useEffect(() => {
    if (!searchTerm) return
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  }, [searchTerm])
  
  return (
    <AppContext.Provider value={{loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectedMeal, selectMeal, closeModal}}>
      {children}    
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export {AppContext, AppProvider}