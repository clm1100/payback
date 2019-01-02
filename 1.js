var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var uuidv1 = require('uuid/v1');
var io = require('socket.io')(http, {
  path: '/test',
});

let obj = {}


app.use(express.static(__dirname))

io.on('connection', function(socket){
  
  console.log(socket.id);
  console.log('a user connected');
  socket.emit("uid",socket.id);
});

app.get('/test',(req,res)=>{
  res.sendFile(__dirname + '/index.html');
})

app.get("/payok/:socketid",(req,res)=>{

  let socketid = req.params.socketid;
  
  if(io.nsps["/"].connected[socketid]){
   
    setTimeout(function(){

      io.to(`${socketid}`).emit("msg","9999");
      // console.log(io.sockets.clients);
      // io.sockets.clients(socketid).emit("msg","9999");
      res.send("ok")
    })
  }else{
    res.send("faile")
  }



})

http.listen(3000, function(){
  console.log('listening on *:3000');
});