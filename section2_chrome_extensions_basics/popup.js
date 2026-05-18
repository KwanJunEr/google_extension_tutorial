const timeElement = document.getElementById("time")
const nameElement = document.getElementById("name")
const currentTime = new Date().toLocaleTimeString();
timeElement.textContent = `The time is: ${currentTime}`

chrome.action.setBadgeText({
    text: "TIME",
}, ()=>{
    console.log("Finished setting badge text.")
})

chrome.storage.sync.get(["name"], (res)=>{
    nameElement.textContent = `Your name is: ${res.name}`
})