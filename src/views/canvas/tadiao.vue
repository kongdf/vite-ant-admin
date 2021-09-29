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