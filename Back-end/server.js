const express = require('express')
const app = express()
const port = 4000
require('dotenv').config()




app.use(express.json())



app.use('/api/auth', require('./src/Routers/authRouter'))
app.use('/api/admin', require('./src/Routers/UserRouter'))






app.listen(port, () => console.log(`app listening on port ${port}! : http//localhost:${port} `))