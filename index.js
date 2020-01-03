const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const router = require('./router/router')


app.use((req,res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
        return res.status(200).json({})
    }
    next()
})
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/contacts', router)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))