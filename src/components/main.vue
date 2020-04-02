<template>
  <div class="p-3 mainblock">
    <h1>比邻院校库</h1>
    <p>为您提供最适合您的美国留学生活网站</p>
    <div class="mx-auto rounded d-flex flex-wrap mt-4 searchResult">
      <h3 class='w-100'><b>大学排名</b></h3>
      <div style="width: 100%; height: 300px;" v-show="!this.isloaded">
        <div style="width: 120px;background-color:#409cff; opacity: 0.5; padding: 20px; margin: 50px auto; border-radius: 5px;">
          <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
      <table class="tg" v-show="this.isloaded">
        <tr>
          <th class="tg-cly1">2020排名</th>
          <th class="tg-cly1">学校名称</th>
          <th class="tg-cly1">英文名</th>
          <th class="tg-cly1">校徽</th>
          <th class="tg-cly1">所在州</th>
          <th class="tg-cly1">2019排名</th>
          <th class="tg-cly1">排名变化</th>
        </tr>
        <tr v-for="record in data" :key="record.EnglishName">
          <td class="tg-0lax">{{ record.rankIn2020 }}</td>
          <td class="tg-0lax"><router-link class="anchor" :to="'/detail/uni/' + record._id" style="color: black;font-size: 14px;">{{ record.title }}</router-link></td>
          <td class="tg-0lax">{{ record.EnglishName}}</td>
          <td class="tg-0lax"><img :src="record.logo" :alt="record.title" height=30></td>
          <td class="tg-0lax">{{ record.state }}</td>
          <td class="tg-0lax">{{ record.rankIn2019 }}</td>
          <td class="tg-0lax">{{ record.change1 ? record.change1 + record.change2: record.change2 }}</td>
        </tr>
      </table>
    </div>
    <!-- <div class="mx-auto rounded d-flex flex-wrap mt-4 searchResult">
      <h3 class='w-100'><b>常春藤学府</b></h3>
      <Ele v-for="school in ivyleague" :key="school.title" :data="school"></Ele>
      <div class="w-100 loaderView" v-show="!loaded2">
        <div class="css-loader mx-auto"></div>
      </div>
    </div> -->
    

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
      loaded2: false,
      data: [],
      isloaded: false
    }
  },
  methods: {

  },
  mounted() {
    // console.log(new Date());
    // this.$http.get('search/加州大学伯克利分校')
    //     .then(data => {
    //       this.frequentlyVisited.push(data.body[0]);
    //     })
    //     .catch(err => console.error(err));
    // this.$http.get('search/斯坦福大学')
    //     .then(data => this.frequentlyVisited.push(data.body[0]))
    //     .catch(err => console.error(err));
    // this.$http.get('search/哈佛大学')
    //     .then(data => {
    //       this.frequentlyVisited.push(data.body[0]);
    //       this.loaded1 = true;
    //     })
    //     .catch(err => {
    //       this.loaded1 = true;
    //       console.error(err);
    //     });
    // this.$http.get('category/ivy')
    //     .then(data => {
    //       this.ivyleague = data.body;
    //       this.loaded2 = true;
    //     })
    //     .catch(err => {
    //       this.loaded2 = true;
    //       console.error(err);
    //     });
    console.time("timer")
    this.$http.get('table')
        .then(data => {
          console.timeLog("timer")
          this.raw = data.body;
          let s = new Set()
          if (this.raw) {
            for (let record of this.raw) {
              if (!s.has(record.title)) {
                this.data.push(record)
                s.add(record.title)
              }
            }
          }
          console.timeLog("timer")
          this.data.sort((a,b) => {
            let rankforA = parseInt(a.rankIn2020)
            let rankforB = parseInt(b.rankIn2020)
            if (rankforA > rankforB) return 1
            if (rankforA < rankforB) return -1
            return 0
          })
          console.timeLog("timer")
          this.isloaded = true;
        })
        .catch(err => {
          console.error(err);
          alert('data load error!')

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
.tg  {border-collapse:collapse;border-spacing:0;border-color:#9ABAD9; margin: 20px;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 20px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#9ABAD9;color:#444;background-color:#EBF5FF;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 20px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#9ABAD9;color:#fff;background-color:#409cff;}
.tg .tg-cly1{text-align:left;vertical-align:middle}
.tg .tg-0lax{text-align:left;vertical-align:top}

.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
