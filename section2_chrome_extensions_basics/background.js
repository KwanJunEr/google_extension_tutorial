//chrome service worker implementation
// let time = 0

// setInterval(()=>{
//     time += 1;
//     console.log(time)
// },1000)

//chrome alarms implementation 

chrome.alarms.create({
    periodInMinutes: 1/60,
})

chrome.alarms.onAlarm.addListener((alarm)=>{
    chrome.storage.local.get(["timer"], (res)=>{
        const time = res.timer ?? 0
        chrome.storage.local.set({
            timer: time + 1,
        })
        chrome.action.setBadgeText({
            text: `${time + 1}`
        })
        chrome.storage.sync.get(["notificationTime"], (res)=>{
            const notificationTime = res.notificationTime ?? 1000
            if(time % notificationTime == 0){
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icon.png",
                    title: "Chrome Timer Extension",
                    message: `${notificationTime} seconds have passed!`,
                })
            }
        })
        // if(time % 10 == 0){
        //     self.registration.showNotification("Chrome Timer Extension", {
        //         body: "10 second has passed!",
        //         icon: "icon.png",
        //     })
        // }
    })
})