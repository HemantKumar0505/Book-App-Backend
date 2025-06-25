const express = require('express');
 // Import express library after installing it

const app = express() 
// Create an instance of express  and now you can just maintain the server activiy and the routes functionality through this app instance. 

const mongoose = require('mongoose')
// Import mongoose library after installing it and use it to connect to MongoDB and define schemas/models and interact with the database and perform CRUD operations.

const cors = require("cors")


const port = process.env.PORT || 5000 
// Set the port to either the environment variable PORT or 5000 if not set

require('dotenv').config()

app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173','https://book-app-frontend-indol.vercel.app' ],
    credentials:true
  
}))

// routes
const bookRoutes = require('./src/books/book.route')
const orderRoutes = require('./src/orders/order.route')
const userRoutes = require('./src/users/user.route') 
const adminRoutes = require('./src/stats/admin.stats')

app.use("/api/books",bookRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

// routes


async function main() {
  await mongoose.connect(process.env.DB_URL);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  app.use('/', (req, res) => { // Define a route for the root URL
    res.send('Book Store server is running!!'); // Send a response when the root URL is accessed
    
});
}

main().then(() => console.log("Mongodb connected Successfully")).catch(err => console.log(err)); // Call the main function and catch any errors that occur during the connection process


app.listen(port, () => { // Start the server and listen on the specified port
  console.log(`Server is running on port ${port}`) 
  // Log a message indicating the server is running
})