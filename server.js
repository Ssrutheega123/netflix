import express from 'express';
import { ENV_VARS } from './config/envVars.js';
import  authRoutes from "./routes/auth.routes.js";
import  movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import { protectRoute } from "./middleware/protectRoute.js";
import { connectDB } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();
dotenv.config();

const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

console.log("MONGO_URI:", ENV_VARS.MONGO_URI);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie",protectRoute, movieRoutes);
app.use("/api/v1/tv",protectRoute, tvRoutes);
app.use("/api/v1/search",protectRoute,searchRoutes);


// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});


app.listen(PORT, () => {
  console.log("server started at http://loca lhost:" + PORT);
  connectDB();
});
