const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 4000;
const app = express();


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://movie-app-client-neon.vercel.app",   
    "https://movieapp-laforteza.onrender.com"    
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(
  "mongodb+srv://admin:admin1234@rydelanndb.4ukmbcc.mongodb.net/b581-Movie-App?retryWrites=true&w=majority&appName=RydelAnnDB"
)
  .then(() => console.log("Now connected to MongoDB Atlas."))
  .catch(err => console.error("MongoDB connection error:", err));


const movieRoutes = require("./routes/movie");
const userRoutes = require("./routes/user");

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`API is now online on port ${port}`);
  });
}

module.exports = { app, mongoose };
