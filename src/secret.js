// sayu

// require("dotenv").config();
// const serverPort = process.env.SERVER_RUNNING_PORT || 5000

// const mongodbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wzze4.mongodb.net/`
//     ;

// module.exports = { serverPort, mongodbURL };



// amer testing 

require("dotenv").config();
const serverPort = process.env.SERVER_RUNNING_PORT || 5000

const mongodbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zdyrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


module.exports = { serverPort, mongodbURL };