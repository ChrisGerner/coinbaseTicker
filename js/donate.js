function translate(){

    document.getElementById("strDonations").innerHTML = chrome.i18n.getMessage("strDonations");
    document.getElementById("strDonationsTxt").innerHTML = chrome.i18n.getMessage("strDonationsTxt");

}

translate();