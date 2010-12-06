function dateDiff(date1, date2) {
    diff  = new Date();

    diff.setTime(Math.abs(date1.getTime() - date2.getTime()));

    timediff = diff.getTime();

    days = Math.floor(timediff / (1000 * 60 * 60 * 24));
    timediff -= days * (1000 * 60 * 60 * 24);

    hours = Math.floor(timediff / (1000 * 60 * 60));
    timediff -= hours * (1000 * 60 * 60);

    mins = Math.floor(timediff / (1000 * 60));
    timediff -= mins * (1000 * 60);

    secs = Math.floor(timediff / 1000);
    timediff -= secs * 1000;

    return {
        'days' : days,
        'hours' : hours,
        'mins' : mins,
        'secs' : secs
    };
}


Date.prototype.setISO8601 = function(dString){

    var regexp = /(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)(:)?(\d\d)(\.\d+)?(Z|([+-])(\d\d)(:)?(\d\d))/;

    if (dString.toString().match(new RegExp(regexp))) {
        var d = dString.match(new RegExp(regexp));
        var offset = 0;

        this.setUTCDate(1);
        this.setUTCFullYear(parseInt(d[1],10));
        this.setUTCMonth(parseInt(d[3],10) - 1);
        this.setUTCDate(parseInt(d[5],10));
        this.setUTCHours(parseInt(d[7],10));
        this.setUTCMinutes(parseInt(d[9],10));
        this.setUTCSeconds(parseInt(d[11],10));
        if (d[12])
            this.setUTCMilliseconds(parseFloat(d[12]) * 1000);
        else
            this.setUTCMilliseconds(0);
        if (d[13] != 'Z') {
            offset = (d[15] * 60) + parseInt(d[17],10);
            offset *= ((d[14] == '-') ? -1 : 1);
            this.setTime(this.getTime() - offset * 60 * 1000);
        }
    }
    else {
        this.setTime(Date.parse(dString));
    }
    return this;
};

function CountDown(to_time, output_id, end_callback, active_callback) {
    this.to_time = to_time;
    this.output_id = output_id;
    this.active_callback = active_callback;
    this.update = function() {
        var now = new Date();
        // now.setMinutes(now.getMinutes() + now.getTimezoneOffset());

        if (now.getTime() <= start_time.getTime()) {
            var diff = dateDiff(now, start_time);

            var text = '';
            if (diff.days > 0) {
                text += diff.days + 'd ';
            }
            if (diff.hours > 0) {
                text += diff.hours + 'h ';
            }
            if (diff.mins > 0) {
                text += diff.mins + 'm ';
            }
            text += diff.secs + 's';
            document.getElementById(this.output_id).innerHTML = text;
            this.active_callback();
            setTimeout(this.update, 1000);
        }
        else {
            self.end_callback();
        }
    };
    this.end_callback = end_callback;
    setTimeout(this.update, 0);
};