<template>
  <div>
    <div class="text-center mt-3">
      <h1>网站简介</h1>
      <p>为您提供最有用的美国生活网站</p>
    </div>
    <div class="mx-auto rounded d-flex flex-wrap mt-4 searchResult">
      <h3 class='w-100'><b>网站简介</b></h3>
      <div class="p-4 d-flex flex-wrap w-100">
        <span><img class="logo" :src="logo_source" :alt="website" height="150"></span>

        <div class="p-3 desBlock">
          <h1>网站名称：<b>{{ website }}</b></h1> <br />
          <h2>网站简介：{{ description }}</h2>
        </div>
        <a :href="url"><button class="btn btn-secondary goto" type="submit">立即前往</button></a>

      </div>
      <div class="list-backhome"><router-link to="/"><img class="back_icon mr-2" :src="require('../assets/back-left.png')" alt="back" height="15">返回首页</router-link></div>
    </div>
  </div>
</template>

<script>
import subele from './subele.vue'
export default {
  components: {
    "SubEle": subele
  },
  data () {
    return {
      id: this.$route.params.id,
      data: {},
      website: "",
      description: "",
      logo_source: null,
      url: ""
    }
  },
  methods: {

  },
  mounted() {
    this.$http.get('http://localhost:5000/api/detail/' + this.id)
        .then(data => {
          this.data = data.body;
          this.website = this.data.title;
          this.description = this.data.description;
          try {
              this.logo_source = require('../assets/' + this.data.images);
          } catch(err) {
              this.logo_source = require('../assets/domain.png');
          }
          this.url = this.data.web;
        })
        .catch(err => console.error(err));

  }
}
</script>

<style scoped>
span {
    display: inline-block;
    width: 150px;
    height: 150px;
    position: relative;
}
.logo {
  max-width:150px;
  max-height:150px;
  width:auto;
  height:auto;
  border: 0;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  margin: auto;
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
.back_icon {
  opacity: 0.6;
}
.list-backhome {
  width: 100%;
  margin: 24px 12px;
  height: 48px;
  line-height: 44px;
  text-align: center;
  border-top: 2px rgba(0,0,0,.02) solid;
  border-bottom: 2px rgba(0,0,0,.02) solid;
}
.list-backhome a {
    padding: 4px 0 4px 20px;
    background-size: 16px;
    color: #6B7386;
}
.left_part {
  width: 20%;
  opacity: 0.5;
}
.right_part {
  width: 80%;
}
.ranking_info li div {
  float: left;
}
.ranking_info {
  width: 100%;
  white-space: normal;
}
.goto {
  width: 80px;
  height: 36px;
  padding: 6px 12px 6px 12px;
  margin: 40px 20px 0 30px;
}
.desBlock {
  width: calc(100% - 280px);
}
.desBlock > h1 {
  font-size: 14px;
}
.desBlock > h2 {
  font-size: 14px;
}
.desBlock > h1 > b {
  font-size: 14px;
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
</style>
