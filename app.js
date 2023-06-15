import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import customerRouter from './routes/customer.route.js'
import shopRouter from './routes/shop.route.js';
import bookingRouter from "./routes/booking.route.js";
import categoryRouter from "./routes/category.route.js";
import dropDownRouter from "./routes/dropDown.route.js";

// import admin from "./router/admin.router.js";
import mechanicRating from "./routes/mechanicRating.js";
import mechanicRouter from "./routes/mechanic.router.js";
import adminRouter from "./routes/admin.router.js"

import cors from "cors";
import path from 'path';
import { fileURLToPath } from "url";
import http from 'http';
import {Server} from 'socket.io';

const app = express();


const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));
mongoose.connect("mongodb+srv://coderhub:ddEzvZ6iPe4pKJrF@cluster0.nalrul7.mongodb.net/mr_mechanic?retryWrites=true&w=majority")
.then(result=>{


  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
// ----------------------------------
app.use(cors())

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected = '+socket.id);

  socket.on('chat message', (message) => {
    console.log('Received message:', message);
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});



app.use("/customer", customerRouter);
app.use("/booking",bookingRouter);                       
app.use("/category",categoryRouter);
app.use("/shop",shopRouter);
app.use("/dropDown",dropDownRouter);
app.use("/mechanic",mechanicRouter);
app.use("/admin",adminRouter);
app.use("/mechanicRating",mechanicRating);
// app.use("/customerRating",customerRating);





server.listen(3001,()=>{
    console.log("Server Started...");
  });
})
.catch(err=>{
    console.log(err);
    console.log("Database not connected...");
  })
