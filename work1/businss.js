

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
// 引入数据库并连接
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/user",{ useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log("连接成功");
})
.catch(err=>{
    console.log(err);
});
// 创建集合规则
let userSchema = new mongoose.Schema({
    username:String,
    password:String
});
// 创建集合
let user = mongoose.model("user",userSchema);
// 注册接口
app.get("/register",(req,res)=>{
    // console.log(req.query);
    user.create({username:req.query.username,password:req.query.password}).then(data=>{
        data?res.end("注册成功"):res.end("注册失败");
    })
})
// 登录接口
app.get("/login",(req,res)=>{
    user.find({username:req.query.username,password:req.query.password}).then(data=>{
        // console.log(data);
        data.length!=0?res.end("登录成功"):res.end("登录失败");
    })
})
// 设置监听
app.listen("8088",()=>{
    console.log("8088 is running");
})
