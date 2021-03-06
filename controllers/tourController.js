const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

/// Top Five Tours Middleware
exports.aliasTopFive = async (request, response, next) => {
    request.query.limit = '5';
    request.query.sort = '-ratingsAverage,price';
    request.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}


// Get all tours
exports.getTours = async (request, response) => {
    try {
        // Chaining APIFeatures
        const features = new APIFeatures(Tour.find(), request.query).filter().sort().limitFields().paginate();
        // Executing Query
        const tours = await features.query;

        response.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours: tours
            }
        });   
    } catch (error) {
        response.status(404).json({
            status: 'failed',
            message: error
        });
    }
}
// Get tour by id
exports.getTourById = async (request, response) => {
    try {
        //const tour = await Tour.findOne({_id: request.params.id});
        const tour = await Tour.findById(request.params.id);

        response.status(200).json({
            status: 'success',
            data: {
                tour: tour
            }
     });
    } catch (error) {
        response.status(404).json({
            status: 'failed',
            message: error
        });
    }
}
// Create new tour
exports.createTour = async (request, response) => {

    try {
        const newTour = await Tour.create(request.body);

        response.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });   
    } catch (error) {
        response.status(400).json({
            status: 'failed',
            message: 'Invalid data sent!'
        });
    }
}
// Update/Patch a tour
exports.updateTour = async (request, response) => {
    try {

        const tour = await Tour.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
            runValidators: true
        });

        response.status(200).json({
            status: 'success',
            data: {
                tour: tour
            }
        });
    } catch (error) {
        response.status(400).json({
            status: 'failed',
            message: error
        });
    }
}
// Delete a tour
exports.deleteTour = async (request, response) => {
    try {

       await Tour.findByIdAndDelete(request.params.id);

        response.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        response.status(204).json({
            status: 'No Content',
            message: error
        });
    }
}