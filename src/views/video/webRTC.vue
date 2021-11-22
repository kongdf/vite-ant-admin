<template>
  <a-button @click="play" type="primary">点击播放摄像头</a-button>



  <video id="myVideo" width="500" height="480" autoplay></video>

</template>

<script>
 
  export default {
   
    setup() {
      return {
        
      };
    },
    data() {
      return {
        stream: "",
      };
    },

    created() {
    
    },
    mounted() {},
    methods: {
      play() {
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
      
    },
  };
</script>

<style>
</style>