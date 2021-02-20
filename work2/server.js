// 引入服务器模块
const express = require("express");
let app = express();
// cros跨域
app.all("*",function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();  
});
const body_parser = require("body-parser");
app.use(body_parser.urlencoded({extended: false}))
// 引入数据库并连接
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/stuser",{ useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log("连接成功");
})
.catch(err=>{
    console.log(err);
});
// 创建集合规则
let userSchema = new mongoose.Schema({
    username:String,
    age:String,
    sex:String
});
// 创建集合
let user = mongoose.model("user",userSchema);
// show接口
app.post("/show",(req,res)=>{
    user.find({}).then(data=>{
        res.send(data)
    })
})
// 添加接口
app.get("/default",(req,res)=>{
    user.create(req.query).then(data=>{
        data?res.end("添加成功"):res.end("添加失败")
    })
})
// 删除接口
app.get("/del",(req,res)=>{
    user.findOneAndDelete({_id:req.query.id}).then(data=>{
        console.log(data);
        data?res.end("删除成功"):res.end("删除失败");
    })
})
// 修改接口
app.get("/update",(req,res)=>{
    user.updateOne({_id:req.query.id},{username:req.query.username,age:req.query.age,sex:req.query.sex}).then(data=>{
        data?res.end("成功"):res.end("失败");
    })
})
// 设置监听
app.listen("8080",()=>{
    console.log("8080 is running");
})