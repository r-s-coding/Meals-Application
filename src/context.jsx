import React, {useState, useContext, useEffect} from 'react'

const AppContext = React.createContext()

import axios from 'axios'
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({children}) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  
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
  
  // Can only use async/await by either creating a function inside or outside the useEffect function
  useEffect(() => {
    fetchMeals(allMealsUrl)
  }, [])
  
  return (
    <AppContext.Provider value={{loading, meals}}>
      {children}    
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export {AppContext, AppProvider}