const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tour = require('../../models/tourModel');


const DB = "mongodb://127.0.0.1:27017/natours";

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(connection => {
    console.log("Connection Name: ",connection.Connection.name);
    console.log("Database Connection Successful");
});

// Read data from file system
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, `utf-8`));

// Import data into database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Database populated...');
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

// Dalete all data from database
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Database entries deleted...');
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

if (process.argv[2] === '--import') {
    importData()
} else if (process.argv[2] === '--delete') {
    deleteData();
}
console.log(process.argv);