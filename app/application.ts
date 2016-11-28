/// <reference path="../typings/index.d.ts" />

module mapp.qt {
    export class app {

        private canvas: KnockoutObservable<mapp.qt.Canvas>;
        
        constructor() {
            
            this.canvas = ko.observable(new mapp.qt.Canvas());
        }

        public static loadTemplates(): JQueryPromise<any> {
            
            var deferred = $.Deferred<any>();
            var append = (data: string) => {
                $('body').append(data);
            }

            $.when(
                $.get("app/templates/canvas.html", function(data) { append(data); }),
                $.get("app/templates/header.html", function(data) { append(data); })
            ).then(
               () => deferred.resolve()
            );

            return deferred.promise();
        }
    }

    $(() => {
        app.loadTemplates().then(() => {
            ko.applyBindings(new app());
        });
    });
}