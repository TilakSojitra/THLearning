
import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/route.js";


dotenv.config();

const app = express();


app.use(cors());

app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended:true}));

app.use('/',router);

const PORT = 8000;

app.listen(PORT, () => console.log(`server is running on port number ${PORT}.`));