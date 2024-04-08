const express = require('express')

const router = express.Router()

const checkIn = require('./checkinn/checkinn')
const getDados = require('./checkinn/getdados')
const setDados = require('./checkinn/setdados')
const deletDados = require('./checkinn/deletdados')

router.get('/', (req,res)=>{
    res.send('App Online')
})

router.use('/checkinn', checkIn)
router.use('/hospedes', getDados)
router.use('/setdados', setDados)
router.use('/delete', deletDados)


module.exports = router