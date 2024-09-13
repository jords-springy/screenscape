import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import multer from 'multer';

config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// CORS Configuration: Allow specific origins
const allowedOrigins = ['http://localhost:8080', 'https://screenscape-e5d1b.web.app'];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Enable cookies and other credentials
}));

// Body parser for JSON and URL-encoded payloads
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); 

// General API Info Route
app.get('/', (req, res) => {
    res.send('Welcome to the API. Use /users to get a list of users, /user/:id to get a specific user, /register to create a new user, and /products to get a list of products.');
});

// User Routes
app.use('/user', userRouter);

// Product Routes
app.use('/product', productRouter);

// Order Routes
app.use('/user', orderRouter); // Changed from '/user' to '/order' for clarity

// Error handling middleware for 404 (Not Found)
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
