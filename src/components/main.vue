<template>
  <div class="p-3 mainblock">
    <h1>井井留学导航</h1>
    <p>为您提供最适合您的美国留学生活网站</p>
    <div class="mx-auto rounded d-flex flex-wrap mt-4 searchResult">
      <h3 class='w-100'><b>最常访问</b></h3>
      <Ele v-for="school in frequentlyVisited" :key="school.title" :data="school"></Ele>
      <div class="w-100 loaderView" v-show="!loaded1">
        <div class="css-loader mx-auto"></div>
      </div>
    </div>
    <div class="mx-auto rounded d-flex flex-wrap mt-4 searchResult">
      <h3 class='w-100'><b>常春藤学府</b></h3>
      <Ele v-for="school in ivyleague" :key="school.title" :data="school"></Ele>
      <div class="w-100 loaderView" v-show="!loaded2">
        <div class="css-loader mx-auto"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ele from './ele.vue'
export default {
  components: {
    "Ele": ele
  },
  data () {
    return {
      frequentlyVisited: [],
      ivyleague: [],
      loaded1: false,
      loaded2: false
    }
  },
  methods: {

  },
  mounted() {
    this.$http.get('http://localhost:5000/api/search/加州大学伯克利分校')
        .then(data => {
          this.frequentlyVisited.push(data.body[0]);
          console.log(data.body[0]);
        })
        .catch(err => console.error(err));
    this.$http.get('http://localhost:5000/api/search/斯坦福大学')
        .then(data => this.frequentlyVisited.push(data.body[0]))
        .catch(err => console.error(err));
    this.$http.get('http://localhost:5000/api/search/哈佛大学')
        .then(data => {
          this.frequentlyVisited.push(data.body[0]);
          this.loaded1 = true;
        })
        .catch(err => {
          this.loaded1 = true;
          console.error(err);
        });
    this.$http.get('http://localhost:5000/api/category/ivy')
        .then(data => {
          this.ivyleague = data.body;
          this.loaded2 = true;
        })
        .catch(err => {
          this.loaded2 = true;
          console.error(err);
        });
  }
}
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
  font-family: "PingFangSC-Regular","Helvetica Neue","Microsoft Yahei","微软雅黑";
  word-wrap: break-word;
  table-layout: fixed;
  word-break: break-all;
  box-sizing: border-box;
  font-size: 12px;
}
.mainblock {
  text-align: center;
}
Ele {
  flex-grow: 1;
  flex-basis: 266px;
}
h1 {
  font-size: 20px;
  color: #2c3b41;
  font-size: 26px;
  font-weight: 300;
  line-height: 40px;
}
p h1 {
  font-family: "Source Sans Pro", Helvetica, sans-serif;
  font-weight: normal;
}
h3 {
  height: 56px;
  line-height: 54px;
  border-bottom: 2px rgba(0,0,0,.02) solid;
  color: #30333c;
  text-align: left;
  margin: 0px 20px 0px 20px;
}
h3 > b {
  height: 56px;
  line-height: 54px;
  display: inline-block;
  border-bottom: 2px black solid;
}
@media all and (min-width: 1520px) {
  .searchResult {
    width: 1250px;
  }
}
@media all and (min-width: 1200px) {
  .searchResult {
    width: 920px;
  }
}
@media not all and (min-width: 1200px) {
  .searchResult {
    width: 90%;
  }
}
.searchResult {
  background-color: white;
  overflow: hidden;
  -moz-box-shadow:    0px 0px 6px 3px #ccc;
  -webkit-box-shadow: 0px 0px 6px 3px #ccc;
  box-shadow:         0px 0px 6px 3px #ccc;
}
.css-loader {
    border: 8px solid #0000004f;
    border-top: 8px solid #80808040;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin-data-v-376cda0e 2s linear infinite;
    position: relative;
    top: 100px;
}
.loaderView {
  height: 300px;
}
</style>
