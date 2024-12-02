const mongoose = require(`mongoose`)

const connectDB = () => {
    mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => console.log(`Database Connected!`))
    .catch((err) => console.log(`Database Connection Failure: ${err.message}`))
}

module.exports = connectDB