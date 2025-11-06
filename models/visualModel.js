import mongoose from 'mongoose';

const visualSchema = new mongoose.Schema({}, { strict: false });

// explicitly use the existing 'data' collection
const VisualData = mongoose.model('VisualData', visualSchema, 'data');

export default VisualData;
