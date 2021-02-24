
// 搭建服务端
const express = require("express");
let app = express();
// cros跨域
app.all("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});
// 引入数据库并链接
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/twenty",{ useNewUrlParser: true, useUnifiedTopology: true, })
.then(() => {
    console.log("链接成功")
})
.catch((err) => {
    console.log(err)
});
// 留言创建集合规则
const twoSchema = new mongoose.Schema({
    username:String,
    text:String,
    time:String
})
// 留言创建集合
let two = mongoose.model("two",twoSchema);

// 文章创建集合规则
const twoneSchema = new mongoose.Schema({
    artname:String,
    writer:String,
    lei:String,
    time:String
})
// 文章创建集合
let twone = mongoose.model("twone",twoneSchema);
// 留言板
// show接口
app.get("/show",(req,res)=>{
    two.find().then(data=>{res.send(data)});
})
// 添加接口
app.get("/add",(req,res)=>{
    two.create(req.query).then(data=>{
        data?res.send({status:1}):res.send({status:0});
    })
})
// 删除接口
app.get("/del",(req,res)=>{
    two.findOneAndDelete({_id:req.query.id}).then(data=>{
        data?res.send({status:1}):res.send({status:0});
    })
})

// 文章管理
// show接口
app.get("/artshow",(req,res)=>{
    twone.find().then(data=>{res.send(data)});
})
// 添加文章
app.get("/artadd",(req,res)=>{
    twone.create(req.query).then(data=>{
        data?res.send({status:1}):res.send({status:0});
    })
})
// 修改文章
app.get("/artgai",(req,res)=>{
    twone.updateOne({_id:req.query.id},{
        artname:req.query.artname,
        writer:req.query.writer,
        let:req.query.let,
        time:req.query.time,
    }).then(data=>{
        data?res.send({status:1}):res.send({status:0});
    })
})
// 删除接口
app.get("/artdel",(req,res)=>{
    twone.findOneAndDelete({_id:req.query.id})
    .then(data=>{
        data?res.send({status:1}):res.send({status:0});
    })
})
// 设置监听
app.listen("8578",()=>{
    console.log("8578 is running");
})