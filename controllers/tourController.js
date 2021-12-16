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

exports.getTours = (request, response) => {
    //console.log(request.requestTime);
    response.status(200).json({
        status: 'success',
        //requestedAt: request.requestTime,
        // results: tours.length,
        // data: {
        //     tours: tours
        // }
    });
}
// Get tour by id
exports.getTourById = (request, response) => {
    //const id = request.params.id * 1;
    //const tour = tours.find(element => element.id === id);
    console.log(request.params);
        response.status(200).json({
            status: 'success',
        //     data: {
        //         tour: tour
        //     }
     });
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
exports.updateTour = (request, response) => {
    // console.log(request.params);
    // const id = request.params.id * 1;
    // const tour = tours.find(element => element.id === id);
         response.status(200).json({
             status: 'success',
             data: {
                 tour: "<updated tour here>"
             }
         });
}
// Delete a tour
exports.deleteTour = (request, response) => {
    // console.log(request.params);
    // const id = request.params.id * 1;
    // const tour = tours.find(element => element.id === id);
        response.status(204).json({
            status: 'success',
            data: null
        });
}