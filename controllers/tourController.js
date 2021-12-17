const fs = require('fs');
const Tour = require('../models/tourModel');

//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// exports.checkID = (request, response, next, value) => {
//     const id = request.params.id * 1;
//     const tour = tours.find(element => element.id === id);
//     if (id > tours.length) {
//         return response.status(404).json({
//             status: 'falied',
//             message: 'does not exist'
//         });
//     }
//     next();
// }

// exports.checkBody = (request, response, next) => {
//     if (!request.body.name || !request.body.price) {
//         return response.status(400).json({
//             status: 'failed',
//             message: 'no request body'
//         });
//     }
//     next();
// }

exports.getTours = async (request, response) => {
    try {
        const tours = await Tour.find();
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