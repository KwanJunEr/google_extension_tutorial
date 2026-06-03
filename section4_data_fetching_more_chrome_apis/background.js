chrome.runtime.onInstalled.addListener((details)=>{
    chrome.contextMenus.create({
        title: "Test Context Menu",
        id: "contextMenu1",
        contexts: ["page", "selection"]
    })
    chrome.contextMenus.onClicked.addListener((event)=>{
        console.log(event)
        //Search API
        chrome.search.query({
            disposition: "NEW_TAB",
            text: `imdb${event.selectionText}`
        })

        //Tabs API
      
            // chrome.tabs.query({
            //     currentWindow: true,
            // }, (tabs)=>{
            //     console.log(tabs)
            // })
            // chrome.tabs.create({
            //     url: "www.google.com"
            // })
    
    })
    // chrome.contextMenus.create({
    //     title: "Test Context Menu 1",
    //     id: "contextMenu2",
    //     parentId: "contextMenu1",
    //     contexts: ["page", "selection"]
    // })
    // chrome.contextMenus.create({
    //     title: "Test Context Menu 2",
    //     id: "contextMenu3",
    //     parentId: "contextMenu1",
    //     contexts: ["page", "selection"]
    // })
    //Create children sub parent ids in the context menus based on the parent id 
})

console.log("background script running")