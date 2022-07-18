import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import AddReview from '../components/AddReview'
import Reviews from '../components/Reviews'
import StarRating from '../components/StarRating'
import { RestaurantContext } from '../context/RestaurantContext'

const RestaurantDetail = () => {

  const {id} = useParams()
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantContext)

  useEffect(() => {
    console.log(selectedRestaurant)
    const fetchData = async () => {
      try{
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response)
        setSelectedRestaurant(response.data.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[])

  return (
    <div>
      {selectedRestaurant && (
        <>
        <h1 className='text-center display-1'>{selectedRestaurant.restaurant.name}</h1>
        <div className="text-center">
          {selectedRestaurant.restaurant.count ? 
          <>
            <StarRating rating={selectedRestaurant.restaurant.average_rating}/> 
            <span className="text-warning ms-1"> ({selectedRestaurant.restaurant.count}) </span> 
          </>
          : 'no reviews'}
        </div>
        <div className="mt-3">
          <Reviews reviews={selectedRestaurant.reviews}/>
        </div>
        <AddReview />
        </>
      )}
    </div>
  )
}

export default RestaurantDetail