import VisualData from '../models/visualModel.js';

// GET /api/data
export const visualRouteHandler = async (req, res) => {
  try {
    const {
      end_year,
      topic,
      sector,
      region,
      pestle,
      source,
      swot,
      country,
      city,
    } = req.query;

    // build dynamic filters
    const filters = {};

    if (end_year) filters.end_year = parseInt(end_year);
    if (topic) filters.topic = topic;
    if (sector) filters.sector = sector;
    if (region) filters.region = region;
    if (pestle) filters.pestle = pestle;
    if (source) filters.source = source;
    if (swot) filters.swot = swot;
    if (country) filters.country = country;
    if (city) filters.city = city;

    const data = await VisualData.find(filters).limit(1000);

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error while fetching data',
    });
  }
};

// GET /api/options - Get unique filter options
export const getFilterOptions = async (req, res) => {
  try {
    const allData = await VisualData.find({}).limit(5000);
    
    const getUniqueValues = (field) => {
      const values = allData
        .map(item => item[field])
        .filter(val => val !== null && val !== undefined && val !== '')
        .map(val => val.toString().trim());
      return [...new Set(values)].sort();
    };

    const options = {
      end_years: getUniqueValues('end_year').filter(y => !isNaN(y)).sort((a, b) => a - b),
      topics: getUniqueValues('topic'),
      sectors: getUniqueValues('sector'),
      regions: getUniqueValues('region'),
      pestles: getUniqueValues('pestle'),
      sources: getUniqueValues('source'),
      swots: getUniqueValues('swot'),
      countries: getUniqueValues('country'),
      cities: getUniqueValues('city'),
    };

    res.status(200).json({
      success: true,
      options,
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error while fetching filter options',
    });
  }
};
