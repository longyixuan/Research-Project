<style scoped>
html,body {
    height: 100%;
}
.yxl-loading {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    background: rgba(255, 255 , 255 , 0.8);
}
#loading {
	margin: 0 auto;
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -250px;
}
</style>
<template>
    <div class="yxl-loading" ref="loading-warp" v-show="loading">
        <canvas id="loading" ref="loading"></canvas>
    </div>
</template>
<script>
export default {
    name: 'loading',
    data () {
        return {
            bubblsarry: [],
            canvas: null,
            context: null,
            ballcount: -1
        }
    },
    props: {
        loading: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        initDraw () {
            var _this = this;
            setInterval(()=>{
                _this.ballcount++;
                if (_this.ballcount <= 360) {
                    _this.Drawball(_this.context, 20, _this.ballcount);
                    _this.Draw(_this.context, _this.ballcount);
                } else {
                     _this.ballcount = 0;
                }
            },50);
        },
        Drawball(cxt, r, i){ //绘制眼珠
            cxt.clearRect(0, 0,this.canvas.width, this.canvas.height);
            this.DrawCircle(cxt);
            cxt.beginPath();
            cxt.arc((this.canvas.width / 2 - 45) + (Math.sin((6 * i) / 180 * Math.PI) * r), (this.canvas.height / 2 - 20) - (Math.cos((6 * i) / 180 * Math.PI) * r), 4, 0, 2 * Math.PI);
            cxt.fillStyle = "black";
            cxt.fill();
            cxt.closePath();
            cxt.beginPath();
            cxt.arc((this.canvas.width / 2 + 45) + (Math.sin((6 * i) / 180 * Math.PI) * r), (this.canvas.height / 2 - 20) - (Math.cos((6 * i) / 180 * Math.PI) * r), 4, 0, 2 * Math.PI);
            cxt.fillStyle = "black";
            cxt.fill();
            cxt.closePath();
        },
        ears_left(cxt){ //画左耳朵
            cxt.save();
            cxt.beginPath();
            cxt.translate(this.canvas.width / 2, this.canvas.height / 2 - 100);//将画布坐标系原点移至中心
            cxt.rotate(20 * Math.PI / 180);
            cxt.translate(-(this.canvas.width / 2 - 70), -(this.canvas.height / 2));//修正画布坐标系
            cxt.moveTo(this.canvas.width / 2 - 30, this.canvas.height / 2);
            cxt.quadraticCurveTo(this.canvas.width / 2, this.canvas.height / 2 - 70, this.canvas.width / 2 + 30, this.canvas.height / 2);
            cxt.fillStyle = "#228b7f";
            cxt.fill();
            cxt.closePath();
            cxt.restore();
        },
        ears_right(cxt){ //画右耳朵
            cxt.save();
            cxt.beginPath();
            cxt.translate(this.canvas.width / 2, this.canvas.height / 2 - 100);//将画布坐标系原点移至中心
            cxt.rotate(-20 * Math.PI / 180); //旋转
            cxt.translate(-(this.canvas.width / 2 + 70), -(this.canvas.height / 2));//修正画布坐标系
            cxt.moveTo(this.canvas.width / 2 - 30, this.canvas.height / 2);
            cxt.quadraticCurveTo(this.canvas.width / 2, this.canvas.height / 2 - 70, this.canvas.width / 2 + 30, this.canvas.height / 2);
            cxt.fillStyle = "#228b7f";
            cxt.fill();
            cxt.closePath();
            cxt.restore();
        },
        Draw(cxt, i){ //绘制运动的三个小球
            cxt.beginPath();
            cxt.arc((this.canvas.width / 2) + (Math.sin((8 * i) / 180 * Math.PI) * 200), (this.canvas.height / 2) - (Math.cos((8 * i) / 180 * Math.PI) * 200), 10, 0, 2 * Math.PI);
            cxt.fillStyle = "rgba(34,139,127,1)";
            cxt.fill();
            cxt.closePath();
            cxt.beginPath();

            cxt.arc((this.canvas.width / 2) + (Math.sin((8 * (i - 1)) / 180 * Math.PI) * 200), (this.canvas.height / 2) - (Math.cos((8 * (i - 1)) / 180 * Math.PI) * 200), 8, 0, 2 * Math.PI);
            cxt.fillStyle = "rgba(34,139,127,0.8)";
            cxt.fill();
            cxt.closePath();
            cxt.beginPath();
            cxt.arc((this.canvas.width / 2) + (Math.sin((8 * (i - 2)) / 180 * Math.PI) * 200), (this.canvas.height / 2) - (Math.cos((8 * (i - 2)) / 180 * Math.PI) * 200), 6, 0, 2 * Math.PI);
            cxt.fillStyle = "rgba(34,139,127,0.6)";
            cxt.fill();
            cxt.closePath();
        },
        DrawCircle(cxt){ //脑袋
            this.ears_left(cxt);
            this.ears_right(cxt);
            cxt.beginPath();
            cxt.moveTo(this.canvas.width / 2, this.canvas.height / 2 - 100);
            cxt.bezierCurveTo(this.canvas.width / 2 + 170, this.canvas.height / 2 - 100, this.canvas.width / 2 + 170, this.canvas.height / 2 + 100, this.canvas.width / 2, this.canvas.height / 2 + 100);
            cxt.moveTo(this.canvas.width / 2, this.canvas.height / 2 + 100);
            cxt.bezierCurveTo(this.canvas.width / 2 - 170, this.canvas.height / 2 + 100, this.canvas.width / 2 - 170, this.canvas.height / 2 - 100, this.canvas.width / 2, this.canvas.height / 2 - 100);

            cxt.fillStyle = "#29a69c";
            cxt.fill();
            cxt.closePath();

            cxt.beginPath();
            cxt.arc(this.canvas.width / 2 - 45, this.canvas.height / 2 - 20, 30, 0, 2 * Math.PI);

            cxt.fillStyle = "white";
            cxt.fill();
            cxt.closePath();
            cxt.beginPath();
            cxt.arc(this.canvas.width / 2 + 45, this.canvas.height / 2 - 20, 30, 0, 2 * Math.PI);
            cxt.fillStyle = "white";
            cxt.fill();
            cxt.beginPath();

            cxt.moveTo(this.canvas.width / 2 - 30, this.canvas.height / 2 + 40);
            cxt.bezierCurveTo(this.canvas.width / 2 - 30, this.canvas.height / 2 + 60, this.canvas.width / 2, this.canvas.height / 2 + 60, this.canvas.width / 2, this.canvas.height / 2 + 40);
            cxt.moveTo(this.canvas.width / 2, this.canvas.height / 2 + 40);
            cxt.bezierCurveTo(this.canvas.width / 2, this.canvas.height / 2 + 60, this.canvas.width / 2 + 30, this.canvas.height / 2 + 60, this.canvas.width / 2 + 30, this.canvas.height / 2 + 40);

            cxt.lineCap = "round";
            cxt.lineWidth = 4;
            cxt.strokeStyle = "#228b7f";
            cxt.stroke();
            cxt.closePath();
        }
    },
    created () {
    },
    mounted () {
        this.canvas = this.$refs.loading;
        this.context = this.canvas.getContext('2d');
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = 500;
        this.initDraw();
    }
}
</script>

    