function initializeConfig(e){void 0===localStorage.reallyBeenHereBefore&&(localStorage.setItem("delay",1e3*e.updateDelay),localStorage.setItem("chartPeriod",e.chartPeriod),localStorage.setItem("alertValues",JSON.stringify(e.alertValues)),localStorage.setItem("panicValues",JSON.stringify(e.panicValues)),localStorage.setItem("portfolioValues",JSON.stringify(e.portfolioValues)),localStorage.setItem("sourceCurrency",e.sourceCurrency),localStorage.setItem("targetCurrency",e.targetCurrency),localStorage.setItem("soundNotification",e.soundNotification),localStorage.setItem("colorChange",e.colorChange),localStorage.setItem("lastPrice",0),localStorage.setItem("soundSample","pop"),localStorage.setItem("btcAmount",e.btcAmount),localStorage.setItem("ethAmount",e.ethAmount),localStorage.setItem("portfolio",e.portfolio),localStorage.setItem("curs",JSON.stringify(e.curs)),localStorage.setItem("reallyBeenHereBefore","yes")),setInterval(updateTicker,localStorage.delay)}function getJSON(e,t){var o=new XMLHttpRequest;o.open("GET",e,!0),o.onload=function(){if(o.status>=200&&o.status<400){var e=JSON.parse(o.responseText).data;t(e)}},o.onerror=function(e){console.log("Coinbase does not respond.")},o.send()}function updateTicker(){getJSON("https://api.coinbase.com/v2/prices/"+localStorage.targetCurrency+"-"+localStorage.sourceCurrency+"/spot",function(e){var t=e.amount,o=e.amount.toString(),a=o;!0===localStorage.colorChange&&(parseFloat(t)>localStorage.lastPrice?(setBadgeColor("#2B8F28"),setTimeout(function(){setBadgeColor("#2E7BC4")},4e3)):parseFloat(t)<localStorage.lastPrice&&(setBadgeColor("#FF4143"),setTimeout(function(){setBadgeColor("#2E7BC4")},4e3))),1==localStorage.roundBadge?t>=100?a=parseFloat(e.amount).toFixed(0).toString():t<100&&(a=parseFloat(e.amount).toFixed(1).toString()):a=o,isEdge&&(a=a.substring(0,4)),browser.browserAction.setBadgeText({text:a}),localStorage.lastPrice=t}),isChrome&&notificationManager()}function notificationManager(){for(var e=Object.keys(JSON.parse(localStorage.curs)).length,t=0;t<e;t++)getJSON("https://api.coinbase.com/v2/prices/"+JSON.parse(localStorage.curs)[t]+"-"+localStorage.sourceCurrency+"/spot",function(e){var t=e.amount,o=(e.amount.toString(),JSON.parse(localStorage.panicValues)),a=JSON.parse(localStorage.alertValues),r=e.base;parseFloat(t)>a[r]&&a[r]>0?createNotification(browser.i18n.getMessage("strOver"),a[r]):parseFloat(t)<o[r]&&o[r]>0&&createNotification(browser.i18n.getMessage("strUnder"),o[r])})}function setBadgeColor(e){browser.browserAction.setBadgeBackgroundColor({color:e})}function createNotification(e,t){var o=null;browser.notifications.create("price",{type:"basic",title:localStorage.targetCurrency+""+e+t,message:localStorage.targetCurrency+browser.i18n.getMessage("notifTxt")+t,iconUrl:"img/icon80.png",buttons:[{title:browser.i18n.getMessage("coinbaseBtn"),iconUrl:"img/icon.png"}]},function(e){o=e}),0!==parseFloat(localStorage.soundNotification)&&audioNotif()}function audioNotif(){new Audio("sounds/"+localStorage.soundSample+".mp3").play()}function startExtensionListeners(){browser.extension.onMessage.addListener(function(e,t,o){"resetTicker"==e.msg&&updateTicker()}),browser.notifications.onButtonClicked.addListener(function(e,t){browser.tabs.create({url:"https://www.coinbase.com/dashboard"})})}var base_config={sourceCurrency:"EUR",targetCurrency:"ETH",chartPeriod:"day",updateDelay:30,alertValues:{ETH:0,BTC:0,LTC:0},panicValues:{ETH:0,BTC:0,LTC:0},portfolioValues:{ETH:0,BTC:0,LTC:0},curs:{0:"ETH",1:"BTC",2:"LTC"},soundNotification:1,soundSample:"pop",colorChange:1,roundBadge:0,btcAmount:0,ethAmount:0,portfolio:0};window.browser=window.msBrowser||window.browser||window.chrome;var isIE=!!document.documentMode,isEdge=!isIE&&!!window.StyleMedia,isChrome=/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor),_gaq=_gaq||[];_gaq.push(["_setAccount","UA-105414043-1"]),_gaq.push(["_trackPageview"]),function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://ssl.google-analytics.com/ga.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}(),initializeConfig(base_config),updateTicker(),startExtensionListeners();