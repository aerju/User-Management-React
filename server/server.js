const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();
const userRouter = require('./routes/userRoute');
const adminRouter = require('./routes/adminRoute');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))


const PORT = 4000;

mongoose.connect(process.env.MONGODB_URL);

app.use('/',userRouter);
app.use('/admin', adminRouter);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server connected to PORT:", PORT);
});
module.exports = app;


