const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const bodyParser = require('body-parser')

const PORT=4000;


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/Auth',{
    useNewUrlParser: true,
    useUnifiedTopology: true,})
    .then(()=>{
    console.log('MongoDB successfully connected')
}).catch(error=>{
    console.log('Mongodb Error',error);
})

app.listen(PORT, ()=>{
    console.log(`Node server is listening to ${PORT}`)
});

app.use(
    cors({
        origin: ["http://localhost:4000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);