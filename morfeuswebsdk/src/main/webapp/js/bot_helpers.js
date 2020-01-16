var botHelpers = {
      breaklines: function (descriptionFunction) {
        text = descriptionFunction;
        if (text) {
            text = text.toString();
            text = text.replace(/(\r\n|\n|\r)/gm, '<br>');

            return new Handlebars.SafeString(text);
        } else {
            return descriptionFunction;
        }
    },
    now: function () {
        var d = new Date();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
};

for (var helper in botHelpers) {
    if (botHelpers.hasOwnProperty(helper)) {
        Handlebars.registerHelper(helper, botHelpers[helper]);
    }
}