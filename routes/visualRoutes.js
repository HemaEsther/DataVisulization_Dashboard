import express from 'express';
import { visualRouteHandler, getFilterOptions } from '../controller/visualRouteHandler.js';

const app = express.Router();

app.get('/data', visualRouteHandler);
app.get('/options', getFilterOptions);

export default app;
