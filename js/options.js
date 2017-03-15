document.addEventListener('DOMContentLoaded', function () {
    populateCurrencies();
    startListeners();
    translate();
});

function updateValues(){
    document.querySelector('input[name="alertValue"]').value = localStorage.alertValue;
    document.querySelector('input[name="panicValue"]').value = localStorage.panicValue;
    document.querySelector('input[name="refreshDelay"]').value = localStorage.delay / 1000;
    document.querySelector('select[name="currency"]').value = localStorage.sourceCurrency;
    document.querySelector('select[name="crypto"]').value = localStorage.targetCurrency;
    // document.querySelector('input[name="soundToggle"]').checked = (localStorage.soundNotification == 1) ? true : false;
    document.querySelector('input[name="colorChange"]').checked = (localStorage.colorChange == 1) ? true : false;
    document.querySelector('select[name="soundSample"]').value = localStorage.soundSample;
    document.querySelector('input[name="roundBadge"]').checked = (localStorage.roundBadge == 1) ? true : false;
    // document.querySelector('input[name="btcAmount"]').value = localStorage.btcAmount;
    // document.querySelector('input[name="ethAmount"]').value = localStorage.ethAmount;
}

function startListeners(){
    document.querySelector('select[name="currency"]').onchange = updateCurrency;
    document.querySelector('select[name="crypto"]').onchange = updateCrypto;
    document.querySelector('select[name="soundSample"]').onchange = updateSoundSample;
    document.querySelector('input[name="refreshDelay"]').onchange = updateDelay;
    document.querySelector('input[name="alertValue"]').onchange = updateAlertValue;
    document.querySelector('input[name="panicValue"]').onchange = updatePanicValue;
    // document.querySelector('input[name="soundToggle"]').onclick = toggleNotificationSound;
    document.querySelector('input[name="colorChange"]').onclick = toggleColorChange;
    document.querySelector('input[name="roundBadge"]').onclick = toggleRoundBadge;
    document.getElementById("save").addEventListener("click", saveAndApply);
    // document.querySelector('input[name="btcAmount"]').onchange = updateBtcAmount;
    // document.querySelector('input[name="ethAmount"]').onchange = updateEthAmount;
}

function populateCurrencies(){
    jQuery.getJSON(
        "https://api.coinbase.com/v2/currencies",
        function (data, txtStatus, xhr) {
            select = document.querySelector('select[name="currency"]');
            for(var i = 0; i < data.data.length; i++){
                var opt = document.createElement('option');
                opt.value = data.data[i].id;
                opt.innerHTML = data.data[i].name;
                select.appendChild(opt);
            }

            updateValues();
        }
    );
}

function updateCurrency(event){
    localStorage.sourceCurrency = event.target.value;
}

function updateCrypto(event){
    localStorage.targetCurrency = event.target.value;
}

function updateDelay(event){
    var value = (event.target.value < 1) ? 1 : event.target.value;
    localStorage.delay = value * 1000;
}

function updateAlertValue(event){
    localStorage.alertValue = event.target.value;
}

function updatePanicValue(event){
    localStorage.panicValue = event.target.value;
}

/*chrome.i18n.getUILanguage = function(){
    console.log("easy");
    return localStorage.lang;
};*/

/*chrome.i18n.getMessage = function(str){
    console.log("easy?");
    return str;
};*/

function translate(){

    document.getElementById("strOptions").innerHTML = chrome.i18n.getMessage("strOptions");
    document.getElementById("strCurrency").innerHTML = chrome.i18n.getMessage("strCurrency");
    document.getElementById("strCrypto").innerHTML = chrome.i18n.getMessage("strCrypto");
    document.getElementById("strDelay").innerHTML = chrome.i18n.getMessage("strDelay");
    document.getElementById("strTargetPrice").innerHTML = chrome.i18n.getMessage("strTargetPrice");
    document.getElementById("strPanicPrice").innerHTML = chrome.i18n.getMessage("strPanicPrice");
    document.getElementById("strColorChange").innerHTML = chrome.i18n.getMessage("strColorChange");
    document.getElementById("strSound").innerHTML = chrome.i18n.getMessage("strSound");
    document.getElementById("strRound").innerHTML = chrome.i18n.getMessage("strRound");
    document.getElementById("save").innerHTML = chrome.i18n.getMessage("strSave");
    document.getElementById("strDonations").innerHTML = chrome.i18n.getMessage("strDonations");
    document.getElementById("strDonationsTxt").innerHTML = chrome.i18n.getMessage("strDonationsTxt");
    document.getElementById("strSeconds").innerHTML = chrome.i18n.getMessage("strSeconds");

}



// function toggleNotificationSound(event){
//     if(event.target.checked === true){
//         localStorage.soundNotification = 1;
//         var notif = new Audio("sounds/"+ localStorage.soundSample +".mp3");
//         notif.play();
//     } else{
//         localStorage.soundNotification = 0;
//     }
// }

function toggleColorChange(event){
    localStorage.colorChange = (event.target.checked === true) ? 1 : 0;
}

function updateSoundSample(event){
    if(event.target.value == "mute"){
        localStorage.soundNotification = 0;
    } else{
        localStorage.soundNotification = 1;
        localStorage.soundSample = event.target.value;
        var sound = new Audio("sounds/"+ event.target.value +".mp3");
        sound.play();
    }
}

function toggleRoundBadge(event){
    localStorage.roundBadge = (event.target.checked === true) ? 1 : 0;
    chrome.extension.sendMessage({msg: "resetTicker"});
}

function saveAndApply(){
    chrome.extension.sendMessage({msg: "resetTicker"});
}
