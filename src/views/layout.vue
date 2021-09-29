<template>
  <a-layout class="BG">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <VideoCameraOutlined />
          <span @click="to('视频播放')">视频播放</span>
        </a-menu-item>
        <a-menu-item key="2" @click="to('echarts')">
          <BarChartOutlined />
          <span>echarts</span>
        </a-menu-item>
        <a-menu-item key="3" @click="to('tadiao')">
         <RocketOutlined />
          <span>塔吊</span>
        </a-menu-item>

        <a-menu-item key="3" @click="to('xeogl')">
          <upload-outlined />
          <span>模型</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <a-button type="primary" style="margin-left:20px" @click="screen">全屏</a-button>
        <hr class="divider" />

        <tagsView />
      </a-layout-header>
      <a-layout-content :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }">
        <transition name="slide-fade">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
  import {
    VideoCameraOutlined,
    BarChartOutlined,
     RocketOutlined ,
    UserOutlined,

    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from "@ant-design/icons-vue";

  import tagsView from "../components/header/tagsView.vue";
  import {
    defineComponent,
    ref
  } from "vue";
  export default defineComponent({
    components: {
      VideoCameraOutlined,
      BarChartOutlined,
      RocketOutlined,




      
      UserOutlined,

      UploadOutlined,
      MenuUnfoldOutlined,
      MenuFoldOutlined,
      tagsView,
    },

    setup() {
      return {
        selectedKeys: ref(["1"]),
        collapsed: ref(false),
        fullscreen: ref(false),
      };
    },
    methods: {
      to(val) {
        this.$router.push({
          name: val,
        });
      },
      screen() {
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      },
    },
  });
</script>
<style>
  .trigger {
    font-size: 18px;
    /* line-height: 30px; */

    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }
</style>

<style lang="less" scoped>
  .BG {
    width: 100%;
    height: 100%;

    .ant-layout-header {
      height: 120px;
    }

    .divider {
      height: 1px;
      padding: 0;
      background: rgba(0, 0, 0, 0.06);
      border: none;
    }
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>