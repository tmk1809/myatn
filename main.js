var express = require('express')
var app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:true}))

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://khoi12345:Khoi12345@cluster0-shard-00-00.gnewi.mongodb.net:27017,cluster0-shard-00-01.gnewi.mongodb.net:27017,cluster0-shard-00-02.gnewi.mongodb.net:27017/test?replicaSet=atlas-gv0ojm-shard-0&ssl=true&authSource=admin'

app.post('/search', async (req,res)=>{
    let name = req.body.txtName

    //1. connect to URL server
    let server = await MongoClient.connect(url)
    //2. access to database
    let dbo = server.db("ATNToys")
    //get data
    let products = await dbo.collection('product').find({'name': new RegExp(name,'i')}).toArray() //i: khong phan biet chu hoa chu thuong
    res.render('allProduct',{'products':products})
})

app.get('/viewAll', async(req,res)=>{
    //1. connect to URL server
    let server = await MongoClient.connect(url)
    //2. access to database
    let dbo = server.db("ATNToys")
    //get data
    let products = await dbo.collection('product').find().toArray()
    let firstProduct = await dbo.collection('product').find().limit(1)
    let secondHalf = await dbo.collection('product').find().skip(1).toArray()
    res.render('allProduct',{'products':products})
})

app.post('/newProduct', async (req,res)=>{
    let name = req.body.txtName
    let price = req.body.txtPrice
    let picture = req.body.txtPicture
    let product = {
        'name': name,
        'price': price,
        'picture': picture
    }
    //1. connect to URL server
    let server = await MongoClient.connect(url)
    //2. access to database
    let dbo = server.db("ATNToys")
    //3. insert product to database
    dbo.collection("product").insertOne(product)
    //4. return to home page
    res.redirect('/')
})

app.get('/insert',(req,res)=>{
    res.render("newProduct")
})

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running')