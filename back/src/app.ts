import express from "express";
import morgan from "morgan";
import { MetricRouter } from "./routes";

function createServer(){
    const app = express();
    const cors = require('cors')
    require('dotenv').config()

    app.use(cors({
        origin: process.env.CORS_ORIGIN,
    }))
    app.use(morgan('dev'))
    app.use(express.json());

    app.use('/metric', MetricRouter)
    
    app.use((req, res) => {
        res.status(404).json({  message: "Not found" });   
        });

    return app
}

module.exports = createServer