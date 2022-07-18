import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

const UpdateRestaurant = (props) => {
    const {id} = useParams();
    let navigate = useNavigate()
    const {restaurants} = useContext(RestaurantContext)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("")

    useEffect(() => {
        const fetchData = async() => {
            const response = await RestaurantFinder.get(`/${id}`);
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)
        }
        fetchData()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updateRestaurant = await RestaurantFinder.put(`/${id}`, {
            name, 
            location,
            price_range: priceRange
        })
        navigate('/');
    }

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} id="location" className="form-control"type="text"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="priceRange">Price Range</label>
                    <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id="priceRange" className="form-control" type="number"></input>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
  )
}

export default UpdateRestaurant