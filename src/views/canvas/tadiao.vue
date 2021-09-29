<template>
    <div>
        <canvas id="myArc" width="500" height="500">你的版本不支持canvas</canvas>
    </div>
</template>

<script>
    import {
        initCanvas
    } from '../../util/QTMDTD'

    export default {

        mounted() {
            let theCanvas = document.getElementById("myArc");



            var context = theCanvas.getContext("2d");


            var w = theCanvas.width;
            var h = theCanvas.height;
            context.clearRect(0, 0, w, h);


            this.$nextTick(() => {
                initCanvas('myArc', {
                    x: 100,
                    y: 100
                })
            })
        }
    }
</script>

<style>

</style>