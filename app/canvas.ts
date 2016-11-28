module mapp.qt {

    export class Canvas {

        private canvasWrapperClass = 'canvas-wrapper';
        private domElement: KnockoutObservable<HTMLCanvasElement>;
        private ctx: CanvasRenderingContext2D;
        private quad_keys: number[];

        private canvas_width = 800;
        private canvas_height = 800;

        constructor() {
        
            let elementSubstription: KnockoutSubscription;
            this.domElement = ko.observable<HTMLCanvasElement>();

            // Init canvas when DOM element is rendered 
            elementSubstription = this.domElement.subscribe(() => {
                
                if(this.domElement() && !this.ctx) {
                    elementSubstription.dispose();
                    this.init();
                }
            });
        }

        private init() {

            this.ctx = this.domElement().getContext("2d");
            this.ctx.canvas.width = this.canvas_width;
            this.ctx.canvas.height = this.canvas_height;
            
            $.getJSON("quad_keys.json", (data) => {
                this.quad_keys = data;
                this.draw();
            })
        }

        private draw() {

            let x, y, w, h;
            this.ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
            this.ctx.strokeRect(0, 0, this.canvas_width, this.canvas_height);

            $.each(this.quad_keys, (i, key) => {

                x = 0;
                y = 0;
                w = this.canvas_width;
                h = this.canvas_height;

                for(let j = 0; j < key.toString().length; j++) {
                    
                    let q = parseInt(key.toString()[j]);

                    w /= 2;
                    h /= 2;

                    x += (q == 1 || q == 3) ? w : 0;
                    y += (q == 2 || q == 3) ? h : 0;
                }

                this.ctx.strokeRect(x, y, w, h);
            });
        }
    }
}
