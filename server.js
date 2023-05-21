import express, { json } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

dotenv.config()

import ProduitRoutes from './Routes/ProduitRoute.js';
import FilmRoutes from './Routes/FilmRoute.js';
import TournageRoutes from './Routes/TournageRoute.js';
import SocieteDeProductionRoutes from './Routes/SocieteDeProductionRoute.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require('./documentation.json')  


const app = express();
const port = process.env.PORT || 9090;

const databaseName = 'MyApp';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://oueslatimohamed01:azerty123@test.tzaqd7r.mongodb.net/${databaseName}?retryWrites=true&w=majority`)
 // .connect(`mongodb://mongo_db:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/img",express.static('public/images'));
app.use("/vid",express.static('public/videos'));
app.use("/file",express.static('public/files'));
app.set('view engine', 'ejs')


app.use('/Produit',ProduitRoutes);
app.use('/Film',FilmRoutes);
app.use('/Tournage',TournageRoutes);
app.use('/SocieteDeProduction',SocieteDeProductionRoutes);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });