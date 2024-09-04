import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import cookieParser from 'cookie-parser';
// Import the order router

config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

// General API Info Route
app.get('/', (req, res) => {
    res.send('Welcome to the API. Use /users to get a list of users, /user/:id to get a specific user, /register to create a new user, and /products to get a list of products.');
});

// User Routes
app.use('/user', userRouter);

// Product Routes
app.use('/product', productRouter);

// Order Routes
app.use('/user', orderRouter); // Register order routes under '/user'

// Error handling middleware (optional, but recommended)
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
