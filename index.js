const express = require('express')
const {mergePdfs}  = require('./merger')
const path = require('path')
const cors = require("cors");
// var bodyParser = require('body-parser')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express()
// app.use(bodyParser.json())
app.use('/static', express.static('public'))

const port = process.env.PORT || 3001
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));
  app.post('/test',upload.single("file"), (req, res, next)=>{
    console.log("request file is", req.file)
    console.log("request body is", req.body)
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log("obj", obj)
    // console.log("request data is", req.body.file[0])
    return res.send("All is well")
  })
app.post('/merger', upload.array('files', 2),  async (req, res, next)=> {
  console.log("req", req.files)
  console.log("req files length", req.files.length)
    // console.log("File request is..", req.files)
    // return res.send('ok kuchh')
    let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    console.log("D", d)
    return res.sendFile(__dirname + `/public/${d}.pdf`)
  //  res.redirect(`https://3001-patia2-newswhether-jmrskdztjdx.ws-eu77.gitpod.io/static/${d}.pdf`)
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })
app.get('/', (req, res) => {
 return  res.send('Hello World!')
})
app.get('/home', (req, res) => {
 return  res.send('Hello World! this is my home page')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})