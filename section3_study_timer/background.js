chrome.alarms.create("pomodoroTimer",{
    periodInMinutes: 1/60, 
})

/*
 Creates a repeating alarm (like a setInterval, but for extensions)
 pomodoroTimer --> The name/ID of the alarm so you can identify it later 
 periodInMinutes: 1/60Fires every 1 second (1 minute ÷ 60 = 1 second)
*/

chrome.alarms.onAlarm.addListener((alarm)=>{
    //Every time any alarm fires, this function runs, alarm is the alarm object that fired 
    if(alarm.name === "pomodoroTimer"){
        //Checks if its your specific alarm (you might have multiple alarms in an extension)
        chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res)=>{
            /*
            Reads two values from storage: timer and isRunning 
            res is the result object -- like { timer: 10, isRunning: true }
            */
            if(res.isRunning){
                /*
                    Only counts up if the timer is actually running 
                    If user paused it, do nothing 
                */
                let timer = res.timer + 1
                /*
                    Gets the curretn timer value and adds 1 second 
                */
               let isRunning = true
               if(timer === 60 * res.timeOption){
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icon.png",
                    title: "Pomodoro Timer",
                    message: `${res.timeOption} minutes has passed`,
                })
                timer = 0
                isRunning = false
               }
                
                chrome.storage.local.set({
                    timer, 
                    isRunning
                })
            }
        })
    }
})

chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res)=>{
    chrome.storage.local.set({
        timer: "timer" in res ? res.timer : 0, 
        isRunning: "isRunning" in res? res?.isRunning : false,
        timeOption: "timeOption" in res? res.timeOption : 25, 
    })
})