document.addEventListener("DOMContentLoaded",function(){/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor);var e=!!window.opr&&!!opr.addons||!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0,t="undefined"!=typeof InstallTrigger,n=!!document.documentMode,o=!n&&!!window.StyleMedia,r=localStorage.portfolio,a=localStorage.notifications;startListeners(),getChartValues(),togglePortfolio(r.toString()),toggleNotifications(a.toString()),updateInputValues(),updatePrices(),updatePortfolio(),changeCurrencyIcon(),analytics(),translate(),(e||t||n||o)&&hideUselessFields()}),window.browser=window.msBrowser||window.browser||window.chrome;function analytics(){_gaq=[],_gaq.push(["_setAccount","UA-105414043-1"]),_gaq.push(["_trackPageview"]),function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://ssl.google-analytics.com/ga.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}(),document.getElementById("coinbaseBtn").onclick=function(){_gaq.push(["_trackEvent","coinbaseButton","clicked"])}.bind(this),document.getElementById("settingsBtn").onclick=function(){browser.tabs.create({url:"options.html"}),_gaq.push(["_trackEvent","settingsButton","clicked"])}.bind(this),document.getElementById("donateBtn").onclick=function(){browser.tabs.create({url:"donate.html"}),_gaq.push(["_trackEvent","donateButton","clicked"])}.bind(this)}function startListeners(){document.querySelector('select[name="chartPeriod"]').onchange=function(e){this.blur(),updateChartPeriod(e)},document.querySelector('input[name="targetPrice"]').onchange=updateAlertValue,document.querySelector('input[name="panicValue"]').onchange=updatePanicValue,document.querySelector('input[name="portfolioSum"]').onchange=updatePortfolioValues,document.querySelector('th[name="ico"').onclick=rollCurrency,document.querySelector('input[name="targetPrice"]').onkeypress=function(e){e||(e=window.event);if(13==(e.keyCode||e.which))return this.blur(),updateAlertValue(e),!1},document.querySelector('input[name="panicValue"]').onkeypress=function(e){e||(e=window.event);if("13"==(e.keyCode||e.which))return this.blur(),updatePanicValue(e),!1},document.getElementById("settingsBtn").onclick=function(){browser.tabs.create({url:"options.html"})}}function changeCurrencyIcon(){"ETH"===localStorage.targetCurrency?(document.querySelector('img[name="currIco"]').src="img/eth16.png",document.querySelector('img[name="currIco2"]').src="img/eth16.png"):"BTC"===localStorage.targetCurrency?(document.querySelector('img[name="currIco"]').src="img/btc16.png",document.querySelector('img[name="currIco2"]').src="img/btc16.png"):"LTC"===localStorage.targetCurrency?(document.querySelector('img[name="currIco"]').src="img/ltc16.png",document.querySelector('img[name="currIco2"]').src="img/ltc16.png"):"BCH"===localStorage.targetCurrency&&(document.querySelector('img[name="currIco"]').src="img/bch16.png",document.querySelector('img[name="currIco2"]').src="img/bch16.png")}function rollCurrency(){var e=["BTC","ETH","LTC","BCH"],t=e.indexOf(localStorage.targetCurrency)+1;t>3&&(t=0),localStorage.targetCurrency=e[t],changeCurrencyIcon(),updatePrices(),getChartValues(),updateInputValues()}function updateInputValues(){if(1===parseInt(localStorage.notifications)){var e=JSON.parse(localStorage.panicValues),t=JSON.parse(localStorage.alertValues);document.querySelector('input[name="targetPrice"]').value=t[localStorage.targetCurrency],document.querySelector('input[name="panicValue"]').value=e[localStorage.targetCurrency],console.log("update")}var n=JSON.parse(localStorage.portfolioValues);document.querySelector('select[name="chartPeriod"]').value=localStorage.chartPeriod,document.getElementById("tabletitle").innerHTML=localStorage.targetCurrency+" to "+localStorage.sourceCurrency,document.querySelector('input[name="portfolioSum"]').value=n[localStorage.targetCurrency]}function getJSON(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.onload=function(){if(n.status>=200&&n.status<400){var e=JSON.parse(n.responseText);t(e,n)}},n.onerror=function(){document.getElementById("priceNumbers").style.visibility="hidden",document.getElementById("error").style.visibility="visible"},n.send()}function updatePrices(){var e,t="https://api.coinbase.com/v2/prices/"+localStorage.targetCurrency+"-"+localStorage.sourceCurrency+"/";getJSON(t+"spot",function(t){document.getElementById("priceNumbers").style.visibility="visible",document.getElementById("error").style.visibility="hidden",e=t.data.amount.toString(),localStorage.lastSpot=t.data.amount,t.data.amount;document.getElementById("priceRate").innerHTML=e.toString(),updatePortfolio()}),getJSON(t+"buy",function(t){e=t.data.amount.toString(),t.data.amount;document.getElementById("priceBuy").innerHTML=e.toString()}),getJSON(t+"sell",function(t){e=t.data.amount.toString(),t.data.amount;document.getElementById("priceSell").innerHTML=e.toString()})}function getChartValues(){var e=0,t="",n=0;switch(localStorage.chartPeriod){case"hour":e=60,t="minute",n=0;break;case"day":e=96,t="minute",n=15;break;case"week":e=84,t="hour",n=2;break;case"month":e=90,t="hour",n=8;break;case"year":e=122,t="day",n=3;break;default:e=60,t="minute",n=0}var o=[];getJSON("https://min-api.cryptocompare.com/data/histo"+t+"?fsym="+localStorage.targetCurrency+"&tsym="+localStorage.sourceCurrency+"&limit="+e+"&aggregate="+n+"&useBTC=false",function(t,n){if("Error"==n.Response)return console.log("No chart data for this currency"),void(document.getElementById("chart").style.display="none");for(var r=0;r<t.Data.length;r++)o.push({x:r*(200/e),y:(t.Data[r].close+t.Data[r].open)/2});buildChart(o);var a=t.Data.length-1,i=(t.Data[0].close+t.Data[0].open)/2,c=100*((t.Data[a].close+t.Data[a].open)/2)/i-100,l=c>0?"+":"",s=c>0?"#2B8F28":"#FF4143";document.querySelector("#changeValue").innerHTML=l+c.toFixed(2)+"%",document.querySelector("#changeValue").style.color=s})}function buildChart(e){var t=document.getElementById("chartCanvas");"undefined"!=typeof priceChart&&priceChart.destroy(),priceChart=new Chart(t,{type:"line",data:{datasets:[{label:"price",fill:!1,data:e,pointRadius:0,borderWidth:2,borderColor:"#2B71B1",lineTension:.1}]},options:{legend:{display:!1},tooltips:{enabled:!1},scales:{xAxes:[{display:!1,type:"linear",position:"bottom"}]},hover:{}}},{lineAtIndex:2})}function updateAlertValue(e){var t=JSON.parse(localStorage.alertValues);t[localStorage.targetCurrency]=e.target.value,localStorage.alertValues=JSON.stringify(t)}function updatePanicValue(e){var t=JSON.parse(localStorage.panicValues);t[localStorage.targetCurrency]=e.target.value,localStorage.panicValues=JSON.stringify(t)}function updatePortfolio(){var e=JSON.parse(localStorage.portfolioValues)[localStorage.targetCurrency];document.getElementById("cryptoConversion").innerHTML=(e*localStorage.lastSpot).toFixed(2)+" "+localStorage.sourceCurrency}function updatePortfolioValues(e){var t=JSON.parse(localStorage.portfolioValues);t[localStorage.targetCurrency]=e.target.value,localStorage.portfolioValues=JSON.stringify(t),updatePortfolio()}function togglePortfolio(e){switch(e){case"0":document.getElementById("portfolio").style.visibility="hidden",document.getElementById("portfolio").style.height="0px",document.getElementById("portfolio").style.marginTop="0px",document.getElementById("portfolio").style.padding="0px",document.getElementById("portfolio").style.display="none";break;case"1":document.getElementById("portfolio").style.visibility="visible",document.getElementById("portfolio").style.height="auto",document.getElementById("portfolio").style.marginTop="5px";break;default:console.log("error",e)}}function toggleNotifications(e){switch(e){case"0":document.getElementById("limitOptions").style.visibility="hidden",document.getElementById("limitOptions").style.height="0px",document.getElementById("limitOptions").style.marginTop="0px",document.getElementById("limitOptions").style.padding="0px",document.getElementById("limitOptions").style.display="none";break;case"1":document.getElementById("limitOptions").style.visibility="visible",document.getElementById("limitOptions").style.height="auto",document.getElementById("limitOptions").style.marginTop="5px";break;default:console.log("error",e)}}function translate(){document.getElementById("strSpotrate").innerHTML=browser.i18n.getMessage("strSpotrate"),document.getElementById("strBuyPrice").innerHTML=browser.i18n.getMessage("strBuyPrice"),document.getElementById("strSellPrice").innerHTML=browser.i18n.getMessage("strSellPrice"),document.getElementById("strTargetPrice").innerHTML=browser.i18n.getMessage("strTargetPrice"),document.getElementById("strPanicPrice").innerHTML=browser.i18n.getMessage("strPanicPrice"),document.getElementById("strHour").innerHTML=browser.i18n.getMessage("strHour"),document.getElementById("strDay").innerHTML=browser.i18n.getMessage("strDay"),document.getElementById("strWeek").innerHTML=browser.i18n.getMessage("strWeek"),document.getElementById("strMonth").innerHTML=browser.i18n.getMessage("strMonth"),document.getElementById("strYear").innerHTML=browser.i18n.getMessage("strYear"),document.getElementById("coinbaseBtn").innerHTML=browser.i18n.getMessage("coinbaseBtn"),document.getElementById("settingsBtn").innerHTML=browser.i18n.getMessage("settingsBtn"),document.getElementById("strLast").innerHTML=browser.i18n.getMessage("strLast")}function hideUselessFields(){document.querySelector('div[id="limitOptions"]').style.visibility="hidden",document.querySelector('div[id="limitOptions"]').style.height="0px"}function updateChartPeriod(e){localStorage.chartPeriod=e.target.value,getChartValues()}