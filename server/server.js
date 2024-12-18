const express = require(`express`)
const dotenv = require(`dotenv`)
const connectDB = require(`./database/config`)
const morgan = require(`morgan`)
const cors = require(`cors`)
const { errorHandler } = require('./middlewares/errorHandler')

dotenv.config()
const app = express()

//database connection
connectDB()

//middlewares
app.use(express.json({ limit: "10mb" }))
app.use(morgan(`dev`))
app.use(cors())

//auth routing
app.use('/api/auth', require('./routes/authRouter'))
app.use('/api/auth/images/', require('./routes/adRouter'))

//error handler middleware
app.use(errorHandler)

//server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`);
})