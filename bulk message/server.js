const express = require('express')
const cors = require('cors')

const app = express()
const nodemailer = require('nodemailer')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const twilio = require('twilio')

const client = new twilio('ACedf6b05c4db2953d4ea8677db5039356','4924cda8d3fa8ec6cae46dfcd4ddb9b0')

app.post('/sms',(req,res)=>{
    console.log(req.body);
    client.messages.create({
        to:'+91'+req.body.to,
        from:'+15188024137',
        body:req.body.message,
        messagingServiceSid: 'MGf6002451739627c8633e7a0ed8692fd7', 
    }).
    then((message)=>message.sid ? res.json({status:'200'}) : res.json({status:'500'}) )
    
})



const mailTransporter =  nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'bulkemailsender12@gmail.com',
        pass:'cqzriybpmpxinfoj'
    }

})



app.post('/email',(req,res)=>{
    let email = {
        from:'bulkemailsender12@gmail.com',
        to:req.body.to,
        subject:req.body.subject,
        text:req.body.message
    }
    mailTransporter.sendMail(email,(err,r) =>{
        if(err){
            res.send({status:'500'})
        }
        else{
            res.send({status:'200'})
        }
    })
})




app.listen(9000,()=>console.log('server start'))