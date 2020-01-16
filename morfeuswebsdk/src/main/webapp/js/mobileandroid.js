(function() {

    var customerId = "";
    var appSessionToken = "";
    var initAndShow = "1";
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

    var initParam = {
        "customerId": customerId,
        "desktop": desktop,
        "initAndShow": "1",
        "showInWebview": "1",
        "endpointUrl": endpointUrl,
        "dualMode": "0",
        "debugMode": "0",
        "botId": "162ha94093198148",
        "domain": hostname,
        "baseSdkPath": hostname + '/morfeuswebsdk2/libs/websdk/',
        "botName": "default",
        "idleTimeout": 162000,
        "destroyOnClose": false,
        "apiKey": "1234567",
        "timeout": 1000 * 25,
        "autoSuggestConfig": {
            "enabled": true,
            "noOfSuggestion": 3,
            "noOfLetters": 2,
            "enableSearchRequest": true
        },
        "isAllFeedbackAvailable": true,
        "customNegativeFeedback": {
            "enabled": true
        },
        "showCrossOnPostlogin": true,
        "quickTags": {
            "enabled": true,
            "overrideDefaultTags": false,
            "tags": ['Order Cheque Book', 'Manage Debit Card', 'Transfer', 'Pay Bills', 'Account Balance', 'Recharge Mobile']
        },
        "listDataConfig": {
            "enabled": true,
            "listDataMsg": "Your bank Account"
        },
        "sdkType": "a",
        "preWebsdkRender" : true
    }

    window.options = initParam;
    websdk.initialize(initParam);

})()