const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path")
app.use('/uploads', express.static('uploads'));
app.use(express.json());

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true
}));




try{
    mongoose.connect('mongodb+srv://arjuntudu:gxpFj2gp4bsWMGmN@cluster0.ssu2p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log("DATABASE CONNECTION SUCCESSS");
}catch(err){
    if(err){
        console.log("DATABSE CONNECTION FAILED")
    }
}


const User = mongoose.model("collection_1",{
    name:String,
    age:Number
})



const Image = mongoose.model("Images",{
    fileName : String,
    path : String,
    name:String

})

const storage = multer.diskStorage({
    
    destination:function(req,file,cb){
        cb(null,'uploads');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }

})



const upload = multer({
    storage:storage
})



app.get("/",async (req,res)=>{
     
    

    try{
        
        const list = await User.find();
        res.json(list);

    }catch(e){
        
        console.log(" get("/") error  ")

    }




})




app.post("/upload",upload.single('file'),async (req,res)=>{
    
    if(!req.file){
        return res.status(400)

    }
    
    console.log(req.file);
    const name = req.body.name

    const new_Image = new Image({

        fileName : req.file.filename,
        path : req.file.path,
        name:name

    })
    
   

    try{
        await new_Image.save();
    }catch(e){
        console.log(e);
    }

     
})




app.get("/all_photos",async (req,res)=>{
    
    try{
        const list = await Image.find({});
        res.json(list)
    }catch(e){
        if(e){
            console.log("all_Photos get error");
        }
    }
})




app.listen(5000,(err)=>{
    if(err){
        console.log("app started failed")
    }
})
