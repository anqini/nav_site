<template>
  <div>
    <div class="text-center mt-3">
      <h1>学校简介</h1>
      <p>为您提供更多学校相关咨询</p>
    </div>
    <div class="mx-auto rounded d-flex flex-wrap mt-4 searchResult">
      <h3 class='w-100'><b>学校简介</b></h3>
      <div class="p-4 d-flex flex-wrap w-100">
        <span><img class="logo" :src="logo_source" :alt="university" height="150"></span>

        <div class="p-3 desBlock">
          <h1>学校名称：<b>{{ university }}</b></h1> <br />
          <h2>学校简介：{{ uni_description }}</h2>
        </div>
        <a :href="uni_web"><button class="btn btn-secondary goto" type="submit">立即前往</button></a>

      </div>
      <div class="ranking_info">
        <h3 class='w-100'><b>排名信息</b></h3>
        <div class="ml-4 pl-3 mt-2">
          <ul>
            <li v-for="ranking in rankings">
              <div class="left_part">
                 {{ ranking.title }}
              </div>
              <div class="right_part">
                {{ ranking.content}}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <h3 class='w-100'><b>其他入口</b></h3>
      <div class="other_entry d-flex flex-wrap">
        <SubEle v-for="entry in entries" :name="entry.name"
             :source='entry.source'
             :dest='entry.dest'
             :key='entry.name'></SubEle>
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
      university: "",
      uni_description: "",
      logo_source: null,
      uni_web: "",
      rankings: [{title: "英文名", content: ""},
                 {title: "地址", content: ""},
                 {title: "国家", content: ""},
                 {title: "排名", content: null} ],
      entries: [{name: "国际学生本科申请", dest:"", source: ""},
                {name: "国际学生本科申请截止日期", dest:"", source: ""},
                {name: "学院列表", dest: "", source: ""},
                {name: "本科专业列表", dest: "", source: ""},
                {name: "本科学费", dest: "", source: ""},
                {name: "研究生专业列表", dest: "", source: ""},
                {name: "研究生院", dest: "", source: ""},
                {name: "英语能力要求", dest: "", source: ""}
              ]
    }
  },
  methods: {

  },
  mounted() {
    // console.log("come to category");
    this.$http.get('http://localhost:5000/api/detail/' + this.id)
        .then(data => {
          // console.log(data);
          this.data = data.body;
          this.university = this.data.title;
          // console.log(this.data.description.length);
          if (this.data.description && this.data.description.length > 0) {
            this.uni_description = this.data.description;
          } else {
            this.uni_description = "暂无简介";
          }
          try {
              this.logo_source = require('../assets/' + this.data.images);
          } catch(err) {
              this.logo_source = require('../assets/0.png');
          }
          this.uni_web = this.data.web;
          this.rankings[0].content = this.data.en_title;
          this.rankings[1].content = this.data.city;
          this.rankings[2].content = this.data.state;
          this.rankings[3].content = this.data.ranking;
          this.entries[0].dest = this.data.school["国际学生本科申请"];
          this.entries[1].dest = this.data.school["国际学生本科申请截止日期"];
          this.entries[2].dest = this.data.school["学院列表"];
          this.entries[3].dest = this.data.school["本科专业列表"];
          this.entries[4].dest = this.data.school["本科学费"];
          this.entries[5].dest = this.data.school["研究生专业列表"];
          this.entries[6].dest = this.data.school["研究生院"];
          this.entries[7].dest = this.data.school["学院列表"];
          this.entries[0].source = this.logo_source;
          this.entries[1].source = this.logo_source;
          this.entries[2].source = this.logo_source;
          this.entries[3].source = this.logo_source;
          this.entries[4].source = this.logo_source;
          this.entries[5].source = this.logo_source;
          this.entries[6].source = this.logo_source;
          this.entries[7].source = this.logo_source;
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
