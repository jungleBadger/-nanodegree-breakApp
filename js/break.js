/**
 * Created by danielabrao on 11/26/16.
 */
(function () {
    "use strict";

    var properties = {
        "childProcess": require('child_process'),
        "intervalFrequency": 0,
        "intervalObject": "",
        "intervalControl": 0
    };
    var methods = {
        "init": function (url, intervalFrequency) {
            methods.printTime("start").setIntervalFrequency(intervalFrequency || 2 * ((60 * 60) * 1000));
            properties.intervalObject = setInterval(methods.openBrowser(url || "http://terra.com.br"), properties.intervalFrequency);
        },
        "setIntervalFrequency": function (frequency) {
            properties.intervalFrequency = frequency;
        },
        "openBrowser": function (url) {
            var self = this;
            return function () {
                if (self.checkControl()) {
                    try {
                        properties.childProcess.exec(["open -a 'Google Chrome'", url].join(" "), function () {
                            console.log("Google chrome opened");
                        });
                        self.incrementControl();
                    } catch (e) {
                        console.log(["an error ocurred:", e].join(" "));
                    }
                } else {
                    self.destroyIntervalObject();
                }
            }
        },
        "checkControl": function () {
            return properties.intervalControl < 3;
        },
        "incrementControl": function () {
            properties.intervalControl += 1;
        },
        "destroyIntervalObject": function () {
            clearInterval(properties.intervalObject);
            this.printTime("end");
        },
        "printTime": function (event) {
            if (event === "start") {
                console.log(["Starting at:", new Date()].join(" "))
            } else {
                console.log(["Finishing at:", new Date()].join(" "))
            }
            return this;
        }
    };

    methods.init();
    return module.exports = methods.init;

}());