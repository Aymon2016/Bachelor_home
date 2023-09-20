

require('dotenv').config()
const http = require('http')
const app = require('./app.js')
const { connectDB } = require('./db/index')



const server = http.createServer(app)

const port = process.env.PORT || 8000;




const main = async () => {
    try {

        await connectDB()

        server.listen(port, async () => {
            console.log(`Server is listening on port ${port}`);
        })



    } catch (e) {
        console.log('Database Error')
        console.log(e)
    }

}
main()