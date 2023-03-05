let play = document.getElementById("play")
let socket = io()
play.addEventListener("click",(evt)=>{
    socket.emit("play",true)
})
let musicSoundClient
let on
socket.on("audio",({audioOn,musicSound})=>{
    musicSoundClient = musicSound
    on = audioOn
    if(on){
        mutePng.src  = "../overlay/unmute.png"
        music.volume = musicSound
        music.play()
    }else{
        mutePng.src  = "../overlay/mute.png"
        music.volume = 0  
    }   
})

let music = document.getElementById('back')

let mutePng = document.getElementById("mutepng")
let muteBtn = document.getElementById("onMusic")
muteBtn.addEventListener("click",function(){
    if(on == false){
        mutePng.src  = "../overlay/unmute.png"
        music.volume = musicSoundClient
        on = true
        music.play()
        socket.emit("audio",true)
    }else{
        mutePng.src  = "../overlay/mute.png"
        music.volume = 0  
        on = false  
        socket.emit("audio",false)
    }   
})