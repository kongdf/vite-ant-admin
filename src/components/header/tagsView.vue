<template>
  <ul>
    <li v-for="(tag, index) in tags" :key="index" @click="to(tag)">
      {{ tag }} <CloseSquareOutlined class="cloase" v-show="tags.length!=1" @click.stop="del(index)" />
    </li>
  </ul>
</template>

<script>
import { CloseSquareOutlined } from "@ant-design/icons-vue";

export default {
  inject: ["tags"],
  components: {
    CloseSquareOutlined,
  },
  methods: {
    to(val){
        this.$router.push({
        name:val
      }) 
    },
    del(index) {
      this.tags.splice(index, 1); 
    },
  },
  mounted() {
  
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
}
</style>