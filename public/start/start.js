let play = document.getElementById("play")
let socket = io()
play.addEventListener("click",(evt)=>{
    socket.emit("play",true)
})