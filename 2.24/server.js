
// 搭建服务器
const express = require("express");
let app = express();
// cros跨域
app.all("*",function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();  
});
let url = require("url");
// 链接数据库
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/three",{ useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log("数据库链接成功");
})
.catch(err=>{
    console.log(err);
});
// 创建集合规则
let threeSchema = new mongoose.Schema({
    username:String,age:String,phone:String,sheng:String,sex:String
});
// 创建集合
let san = mongoose.model("san",threeSchema);
// show接口
app.get("/show",(req,res)=>{
    san.find().then(data=>{res.send(data)})
})
// 添加接口
app.get("/add",(req,res)=>{
    san.create(req.query).then(data=>{
        data?res.send({status:1}):res.send({status:0});
    })
})
// 删除接口
app.get("/del",(req,res)=>{
    san.findOneAndDelete({_id:req.query.id}).then(data=>{
        console.log(data);
        data?res.send({status:1}):res.send({status:0});
    })
})
// 批量删除
app.get("/pdel",(req,res)=>{
    let urlObjarr = url.parse(req.url,true).query.arr;
    let arr = urlObjarr.split(",");
    san.deleteMany({_id:{$in:arr}}).then(data=>{
        res.send(data);
    })
})
// 确认修改接口
app.get("/alter",(req,res)=>{
    let urlObj = url.parse(req.url,true).query;
    san.updateOne({_id:urlObj.id},{
        username:urlObj.username,
        age:urlObj.age,
        phone:urlObj.phone,
        sheng:urlObj.sheng,
        sex:urlObj.sex
    }).then(data=>{
        res.send(data)
    })
});
// 设置监听
app.listen("8080",()=>{
    console.log("8080 is running");
})