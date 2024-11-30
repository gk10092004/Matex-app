require("dotenv").config();
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require('cors')
const express = require("express");
require("./config/db");
const userRoutes = require("./routes/userRoute");
const vendorRoutes = require('./routes/vendorRoute');
const { uploadFile } = require("./helpers/upload");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); //getting data in form of json

// app.use(cors({ origin: 'https://matexiitr.vercel.app' }));

// const cors = require('cors');

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:5173', 'https://matexiitr.vercel.app'];
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors()); // Handle preflight requests





app.use(express.json({ limit: '500mb' })); // Set JSON payload size limit
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true })); // S

//routers
app.use("/api/users", userRoutes);
app.use("/api/vendors",vendorRoutes);


//demo of cloudanary
// app.post("/upload",uploadFile)


app.listen(port, () => {
  console.log(`you are live on http://localhost:${port}/`);
});
