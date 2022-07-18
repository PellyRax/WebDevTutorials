import React, { useState } from 'react'
import { useContext } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../context/RestaurantContext'


const AddRestaurant = () => {
    const {addRestaurant} = useContext(RestaurantContext);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('Price Range');

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await RestaurantFinder.post('/', {
                name: name,
                location: location,
                price_range: priceRange
            })
            addRestaurant(response.data.data.restaurant);
        }catch(err){

        }
    }

    return (
    <div className='mb-4'>
        <form action=''>
            <div className="row d-flex">
                <div className="col">
                    <input value={name} onChange={e => setName(e.target.value)} type='text' className='form-control' placeholder='name'/>
                </div>
                <div className="col">
                    <input value={location} onChange={e => setLocation(e.target.value)} type="text" className='form-control' placeholder='location'/>
                </div>
                <div className="col">
                    <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="form-select">
                        <option disabled>Price Range</option>
                        <option value='1'>$</option>
                        <option value='2'>$$</option>
                        <option value='3'>$$$</option>
                        <option value='4'>$$$$</option>
                        <option value='5'>$$$$$</option>
                    </select>
                </div>
                <div className="col">
                    <button type='submit' onClick={handleSubmit} className="btn btn-primary">Add</button>
                </div>
            </div>
        </form>
    </div>
    )
}

export default AddRestaurant