let form = document.querySelector("form")
let widthBtn = document.getElementById("width")
let heightBtn = document.getElementById("height")
let difficult = document.getElementById("difficult")
let FPS = document.getElementById("FPS")
let socket = io()
form.addEventListener("submit",(evt)=>{
    evt.preventDefault()
    socket.emit("settings",{
        width : widthBtn.value,
        height : heightBtn.value,
        difficult : difficult.value,
        FPS : FPS.value
    })
})