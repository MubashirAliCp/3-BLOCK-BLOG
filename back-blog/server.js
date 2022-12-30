const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config();
const dbConnect = require ("./config/db/dbConnect");
const userRoutes = require("./route/users/usersRoute");

const { errorHandler, notFound} = require("./middlewares/error/errorHandler");
const postRoute = require("./route/post/postRoute");
const commentRouter = require("./route/comments/commentRoute");
const categoryRoute = require("./route/category/categoryRoute");


const app = express();

//DB
dbConnect()

app.use(express.json())

//cors
app.use(cors())

// users router
app.use("/api/users",userRoutes)



//post route
app.use("/api/posts",postRoute)

//comment route
app.use("/api/comment",commentRouter)

// category routes
app.use("/api/category",categoryRoute)

//error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('server is running on pooort'));