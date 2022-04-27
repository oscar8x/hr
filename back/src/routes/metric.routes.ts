import { Router } from "express";
import { createMetric, getMetrics } from "../controllers/metric.controller";

export const MetricRouter  = Router()

MetricRouter.post('/', createMetric)
MetricRouter.get('/', getMetrics)

export default MetricRouter