const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
//console.log(process.env);

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(connection => {
    console.log("Connection Name: ",connection.Connection.name);
    console.log("Database Connection Successful");
});


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started at port ${port}...`);
});