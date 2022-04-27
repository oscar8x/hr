import { Metric } from "../entities/Metric";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { ctxQuery, periodTypes } from "../types";

export const createMetric = async (req : Request, res: Response) => {  
    const { name, value, timestamp } = req.body;
 
    if (!name || !value || !timestamp) {
        return res.status(400).json({
            message: "Missing parameters"
        });
    }

    const metric = new Metric();
    metric.name = name;
    metric.value = parseInt(value);
    metric.timestamp = new Date(timestamp);
  
    try {
        const errors = await validate(metric);
        
        if (errors.length > 0) throw errors;
            
        await metric.save();
        res.status(201).json(metric);
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong when saving data",
            error
        });
    }
}   

export const getMetrics = async (req : Request, res: Response) => {
    const { period } = req.query as ctxQuery;

    const periods : periodTypes = {
        "day": "d",
        "hour": "H",
        "minute": "M",
    }

    if (!period || period && !periods[period]) {
        return res.status(400).json({
            message: "Invalid period"
        });
    }

    try {
        const metrics = await Metric.createQueryBuilder("metric")
            .select( "metric.name", "name")
            .addSelect("AVG(metric.value)", "value")
            .addSelect("strftime('%" + periods[period] + "',metric.timestamp)", "timePart")
            .groupBy("metric.name")
            .addGroupBy("strftime('%" + periods[period] + "',metric.timestamp)")
            .orderBy("timepart", "ASC")
            .getRawMany()

        res.status(200).json(metrics);
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong when getting data",
            error
        });
    }
}  
