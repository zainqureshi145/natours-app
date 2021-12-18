const { query } = require('express');
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

/// Top Five Tours

exports.aliasTopFive = async (request, response, next) => {
    request.query.limit = '5';
    request.query.sort = '-ratingsAverage,price';
    request.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}



exports.getTours = async (request, response) => {

    // const tours = await Tour.find({
        //     duration: 5,
        //     difficulty: 'easy'
        // });
        // const tours = await Tour.find()
        //     .where('duration')
        //     .equals(5)
        //     .where('difficulty')
        //     .equals('easy');
    try {
        // BUILD QUERY
        // 1) Filtering
        console.log(request.query);
        const queryObj = { ...request.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(element => delete queryObj[element]);
        

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        console.log(JSON.parse(queryStr));

        let query = Tour.find(JSON.parse(queryStr));

        // 2) Sorting
        if (request.query.sort) {
            const sortBy = request.query.sort.split(',').join(' ');
            console.log(sortBy);
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Fields
        if (request.query.fields) {
            const fields = request.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');//exclude this thing in the response
        }

        // Limit (pagination)
        const page = request.query.page * 1 || 1;
        const limit = request.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if (request.query.page) {
            const numTours = await Tour.countDocuments();
            if (skip >= numTours) throw new Error('Page does not exist');
        }

        // EXECUTE QUERY
        const tours = await query;

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