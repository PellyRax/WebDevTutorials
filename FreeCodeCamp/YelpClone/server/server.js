require('dotenv').config()
const express = require('express');
const cors = require('cors')
const db = require('./db')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())
app.use(express.json());

//get all resturants 
app.get('/api/v1/restaurants', async (req, res) => {
    try {
        const result = await db.query('select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;')

        res.status(200).json({
            status: 200,
            results: result.rows.length,
            data: {
                restaurants: result.rows
            }
        })
    }
    catch (err) {
        console.log(err)
    }
    
})

//get one restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
    try{
        const restaurantResult = await db.query('select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1;', [req.params.id]);
        const reviewResult = await db.query('SELECT * FROM reviews WHERE restaurant_id = $1', [req.params.id])
        res.status(200).json({
            status: 200,
            results: restaurantResult.rows.count,
            data: {
                restaurant: restaurantResult.rows[0],
                reviews: reviewResult.rows
            }
        })
    }
    catch(err){
        console.log(err)

    }
})

//create a restaurant
app.post('/api/v1/restaurants', async (req, res) => {
    try{
        const result = await db.query('INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *', [req.body.name, req.body.location, req.body.price_range])
        res.status(201).json({
            status: 200,
            data: {
                restaurant: result.rows[0]
            }
        })
    }
    catch(err){
        console.log(err)
    }
})

//update a restuarant
app.put('/api/v1/restaurants/:id', async (req, res) => {
    try{
        const result = await db.query('UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *', [req.body.name, req.body.location, req.body.price_range, req.params.id])
        res.status(200).json({
            status: 200,
            data: {
                restaurant: result.rows[0]
            }
        })

    }
    catch (err){
        console.log(err)

    }
})

//delete a restuarant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
    try{
        const result = await db.query('DELETE FROM restaurants where id = $1', [req.params.id]);
        res.status(204).json({
            status: "success"
        })
    }
    catch(err){
        console.log(err)
    }
})

app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
    try{
        const result = await db.query('INSERT INTO reviews(restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4 ) returning *', [req.params.id, req.body.name, req.body.review, req.body.rating])
        res.status(201).json({
            status: 'Success',
            data: {
                review: result.rows[0]
            }
        })
    }catch(err){
        console.log(err)
    }
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})