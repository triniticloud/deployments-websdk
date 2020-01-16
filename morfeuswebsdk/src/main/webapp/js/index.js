$(function() {

    var customerId = "";
    var appSessionToken = "";
    var initAndShow = "0";
    var showInWebview = "0";
    var hostname = "https://" + "morfeus-dev.active.ai";
    var endpointUrl = hostname + "/morfeus/v1/channels";

    var desktop = {
        "chatWindowHeight": "90%",
        "chatWindowWidth": "30%",
        "chatWindowRight": "20px",
        "chatWindowBottom": "20px",
        "webviewSize": "full"
    };
f
    var initParam = {
        "customerId": customerId,
        "desktop": desktop,
        "initAndShow": "1",
        "showInWebview": "0",
        "endpointUrl": endpointUrl,
        "dualMode": "0",
        "debugMode": "1",
        "botId": "1w20156865775",
        "domain": hostname,
        "baseSdkPath": hostname + '/morfeuswebsdk2/libs/websdk/',
        "botName": "default",
        "idleTimeout": 162000,
        "destroyOnClose": true,
        "apiKey": "1234567",
        "timeout": 1000 * 25,
        "enableEmoji": true,
        "emoji": [
            ["&#x1F642", "&#x1F604", "&#x1F60E", "&#x1F609", "&#x1F621", "&#x1F61F"],
            ["&#x1F622", "&#x1F44C", "&#x1F44D", "&#x270C", "&#x1F44F"]
        ],
        "autoSuggestConfig": {
            "enabled": true,
            "noOfSuggestion": 3,
            "noOfLetters": 2,
            "enableSearchRequest": true
        },
        "customNegativeFeedback": {
            "enabled": true
        },
        "quickTags": {
            "enabled": true,
            "overrideDefaultTags": false,
            "tags": ['Transfer', 'Pay Bills', 'Account Balance', 'Find ATM near Bangalore']
        },
        "autoSuggestConfig" : {
            "enableSearchRequest" : true,
            "enabled" : true,
            " noOfLetters" : 3
        },
        "enableSlimScroll": true,
        "focusOnQuery": true,
        "sdkType": "w",
        "i18nSupport" : {
            "enabled" : true,
            "langCode" : "en"
        },
        "chatButtonConfig": {
            footer: "How may i help you?"
        }
    }

    window.options = initParam;
    websdk.initialize(initParam);

});
