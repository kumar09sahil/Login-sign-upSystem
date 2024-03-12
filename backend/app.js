const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path: './File/config.env'})
const authRouter = require('./Router/authRouter')
const mongoose = require('mongoose')
const userRouter = require('./Router/UserRouter')
const cors = require('cors');

let app = express();

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true})
    .then(()=>{
        console.log("db connection succeesfull..!")
    }).catch((err)=>{
        console.log("some error occured ", err.message)
    })
    
    const port = process.env.PORT || 3000

    app.listen(port, () =>{
        console.log(`server started on http://localhost:${port}`)
    })
    

 
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)

app.get('/',(req,res) =>{
    res.send('server is running')
})

module.exports = app;
