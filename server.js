const dotenv = require("dotenv")
dotenv.config();
const express = require("express")
const cors = require("cors")
const app = express();
const routes = require("./routes")
require("./db").connect();
const PORT = process.env.PORT
app.use(cors());
app.use(routes);
app.listen(PORT,()=>console.log(`listening on port ${PORT}`));
