import path from 'path';
import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import cloudinary from 'cloudinary';
import cors from "cors";
import fileUpload from 'express-fileupload';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';



import userRoute from './routes/userRoute.js';
import applicationRoute  from './routes/applicationRoute.js';
import jobRoute  from './routes/jobRoute.js';







const port = process.env.PORT;

//CONNECT DB
connectDB();

//INITIALIZE EXPRESS
const app = express();

//BODY PARSER MIDDLEWARE
app.use( express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Enable CORS
app.use(cors());

//File uploading
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));


//ROUTES
app.use('/api/users', userRoute);
app.use('/api/applications', applicationRoute);
app.use('/api/jobs', jobRoute);



//STATIC ROUTE
app.get('/', (req, res) => {
    res.send('API is running');
});


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


//MIDDLEWARE
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server is runing on port ${port}`) );