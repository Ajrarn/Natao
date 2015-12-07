(function () {
    "use strict";

    var fs = require('fs');

    const fileName = 'NataoSetting.json';
    const dbName = 'Natao.db';

    angular
        .module('Natao')
        .service('SettingsService', SettingsService)
        .run(run);

    //Start of the service
    function run() {
        console.log('run');
    }


    //Service itself
    function SettingsService() {
        console.log('SettingsService');

        var self = this;

        self.fileExist = function() {
            return fs.existsSync(fileName);
        };

        self.init = function() {
            if (self.fileExist()) {
                var data = fs.readFileSync(fileName,self.settings);
                try {
                    self.settings = JSON.parse(data);
                }
                catch (err) {
                    console.log('There has been an error parsing your JSON.');
                    console.log(err);
                }
            } else {
                console.log('No setting file yet.');
                self.settings = {};
            }
        };

        self.setPathFile = function(path) {
            if (!self.settings) self.settings = {};
            self.settings.databaseFile = path + '/' + dbName;
        };

        self.save = function() {
            fs.writeFile('NataoSetting.json',JSON.stringify(self.settings));
        };

        return self;


    }

}());