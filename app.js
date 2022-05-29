const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")

let app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

var bloodModel=Mongoose.model("bloods",
new Mongoose.Schema(
  {  donorname:String,
    address:String,
    blood:String,
    mobile:String
  }))

  Mongoose.connect("mongodb+srv://snehasam:snehasa4@cluster0.yyrcr.mongodb.net/Blooddb")
app.post("/api/adddonor",(req,res)=>{
    var getName=req.body.donorname 
    var getAddress=req.body.address 
    var getBlood=req.body.blood 
    var getMobile=req.body.mobile 
    var data={"donorname":getName,"address":getAddress,"blood":getBlood,"mobile":getMobile}
   
    let blooddata=new bloodModel(data)
    blooddata.save((error,data)=>{
        if(error){
            res.send({"status":"error","data":error})
        }
    
        else
        {
            res.send({"status":"success","data":data})
        }
    })

})

app.post("/api/delete",(req,res)=>{
 var getId=req.body
 bloodModel.findByIdAndRemove(getId,(error,data)=>{
    if(error){
        res.send({"status":"error","data":error})
    }

    else
    {
        res.send({"status":"success","data":data})
    }  
 }
 )
})

app.post("/api/search",(req,res)=>{
var getName=req.body
bloodModel.find(getName,(error,data)=>{
    if(error){
        res.send({"status":"error","data":error})
    }

    else
    {
        res.send({"status":"success","data":data})
    }
})
})

app.get("/api/getdonor",(req,res)=>{
    bloodModel.find((error,data)=>{
        if(error)
        {
            res.send(error)
        }
        else{
            res.send(data)
        }
    })

})

app.listen(8000,()=>{
console.log("server running")
})