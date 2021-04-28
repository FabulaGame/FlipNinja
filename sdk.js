let requesting = false;
window.createVideoAd = () => {
    (window.__adFinishedCallback || (() => { console.log("adFinished") }))();

    // if (requesting) return console.log("前一个广告正在加载中");
    // requesting = true;
    // console.log("即将播放广告")
    // gdsdk.showBanner();
    // setTimeout(()=>{
        // (window.__adFinishedCallback || (() => { console.log("adFinished") }))();
    // }, 0)
}
window["GD_OPTIONS"] = {
    "gameId": "5684decb92194ab5a2010c9a3a6dc0e6",
    "onEvent": function (event) {
        console.log("event,name", event.name)
        switch (event.name) {
            case "SDK_GAME_START":
                requesting = false;
                setTimeout(()=>{
                    window.__adErrorCallback && window.__adErrorCallback();
                }, 200)
                // advertisement done, resume game logic and unmute audio
                break;
            case "SDK_GAME_PAUSE":
                // pause game logic / mute audio
                break;
            case "SDK_GDPR_TRACKING":
                // this event is triggered when your user doesn't want to be tracked
                break;
            case "SDK_GDPR_TARGETING":
                // this event is triggered when your user doesn't want personalised targeting of ads and such
                break;
            case "STARTED":
                (window.__adStartCallback || (() => { console.log("adStarted") }))();
                break;
            case "AD_SDK_FINISHED":
                requesting = false;
                window.__adErrorCallback = undefined;
                setTimeout(()=>{
                    // (window.__adFinishedCallback || (() => { console.log("adFinished") }))();
                    (window.__adFinishedCallback || (() => { console.log("adFinished") }))();
                }, 100)
                break;
            case "AD_SDK_CANCEL":
            case "AD_CANCELED":
                requesting = false;
                setTimeout(()=>{
                    (window.__adErrorCallback || (() => { console.log("adError") }))();
					window.__adErrorCallback = undefined;
                }, 100)
                break;
        }
    },
};
// (function (d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s);
//     js.id = id;
//     js.src = 'https://html5.api.gamedistribution.com/main.min.js';
//     js.onload = () => {
//         console.log("jsloaded")
//     }
//     // fjs.parentNode.insertBefore(js, fjs);
//     d.head.appendChild(js);
// }(document, 'script', 'gamedistribution-jssdk'));
