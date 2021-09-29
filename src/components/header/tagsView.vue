<template>
  <ul>
    <a-dropdown :trigger="['contextmenu']" v-for="(tag, index) in tags" :key="index">
      <li @click="to(tag)" :class="{ active: routerName == tag }">
        {{ tag }}
        <CloseSquareOutlined class="cloase" v-show="tags.length != 1" @click.stop="del(index)" />
      </li>
      <template #overlay>
        <a-menu class="f14">
          <a-menu-item key="1" @click="close(index, 1)">关闭当前</a-menu-item>
          <a-menu-item key="2" @click="close(index, 2)">关闭其他</a-menu-item>
          <a-menu-item key="3" @click="close(index, 3)">关闭左侧</a-menu-item>
          <a-menu-item key="4" @click="close(index, 4)">关闭右侧</a-menu-item>
          <a-menu-item key="4" @click="close(index, 5)">关闭全部</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </ul>
</template>

<script>
  import {
    CloseSquareOutlined
  } from "@ant-design/icons-vue";

  export default {
    // inject: ["tags"],

    components: {
      CloseSquareOutlined,
    },
    data() {
      return {
        tags: [],
        routerName: "",
      };
    },
    watch: {
      $route(val, old) {
        if (!this.tags.includes(val.name)) {
          this.tags.push(val.name);
        }
        this.routerName = val.name;
      },
    },
    created() {
      this.routerName = this.$route.name;
      this.tags = [this.$route.name];
    },

    methods: {
      close(index, type) {
        if (type === 1) {
          this.$router.push({
            name: this.tags[index - 1],
          });
          this.tags.splice(index, 1);

        } else if (type === 2) {
          this.tags = [this.routerName];
        } else if (type === 3) {
          this.tags.splice(0, index);
        } else if (type === 4) {
          this.tags.splice((index + 1), this.tags.length - 1 - index);
        } else if (type === 5) {
          this.tags = [];

        }


      },
      to(val) {
        this.$router.push({
          name: val,
        });
      },
      del(index) {

        if (this.tags[index] == this.routerName) {
          this.$router.push({
            name: this.tags[index - 1],
          });
        }
        this.tags.splice(index, 1);
      },
    },
  };
</script>

<style lang="less" scoped>
  ul {
    li {
      float: left;
      margin-left: 10px;
      margin-top: 10px;
      list-style-type: none;
      border: 1px solid #ccc;
      padding: 0px 25px;
      height: 35px;
      line-height: 35px;
      cursor: pointer;
      position: relative;
      border-radius: 5px;

      .cloase {
        display: none;
      }

      &:hover {
        color: #1890ff;
        border: 1px solid #1890ff;

        .cloase {
          display: block;
        }
      }

      .cloase {
        position: absolute;
        font-size: 14px;
        right: 3px;
        top: 3px;
      }
    }

    .active {
      border: 1px solid #1890ff;
      color: #1890ff;
    }
  }
</style>