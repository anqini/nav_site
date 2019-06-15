<template>
  <div class="topbar pt-2 pr-3 pl-3 d-flex flex-wrap">
    <img class="ml-4 mr-5 mt-2 menuButton" @click="sidebar" src = "../assets/menu.png" alt="menu" height="20" />
    <div class="input-group mb-3 ml-2 searchbar">
      <input type="text" v-model="condition" class="form-control" placeholder="请输入搜索内容..." aria-label="请输入搜索内容..." aria-describedby="basic-addon2">
      <div class="input-group-append">
        <router-link class="btn btn-secondary" type="submit" :to="searchapi">搜索</router-link>
      </div>

    </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      condition: "",
      show: true
    }
  },
  methods: {
    sidebar() {
      this.$emit("sidebar", this.show);
    }
  },
  computed: {
    searchapi() {
      if (this.condition.length == 0) {
        return '/';
      } else {
        return '/search/' + this.condition;
      }
    }
  }
}
</script>

<style scoped>
* {
  font-family: "PingFangSC-Regular","Helvetica Neue","Microsoft Yahei","微软雅黑";
}
a {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    color: #fff;
    background-color: #6c757d;
    /* border-color: #6c757d; */

}
.menuButton {
  cursor: pointer; 
}
.topbar {
  background-color: #d9d9d9;
  height: 60px;
}
.searchbar {
  background-color: #d9d9d9;
  width: 80%;
}
</style>
