const express = require(`express`)
const dotenv = require(`dotenv`)
const connectDB = require(`./db/config`)
const morgan = require(`morgan`)
const cors = require(`cors`)

dotenv.config()
const app = express()

//database connection
connectDB()

//middlewares
app.use(express.json())
app.use(morgan(`dev`))
app.use(cors())

app.get('/', (req, res) => {
    res.send("Welcome to Dream Home.")
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`);
})