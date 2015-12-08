(function () {
    "use strict";

    var fs = require('fs')
        ,path = require('path')
        ,Datastore = require('nedb');

    angular
        .module('Natao')
        .service('DatabaseService', DatabaseService)
        .run(run);

    //Start of the service
    function run() {
        console.log('run');
    }


    //Service itself
    function DatabaseService() {
        console.log('DatabaseService');

        var self = this;
        var myConfig;

        var data = fs.readFileSync('myConfig.json',myConfig);
        try {
            myConfig = JSON.parse(data);
            console.log('DataFile',myConfig);
            //var db = new Datastore({ filename: path.join(require('nw.gui').App.dataPath, myConfig.databaseFile) });
            var db = new Datastore({ filename: myConfig.databaseFile, autoload:true});
            console.log('db',db);
            var schoolLevel = {
                level:'6ème',
                subjects: {
                    subject: 'Français',
                    subSubject: ['Grammaire','Conjugaison','Orthographe']
                }
            }

            db.insert(schoolLevel, function(err,newDoc) {
                if (err) {
                    console.log(err);
                }
                schoolLevel = newDoc;
                console.log('schoolLevel',schoolLevel);
            });
        }
        catch (err) {
            console.log('There has been an error parsing your JSON.')
            console.log(err);
        }







        return self;


    }

}());