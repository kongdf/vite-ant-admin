<template>
  <a-row>
    <a-col :span="12">
      直播
      <AliPlayerV3 style="height: 200px" :source="source" ref="VueAliplayerV2" :options="options" />
    </a-col>
    <a-col :span="12">

      <a-button @click="play2" type="primary">点击播放摄像头</a-button>

      <video id="myVideo" width="500" height="480" autoplay></video>
    </a-col>
  </a-row>
</template>

<script>
  import {
    AliPlayerV3
  } from "vue-aliplayer-v3";
  export default {
    components: {
      AliPlayerV3
    },
    setup() {
      return {
        options: {
          // source:'//player.alicdn.com/video/aliyunmedia.mp4',
          isLive: true, //切换为直播流的时候必填
          format: "m3u8", //切换为直播流的时候必填
        },
        source: "http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8",
      };
    },
    data() {
      return {
        stream: "",
      };
    },

    created() {
      // npm i vue-aliplayer-v2 --save
      // https://github.com/langyuxiansheng/vue-aliplayer-v2
    },
    mounted() {},
    methods: {
      play2() {
        var opt = {
          audio: true,
          video: {
            width: 375,
            height: 500,
          },
        };
        navigator.mediaDevices
          .getUserMedia(opt)
          .then(function (mediaStream) {
            var video = document.getElementById("myVideo");
            video.srcObject = mediaStream;
            video.onloadedmetadata = function (e) {
              video.play();
            };
          })
          .catch(function (err) {
            console.log(err.name + ": " + err.message);
          }); // always check for errors at the end.
      },
      play() {
        this.$refs.VueAliplayerV2.play();
      },
    },
  };
</script>

<style>
</style>