(function () {
    "use strict";

    angular
        .module('Natao')
        .service('ColorPickerService', ColorPickerService)
        .run(run);

    //Start of the service
    function run() {
        console.log('run');
    }



    function ColorPickerService() {
        console.log('ColorPickerService');
        
        var self = this;

        // options for the color Picker
        self.optionsColumn = {
            columns: 4,
            roundCorners: true
        };

        self.customColors = ['#7bd148', '#5484ed', '#a4bdfc', '#46d6db', '#7ae7bf', '#51b749', '#fbd75b', '#ffb878', '#ff887c', '#dc2127', '#dbadff', '#000000' ];
        

        return self;


    }

}());