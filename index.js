const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(    // Allow access from anywhere for now
    cors({
        origin: "*",
        // origin: allowedOrigins,
        //credentials: true,
    })
);

mongoose.connect("mongodb+srv://admin:admin1234@rydelanndb.4ukmbcc.mongodb.net/b581-Movie-App?retryWrites=true&w=majority&appName=RydelAnnDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

if(require.main === module){
    app.listen(process.env.PORT || port, () => {
        console.log(`API is now online on port ${ process.env.PORT || port }`)
    });
}

module.exports = {app,mongoose};




// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const port = process.env.PORT || 4000;
// const app = express();


// app.use(cors());


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// mongoose.connect(
//   "mongodb+srv://admin:admin1234@rydelanndb.4ukmbcc.mongodb.net/b581-Movie-App?retryWrites=true&w=majority&appName=RydelAnnDB"
// )
//   .then(() => console.log("Now connected to MongoDB Atlas."))
//   .catch(err => console.error("MongoDB connection error:", err));


// const movieRoutes = require("./routes/movie");
// const userRoutes = require("./routes/user");

// app.use("/movies", movieRoutes);
// app.use("/users", userRoutes);

// if (require.main === module) {
//   app.listen(port, () => {
//     console.log(`API is now online on port ${port}`);
//   });
// }

// module.exports = { app, mongoose };
