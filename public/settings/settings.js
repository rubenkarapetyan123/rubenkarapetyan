let form = document.querySelector("form")
let widthBtn = document.getElementById("width")
let heightBtn = document.getElementById("height")
let difficult = document.getElementById("difficult")
let musicValue = document.getElementById("musicValue")
let FPS = document.getElementById("FPS")
let socket = io()
form.addEventListener("submit",(evt)=>{
    evt.preventDefault()
    socket.emit("settings",{
        width : widthBtn.value,
        height : heightBtn.value,
        difficult : difficult.value,
        FPS : FPS.value,
        music : musicValue.value/10
    })
})

socket.on("audio",({audioOn,musicSound})=>{
    let music = document.getElementById('back')
    if(audioOn){
        music.volume = musicSound
        music.play()
    }else{
        music.volume = 0  
    }
})
