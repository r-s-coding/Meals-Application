import {useGlobalContext} from '../context'
import {BsHandThumbsUp} from 'react-icons/bs'

const Meals = () => {
  const { loading, meals, selectMeal} = useGlobalContext()
  if (loading) {
    return <div className="section">
      <h4>Loading...</h4>
    </div>
  }
  if (meals.length< 1){
    return <div className="section">
      <h4>No meals matched your search term. Please try again.</h4>
    </div>
  }
  return (
    <div className="section-center">
      {meals.map((singleMeal) => {
        const {idMeal, strMeal: title, strMealThumb: image} =  singleMeal
      
        return <article key={idMeal} className="single-meal">
          <img src={image} className="img" onClick={() => selectMeal(idMeal)}/>
          <footer>
            <h5> {title} </h5>
            <button className="like-btn"> <BsHandThumbsUp/> </button>
          </footer>
        </article>
      })}    
    </div>
  )
}

export default Meals