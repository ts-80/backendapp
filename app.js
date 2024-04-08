require('dotenv').config()
const express = require('express')
const cors = require('cors')

const routers = require('./src/index')


const port = process.env.PORT


const app = express()
app.use(cors())
app.use(express.json())

app.use('/', routers)
// app.use('/hospedes',routers)
// app.use('/setdados', routers)

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})

