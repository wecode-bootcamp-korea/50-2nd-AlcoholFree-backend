const http = require("http");
const express = require("express");
const app = express();

// env 파일 경로 지정
const path = require("path");
const envPath = path.join(__dirname, "./src/utils",".env")

const dotenv = require("dotenv");
dotenv.config({path: envPath});


const cors = require("cors");
const morgan = require("morgan");
const routes = require("./src/routes")


app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(routes);



const server = http.createServer(app);
const port = process.env.PORT
console.log(port);


const start = async() => {
    try{
        server.listen(port, () =>{
            console.log(`Server is listening on ${port}`);
        });
    }catch(err){
        console.log(err)
    }

}

start();
