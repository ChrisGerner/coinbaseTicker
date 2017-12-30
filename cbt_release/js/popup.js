function analytics(){_gaq=[],_gaq.push(["_setAccount","UA-105414043-1"]),_gaq.push(["_trackPageview"]),function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://ssl.google-analytics.com/ga.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}(),document.getElementById("coinbaseBtn").onclick=function(){_gaq.push(["_trackEvent","coinbaseButton","clicked"])}.bind(this),document.getElementById("settingsBtn").onclick=function(){browser.tabs.create({url:"options.html"}),_gaq.push(["_trackEvent","settingsButton","clicked"])}.bind(this),document.getElementById("donateBtn").onclick=function(){browser.tabs.create({url:"donate.html"}),_gaq.push(["_trackEvent","donateButton","clicked"])}.bind(this)}function startListeners(){document.querySelector('select[name="chartPeriod"]').onchange=function(e){this.blur(),updateChartPeriod(e)},document.querySelector('input[name="targetPrice"]').onchange=updateAlertValue,document.querySelector('input[name="panicValue"]').onchange=updatePanicValue,document.querySelector('input[name="portfolioSum"]').onchange=updatePortfolioValues,document.querySelector('th[name="ico"').onclick=rollCurrency,document.querySelector('input[name="targetPrice"]').onkeypress=function(e){if(e||(e=window.event),13==(e.keyCode||e.which))return this.blur(),updateAlertValue(e),!1},document.querySelector('input[name="panicValue"]').onkeypress=function(e){if(e||(e=window.event),"13"==(e.keyCode||e.which))return this.blur(),updatePanicValue(e),!1},document.getElementById("settingsBtn").onclick=function(){browser.tabs.create({url:"options.html"})}}function changeCurrencyIcon(){"ETH"===localStorage.targetCurrency?(document.querySelector('img[name="currIco"]').src="img/eth16.png",document.querySelector('img[name="currIco2"]').src="img/eth16.png"):"BTC"===localStorage.targetCurrency?(document.querySelector('img[name="currIco"]').src="img/btc16.png",document.querySelector('img[name="currIco2"]').src="img/btc16.png"):"LTC"===localStorage.targetCurrency?(document.querySelector('img[name="currIco"]').src="img/ltc16.png",document.querySelector('img[name="currIco2"]').src="img/ltc16.png"):"BCH"===localStorage.targetCurrency&&(document.querySelector('img[name="currIco"]').src="img/bch16.png",document.querySelector('img[name="currIco2"]').src="img/bch16.png")}function rollCurrency(){var e=["BTC","ETH","LTC","BCH"],t=e.indexOf(localStorage.targetCurrency)+1;t>3&&(t=0),localStorage.targetCurrency=e[t],changeCurrencyIcon(),updatePrices(!0),getChartValues(!0),updateInputValues()}function updateInputValues(){if(1===parseInt(localStorage.notifications)){var e=JSON.parse(localStorage.panicValues),t=JSON.parse(localStorage.alertValues);document.querySelector('input[name="targetPrice"]').value=t[localStorage.targetCurrency],document.querySelector('input[name="panicValue"]').value=e[localStorage.targetCurrency],console.log("update")}var o=JSON.parse(localStorage.portfolioValues);document.querySelector('select[name="chartPeriod"]').value=localStorage.chartPeriod,document.getElementById("tabletitle").innerHTML=localStorage.targetCurrency+" to "+localStorage.sourceCurrency,document.querySelector('input[name="portfolioSum"]').value=o[localStorage.targetCurrency]}function getJSON(e,t){var o=new XMLHttpRequest;o.open("GET",e,!0),o.onload=function(){if(o.status>=200&&o.status<400){var e=JSON.parse(o.responseText);t(e,o)}},o.onerror=function(){document.getElementById("priceNumbers").style.visibility="hidden",document.getElementById("error").style.visibility="visible"},o.send()}function updatePrices(e){if(e){console.log("force");var t,o,n="https://api.coinbase.com/v2/prices/"+localStorage.targetCurrency+"-"+localStorage.sourceCurrency+"/";getJSON(n+"spot",function(e){document.getElementById("priceNumbers").style.visibility="visible",document.getElementById("error").style.visibility="hidden",t=e.data.amount.toString(),localStorage.lastSpot=e.data.amount,o=e.data.amount,document.getElementById("priceRate").innerHTML=t.toString(),updatePortfolio()}),getJSON(n+"buy",function(e){t=e.data.amount.toString(),o=e.data.amount,document.getElementById("priceBuy").innerHTML=t.toString()}),getJSON(n+"sell",function(e){t=e.data.amount.toString(),o=e.data.amount,document.getElementById("priceSell").innerHTML=t.toString()})}else console.log("no force"),document.getElementById("priceRate").innerHTML=localStorage.lastPrice,document.getElementById("priceBuy").innerHTML=localStorage.buyPrice,document.getElementById("priceSell").innerHTML=localStorage.sellPrice}function getChartValues(e){if(e){var t=0,o="",n=0;switch(localStorage.chartPeriod){case"hour":t=60,o="minute",n=0;break;case"day":t=96,o="minute",n=15;break;case"week":t=84,o="hour",n=2;break;case"month":t=90,o="hour",n=8;break;case"year":t=122,o="day",n=3;break;default:t=60,o="minute",n=0}r=[];getJSON("https://min-api.cryptocompare.com/data/histo"+o+"?fsym="+localStorage.targetCurrency+"&tsym="+localStorage.sourceCurrency+"&limit="+t+"&aggregate="+n+"&useBTC=false",function(e,o){if("Error"==o.Response)return console.log("No chart data for this currency"),void(document.getElementById("chart").style.display="none");for(var n=0;n<e.Data.length;n++)r.push({x:n*(200/t),y:(e.Data[n].close+e.Data[n].open)/2});buildChart(r);var a=e.Data.length-1,i=(e.Data[0].close+e.Data[0].open)/2,l=100*((e.Data[a].close+e.Data[a].open)/2)/i-100,c=l>0?"+":"",s=l>0?"#2B8F28":"#FF4143";document.querySelector("#changeValue").innerHTML=c+l.toFixed(2)+"%",document.querySelector("#changeValue").style.color=s})}else{var r=JSON.parse(localStorage.chartsData);console.log(r),buildChart(r)}}function buildChart(e){var t=document.getElementById("chartCanvas");"undefined"!=typeof priceChart&&priceChart.destroy(),priceChart=new Chart(t,{type:"line",data:{datasets:[{label:"price",fill:!1,data:e,pointRadius:0,borderWidth:2,borderColor:"#2B71B1",lineTension:.1}]},options:{legend:{display:!1},tooltips:{enabled:!1},scales:{xAxes:[{display:!1,type:"linear",position:"bottom"}]},hover:{}}},{lineAtIndex:2})}function updateAlertValue(e){var t=JSON.parse(localStorage.alertValues);t[localStorage.targetCurrency]=e.target.value,localStorage.alertValues=JSON.stringify(t)}function updatePanicValue(e){var t=JSON.parse(localStorage.panicValues);t[localStorage.targetCurrency]=e.target.value,localStorage.panicValues=JSON.stringify(t)}function updatePortfolio(){var e=JSON.parse(localStorage.portfolioValues)[localStorage.targetCurrency];document.getElementById("cryptoConversion").innerHTML=(e*localStorage.lastSpot).toFixed(2)+" "+localStorage.sourceCurrency}function updatePortfolioValues(e){var t=JSON.parse(localStorage.portfolioValues);t[localStorage.targetCurrency]=e.target.value,localStorage.portfolioValues=JSON.stringify(t),updatePortfolio()}function togglePortfolio(e){switch(e){case"0":document.getElementById("portfolio").style.visibility="hidden",document.getElementById("portfolio").style.height="0px",document.getElementById("portfolio").style.marginTop="0px",document.getElementById("portfolio").style.padding="0px",document.getElementById("portfolio").style.display="none";break;case"1":document.getElementById("portfolio").style.visibility="visible",document.getElementById("portfolio").style.height="auto",document.getElementById("portfolio").style.marginTop="5px";break;default:console.log("error",e)}}function toggleNotifications(e){switch(e){case"0":document.getElementById("limitOptions").style.visibility="hidden",document.getElementById("limitOptions").style.height="0px",document.getElementById("limitOptions").style.marginTop="0px",document.getElementById("limitOptions").style.padding="0px",document.getElementById("limitOptions").style.display="none";break;case"1":document.getElementById("limitOptions").style.visibility="visible",document.getElementById("limitOptions").style.height="auto",document.getElementById("limitOptions").style.marginTop="5px";break;default:console.log("error",e)}}function translate(){document.getElementById("strSpotrate").innerHTML=browser.i18n.getMessage("strSpotrate"),document.getElementById("strBuyPrice").innerHTML=browser.i18n.getMessage("strBuyPrice"),document.getElementById("strSellPrice").innerHTML=browser.i18n.getMessage("strSellPrice"),document.getElementById("strTargetPrice").innerHTML=browser.i18n.getMessage("strTargetPrice"),document.getElementById("strPanicPrice").innerHTML=browser.i18n.getMessage("strPanicPrice"),document.getElementById("strHour").innerHTML=browser.i18n.getMessage("strHour"),document.getElementById("strDay").innerHTML=browser.i18n.getMessage("strDay"),document.getElementById("strWeek").innerHTML=browser.i18n.getMessage("strWeek"),document.getElementById("strMonth").innerHTML=browser.i18n.getMessage("strMonth"),document.getElementById("strYear").innerHTML=browser.i18n.getMessage("strYear"),document.getElementById("coinbaseBtn").innerHTML=browser.i18n.getMessage("coinbaseBtn"),document.getElementById("settingsBtn").innerHTML=browser.i18n.getMessage("settingsBtn"),document.getElementById("strLast").innerHTML=browser.i18n.getMessage("strLast")}function hideUselessFields(){document.querySelector('div[id="limitOptions"]').style.visibility="hidden",document.querySelector('div[id="limitOptions"]').style.height="0px"}function updateChartPeriod(e){localStorage.chartPeriod=e.target.value,getChartValues(!0)}document.addEventListener("DOMContentLoaded",function(){/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor);var e=!!window.opr&&!!opr.addons||!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0,t="undefined"!=typeof InstallTrigger,o=!!document.documentMode,n=!o&&!!window.StyleMedia,r=localStorage.portfolio,a=localStorage.notifications;startListeners(),getChartValues(!1),togglePortfolio(r.toString()),toggleNotifications(a.toString()),updateInputValues(),updatePrices(!1),updatePortfolio(),changeCurrencyIcon(),analytics(),translate(),(e||t||o||n)&&hideUselessFields()}),window.browser=window.msBrowser||window.browser||window.chrome;