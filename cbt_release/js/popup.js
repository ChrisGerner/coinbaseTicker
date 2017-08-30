function analytics(){_gaq=[],_gaq.push(["_setAccount","UA-105414043-1"]),_gaq.push(["_trackPageview"]),function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://ssl.google-analytics.com/ga.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}(),document.getElementById("coinbaseBtn").onclick=function(){_gaq.push(["_trackEvent","coinbaseButton","clicked"])}.bind(this),document.getElementById("settingsBtn").onclick=function(){_gaq.push(["_trackEvent","settingsButton","clicked"])}.bind(this),document.getElementById("donateBtn").onclick=function(){_gaq.push(["_trackEvent","donateButton","clicked"])}.bind(this)}function startListeners(){document.querySelector('select[name="chartPeriod"]').onchange=function(e){this.blur(),updateChartPeriod(e)},document.querySelector('input[name="targetPrice"]').onchange=updateAlertValue,document.querySelector('input[name="panicValue"]').onchange=updatePanicValue,document.querySelector('th[name="ico"').onclick=rollCurrency,document.querySelector('input[name="targetPrice"]').onkeypress=function(e){if(e||(e=window.event),13==(e.keyCode||e.which))return this.blur(),updateAlertValue(e),!1},document.querySelector('input[name="panicValue"]').onkeypress=function(e){if(e||(e=window.event),"13"==(e.keyCode||e.which))return this.blur(),updatePanicValue(e),!1}}function changeCurrencyIcon(){"ETH"===localStorage.targetCurrency?document.querySelector('img[name="currIco"]').src="img/eth16.png":"BTC"===localStorage.targetCurrency?document.querySelector('img[name="currIco"]').src="img/btc16.png":document.querySelector('img[name="currIco"]').src="img/ltc16.png"}function rollCurrency(){var e=["BTC","ETH","LTC"],t=e.indexOf(localStorage.targetCurrency)+1;t>2&&(t=0),localStorage.targetCurrency=e[t],changeCurrencyIcon(),updatePrices(),getChartValues(),updateInputValues()}function updateInputValues(){document.querySelector('select[name="chartPeriod"]').value=localStorage.chartPeriod,document.getElementById("tabletitle").innerHTML=localStorage.targetCurrency+" to "+localStorage.sourceCurrency,document.querySelector('input[name="targetPrice"]').value=localStorage.alertValue,document.querySelector('input[name="panicValue"]').value=localStorage.panicValue}function getJSON(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.onload=function(){if(n.status>=200&&n.status<400){var e=JSON.parse(n.responseText);t(e,n)}},n.onerror=function(){document.getElementById("priceNumbers").style.visibility="hidden",document.getElementById("error").style.visibility="visible"},n.send()}function updatePrices(){var e,t,n="https://api.coinbase.com/v2/prices/"+localStorage.targetCurrency+"-"+localStorage.sourceCurrency+"/";getJSON(n+"spot",function(n){document.getElementById("priceNumbers").style.visibility="visible",document.getElementById("error").style.visibility="hidden",e=n.data.amount.toString(),t=n.data.amount,document.getElementById("priceRate").innerHTML=e.toString()}),getJSON(n+"buy",function(n){e=n.data.amount.toString(),t=n.data.amount,document.getElementById("priceBuy").innerHTML=e.toString()}),getJSON(n+"sell",function(n){e=n.data.amount.toString(),t=n.data.amount,document.getElementById("priceSell").innerHTML=e.toString()})}function getChartValues(){var e=0,t="",n=0;switch(localStorage.chartPeriod){case"hour":e=60,t="minute",n=0;break;case"day":e=96,t="minute",n=15;break;case"week":e=84,t="hour",n=2;break;case"month":e=90,t="hour",n=8;break;case"year":e=122,t="day",n=3;break;default:e=60,t="minute",n=0}var r=[];getJSON("https://min-api.cryptocompare.com/data/histo"+t+"?fsym="+localStorage.targetCurrency+"&tsym="+localStorage.sourceCurrency+"&limit="+e+"&aggregate="+n+"&useBTC=false",function(t,n){if("Error"==n.Response)return console.log("No chart data for this currency"),void(document.getElementById("chart").style.display="none");for(var a=0;a<t.Data.length;a++)r.push({x:a*(200/e),y:(t.Data[a].close+t.Data[a].open)/2});buildChart(r);var c=t.Data.length-1,o=(t.Data[0].close+t.Data[0].open)/2,i=100*((t.Data[c].close+t.Data[c].open)/2)/o-100,u=i>0?"+":"-",l=i>0?"#2B8F28":"#FF4143";document.querySelector("#changeValue").innerHTML=u+i.toFixed(2)+"%",document.querySelector("#changeValue").style.color=l})}function buildChart(e){var t=document.getElementById("chartCanvas");"undefined"!=typeof priceChart&&priceChart.destroy(),priceChart=new Chart(t,{type:"line",data:{datasets:[{label:"price",fill:!1,data:e,pointRadius:0,borderWidth:2,borderColor:"#2B71B1",lineTension:.1}]},options:{legend:{display:!1},tooltips:{enabled:!1},scales:{xAxes:[{display:!1,type:"linear",position:"bottom"}]},hover:{}}},{lineAtIndex:2})}function updateAlertValue(e){localStorage.alertValue=e.target.value}function updatePanicValue(e){localStorage.panicValue=e.target.value}function translate(){document.getElementById("strSpotrate").innerHTML=chrome.i18n.getMessage("strSpotrate"),document.getElementById("strBuyPrice").innerHTML=chrome.i18n.getMessage("strBuyPrice"),document.getElementById("strSellPrice").innerHTML=chrome.i18n.getMessage("strSellPrice"),document.getElementById("strTargetPrice").innerHTML=chrome.i18n.getMessage("strTargetPrice"),document.getElementById("strPanicPrice").innerHTML=chrome.i18n.getMessage("strPanicPrice"),document.getElementById("strHour").innerHTML=chrome.i18n.getMessage("strHour"),document.getElementById("strDay").innerHTML=chrome.i18n.getMessage("strDay"),document.getElementById("strWeek").innerHTML=chrome.i18n.getMessage("strWeek"),document.getElementById("strMonth").innerHTML=chrome.i18n.getMessage("strMonth"),document.getElementById("strYear").innerHTML=chrome.i18n.getMessage("strYear"),document.getElementById("coinbaseBtn").innerHTML=chrome.i18n.getMessage("coinbaseBtn"),document.getElementById("settingsBtn").innerHTML=chrome.i18n.getMessage("settingsBtn"),document.getElementById("strLast").innerHTML=chrome.i18n.getMessage("strLast")}function updateChartPeriod(e){localStorage.chartPeriod=e.target.value,getChartValues()}document.addEventListener("DOMContentLoaded",function(){startListeners(),updateInputValues(),updatePrices(),changeCurrencyIcon(),getChartValues(),analytics(),translate()});