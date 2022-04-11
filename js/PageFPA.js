app = Vue.createApp({
    data() {
        return {
            isPlay: false,

            canvas: null,
            ctx: null,
            activSystem: null,
            startPoint: null,
            closeVector: null,
            countPoint: 10000,
            noDrawPointBegin: 1000,
            indexPoint: 0,

            CONST_H: 0.001,
            EPSILON_FOR_LP: 0.001,
            colorLine: "#ff0000",
            colorWindow: "#000",
            params: null,
        }
    },
    methods: {
        startPage() {
            this.canvas = document.getElementById('windowForVizualization');
            this.ctx = this.canvas.getContext('2d');



            this.canvas.setAttribute("width", $("canvas").width());
            this.canvas.setAttribute("height", $("canvas").height());

            // this.params = new Object();
            // this.params.sigma = 10;
            // this.params.r = 28;
            // this.params.b = 8.0 / 3;

            // var _params = this.activSystem.params;
            // _params.r = 35;

            //this.params = this.activSystem.params;

            this.activSystem = new DynamicalSystems(
                function(p) {
                    return this.params.sigma * (p.y - p.x);
                },
                function(p) {
                    return p.x * (this.params.r - p.z) - p.y;
                },
                function(p) {
                    return p.x * p.y - this.params.b * p.z;
                });
            this.activSystem.params.r = 35;
            this.startPoint = new Point(0.2, 0.0, 0.0);
            this.closeVector = new Point(0.001, 0, 0);
            this.params = this.activSystem.params;

            this.ctx.fillStyle = this.colorLine;
        },
        repliceStartStop: function() {
            this.isPlay = !this.isPlay;
        },
        showFPA: function() {
            for (var i = 0; i < this.countPoint; i++) {
                this.drawNextPoint();
            }
        },
        clearScrin: function() {
            this.ctx.clearRect(0, 0, $("canvas").width(), $("canvas").height());
        },
        al: function(key) {
            this.params[key] = $("#" + key)[0].value;
            //this.activSystem.params = this
        },
        drawNextPoint: function() {
            this.startPoint = this.activSystem.getNextPoint(this.startPoint, this.CONST_H);
            this.indexPoint += 1;
            if (this.indexPoint > this.noDrawPointBegin) {
                this.ctx.fillRect(this.startPoint.x * 10 + 400, 600 - this.startPoint.z * 8, 1, 1);
            }

        },
        savePNG: function() {
            // var canvas = document.getElementById("windowForVizualization");
            // var dataURL = canvas.toDataURL("image/png");
            // var newTab = window.open('about:blank', 'image from canvas');
            // newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
        },
    },
    mounted() {
        setInterval(() => {
            if (this.isPlay) {
                var a = this.params;
                this.drawNextPoint();
            }
        });
    },
    watch: {
        countPoint: function(newValue, oldValue) {
            this.countPoint = newValue;
        },
        CONST_H: function(newValue, oldValue) {
            this.CONST_H = parseFloat(newValue);
        },
        colorLine: function(newValue, oldValue) {
            this.colorLine = newValue;
            this.ctx.fillStyle = newValue;
        },
        colorWindow: function(newValue, oldValue) {
            this.colorWindow = newValue;
            $("#windowForVizualization").css("background-color", newValue);
        },
        noDrawPointBegin: function(newValue, oldValue) {
            this.noDrawPointBegin = newValue;
        },
    },
}).mount('#page-content-wrapper');
app.startPage();