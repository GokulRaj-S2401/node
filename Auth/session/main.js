//packages
const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const session = require('express-session')
const mongoose = require('mongoose')
const userModel = require('./model/User')
const bcrypt = require('bcrypt')
const mongodbSession = require('connect-mongodb-session')(session)

//body parser setup
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//view engine setup
app.engine('handlebars',engine({extname:'hbs'}))
app.set('views','./views')
app.set('view engine', 'hbs')

//static content setup
app.use('/static',express.static('public'))

//mongoDB connection setup
const url = "mongodb://localhost:27017/Auth"
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(res=>console.log("mongodb connected"))

//session data store in mongoDB

const store = new mongodbSession({
    uri:url,
    collection:'sessions'
})

app.use(session({
    resave:false,
    secret:'this is auth example',
    saveUninitialized:false,
    store:store
}))


//secure page prevent
const isAuth = (req,res,next)=> {
    if(req.session.isAuth){
        next()
    }
    else{
        res.redirect('/login')
    }
}

const isLog = (req,res,next)=>{
    if(req.session.isAuth){
        res.redirect('/home')
    }
    else{
        next()
    }
}

//GET Routes

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/login',isLog,(req,res)=>{
    res.render('login')
})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.get('/home',isAuth,(req,res)=>{
    res.render('home')
})

//POST Route
app.post('/register',async(req,res)=>{
    const { name,email,password } = req.body
    let user = await userModel.findOne({email})
    
    if(user){
        return res.redirect('/login')
    }
    let hashpassword = await bcrypt.hash(password,12)
    user = new userModel({name,email,password:hashpassword})
    await user.save()
    res.redirect('/login')
})

app.use('/login',async(req,res)=>{
    const {email,password} = req.body
    let user = await userModel.findOne({email})
    
    if(!user){
        return res.redirect('/login')
    }
    let isMatch = bcrypt.compare(password,user.password)
    
    if(!isMatch){
        return res.redirect('/login')
    }

    req.session.isAuth = true
    res.redirect('/home')
})

app.use('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err
        else res.redirect('/')
    })
})

app.listen(5000,console.log('server start'))