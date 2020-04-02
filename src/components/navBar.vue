<template>
  <div id="nav h-100">
    <section style="width: 200px" :class="combClass">
      <div class="header"><router-link id="title" to="/">院校库</router-link></div>
      <ul class="sidebar-menu">
        
        <li :class="{active: index1}">
          <a href="#" @click="toggle1">
            <span style="font-size: 1.2em;">综合大学</span>
          </a>
        </li>
        <div :class="{extendlist: true, extendlistcollapse: index1}">
          <li style="display: flex; flex: wrap; color: white; margin: 10px 20px;" v-for="school in cleanData" :key="school.title">
            <input type="checkbox" :name="school.title" style="margin-right: 10px; margin-top: 2px;" :checked="school._id == routeParam.id ">
            <label :for="school.title">
              <router-link class="anchor" :to="'/detail/uni/' + school._id" >
                <p><strong>{{ school.rankIn2020 }}</strong> {{ school.title }}</p>
              </router-link>
            </label>
          </li>
        </div>
        <div style="height: 20px; cursor: pointer;" @click="toggle1" v-show="!index1"><i class="arrow down"></i></div>
        
        <li :class="{active: index2}">
          <a href="#" @click="toggle2">
            <span style="font-size: 1.2em;">文理学院</span>
          </a>
        </li>
        <div :class="{extendlist: true, extendlistcollapse: index2}">
          <li style="display: flex; flex: wrap; color: white; margin: 10px 20px;" v-for="school in cleanData2" :key="school.title">
            <input type="checkbox" :name="school.title" style="margin-right: 10px; margin-top: 2px;" :checked="school._id == routeParam.id ">
            <label :for="school.title">
              <router-link class="anchor" :to="'/detail/uni/' + school._id" >
                <p><strong>{{ school.rankIn2020 }}</strong> {{ school.title }}</p>
              </router-link>
            </label>
          </li>
        </div>
        <div style="height: 20px; cursor: pointer;" @click="toggle2"  v-show="!index2"><i class="arrow down"></i></div>
        
        

        <!-- <li :class="{active: index1}">
          <a href="#" @click="toggle1">
            <span>精准查校</span>
          </a>
          <ul class="sidebar-submenu" v-show="index1">
            <li v-for="subject in subjects"><router-link :to="'/catagory/'+subject"> {{ subject }} </router-link></li>
          </ul>
        </li>
        <li :class="{active: index2}">
          <a href="#" @click="toggle2">
            <span>好好学习</span>
          </a>
          <ul class="sidebar-submenu" v-show="index2">
            <li v-for="study in study_resource"><router-link :to="'/catagory/'+ study"> {{ study }} </router-link></li>
          </ul>
        </li>
        <li :class="{active: index3}">
          <a href="#" @click="toggle3">
            <span>积极生活</span>
          </a>
          <ul class="sidebar-submenu" v-show="index3">
            <li v-for="live in livings"><router-link :to="'/catagory/'+ live"> {{ live }} </router-link></li>
          </ul>
        </li>
        <li :class="{active: index4}" >
          <a href="#" @click="toggle4">
            <i class="fa fa-pie-chart"></i>
            <span>机票旅游</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
        </li>
        <li :class="{active: index5}">
          <a href="#" @click="toggle5">
            <i class="fa fa-laptop"></i>
            <span>租房住宿</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="sidebar-submenu" v-show="index5">
            <li v-for="subject in rents"><router-link :to="'/catagory/'+subject"> {{ subject }} </router-link></li>
          </ul>
        </li> -->
      </ul>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    props: [
      'showBar',
      'routeParam'
    ],
    data() {
      return {
        menu: ["精准查校", "评价购物", "买车购车", "", ""],
        subjects: ["综合大学", "商学", "计算机", "物理", "化学", "生物", "电子电气", "环境工程", "经济"],
        study_resource: ["在线教育", "K12", "专业协会", "书", "外语学习",
                          "媒体和新闻", "学术搜索","技能学习",
                          "搜学校", "留学论坛", "科技与工具"],
        livings: ["医疗与保险", "奖学金", "招聘与职场", "政府官方"],
        rents: ["住宿"],
        index1: false,
        index2: false,
        index3: false,
        index4: false,
        index5: false,
        data: [],
        cleanData: [],
        cleanData2: []
      }
    },
    methods: {
      toggle1() {
        this.index1 = !this.index1;
        if (this.index1 == true) {
          this.index2 = false;
          this.index3 = false;
          this.index4 = false;
          this.index5 = false;
        }
      },
      toggle2() {
        this.index2 = !this.index2;
        if (this.index2 == true) {
          this.index1 = false;
          this.index3 = false;
          this.index4 = false;
          this.index5 = false;
        }
      },
      toggle3() {
        this.index3 = !this.index3;
        if (this.index3 == true) {
          this.index2 = false;
          this.index1 = false;
          this.index4 = false;
          this.index5 = false;
        }
      },
      toggle4() {
        this.index4 = !this.index4;
        if (this.index4 == true) {
          this.index2 = false;
          this.index3 = false;
          this.index1 = false;
          this.index5 = false;
        }
      },
      toggle5() {
        this.index5 = !this.index5;
        if (this.index5 == true) {
          this.index2 = false;
          this.index3 = false;
          this.index1 = false;
          this.index4 = false;
        }
      }
    },
    mounted() {

    },
    created() {
      this.$http.get('schools')
        .then(data => {
          this.raw = data.body;
          let s = new Set()
          if (this.raw) {
            for (let record of this.raw) {
              if (record.rankIn2020) {
                if (!s.has(record.title)) {
                  // console.log(record._id)
                  this.cleanData.push(record)
                  s.add(record.title)
                }
              } 
            }
          }
          this.cleanData.sort((a,b) => {
            let rankforA = parseInt(a.rankIn2020)
            let rankforB = parseInt(b.rankIn2020)
            if (rankforA > rankforB) return 1
            if (rankforA < rankforB) return -1
            return 0
          })
        })
        .catch(err => console.error(err));

      this.$http.get('schools_liberal_art')
        .then(data => {
          this.raw = data.body;
          let s = new Set()
          if (this.raw) {
            for (let record of this.raw) {
              if (record.rankIn2020) {
                if (!s.has(record.title)) {
                  // console.log(record._id)
                  this.cleanData2.push(record)
                  s.add(record.title)
                }
              } 
            }
          }
          this.cleanData2.sort((a,b) => {
            let rankforA = parseInt(a.rankIn2020)
            let rankforB = parseInt(b.rankIn2020)
            if (rankforA > rankforB) return 1
            if (rankforA < rankforB) return -1
            return 0
          })
        })
        .catch(err => console.error(err));
    },
    computed:{
      combClass() {
        return { "h-100": true,
                  "animate-menu": true,
                  "animate-menu-left": true,
                  "animate-menu-open": this.showBar
                }
      }
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
.header {
  height: 70px;
    background-color: #1a2227;
    text-align: center;
    padding-top: 20px;
}
a {
  color: white;
  text-decoration: none;
}
#title {
  border: none;
  background-color: #1a2226;
  font-size: 16px;
  text-align: center;
  padding: 5px 0 5px 0;
}
.animate-menu-push {
left: 0;
position: relative;
transition: all 0.3s ease; }
.animate-menu-push.animate-menu-push-right {
left: 200px; }
.animate-menu-push.animate-menu-push-left {
left: -200px; }

.animate-menu {
position: fixed;
top: 0;
width: 200px;
height: 100%;
transition: all 0.3s ease; }

.animate-menu-left {
left: -200px; }
.animate-menu-left.animate-menu-open {
left: 0; }

.sidebar-menu {
list-style: none;
margin: 0;
padding: 0;
background-color: #222d32; 
margin-top: -10px;
padding-top: 10px;
overflow: scroll;
height: 100%;
    }


.sidebar-menu > li {
position: relative;
margin: 0;
padding: 0; }
.sidebar-menu > li > a {
  padding: 12px 5px 12px 15px;
  display: block;
  border-left: 3px solid transparent;
  color: #b8c7ce; }
  .sidebar-menu > li > a > .fa {
    width: 20px; }
.sidebar-menu > li:hover > a, .sidebar-menu > li.active > a {
  color: #fff;
  background: #1e282c;
  border-left-color: #3c8dbc; }
.sidebar-menu > li .label,
.sidebar-menu > li .badge {
  margin-top: 3px;
  margin-right: 5px; } 




.sidebar-menu li.sidebar-header {
padding: 15px 15px 15px 15px;
font-size: 20px;
text-align: center;
color: #4b646f;
background: #1a2226; }
/* .sidebar-description {
  padding: 10px 25px 10px 15px;
  font-size:12px;
  color: white;
}
.sidebar-menu li > a > .fa-angle-left {
width: auto;
height: auto;
padding: 0;
margin-right: 10px;
margin-top: 3px; }
.sidebar-menu li.active > a > .fa-angle-left {
transform: rotate(-90deg); }
.sidebar-menu li.active > .sidebar-submenu {
display: block;
height: 100%;
}
.sidebar-menu a {
color: #b8c7ce;
text-decoration: none; }
.sidebar-menu .sidebar-submenu {
list-style: none;
padding-left: 5px;
margin: 0 1px;
background: #2c3b41;
height: 0px;
overflow: hidden;
transition: all 0.7s ease;
}
.sidebar-menu .sidebar-submenu .sidebar-submenu {
  padding-left: 20px; }
.sidebar-menu .sidebar-submenu > li > a {
  padding: 5px 5px 5px 15px;
  display: block;
  font-size: 14px;
  color: #8aa4af; }
  .sidebar-menu .sidebar-submenu > li > a > .fa {
    width: 20px; }
  .sidebar-menu .sidebar-submenu > li > a > .fa-angle-left,
  .sidebar-menu .sidebar-submenu > li > a > .fa-angle-down {
    width: auto; }
.sidebar-menu .sidebar-submenu > li.active > a, .sidebar-menu .sidebar-submenu > li > a:hover {
  color: #fff; }

.sidebar-menu-rtl {
list-style: none;
margin: 0;
padding: 0;
background-color: #222d32; }
.sidebar-menu-rtl > li {
position: relative;
margin: 0;
padding: 0; }
.sidebar-menu-rtl > li > a {
  padding: 12px 15px 12px 5px;
  display: block;
  border-left: 3px solid transparent;
  color: #b8c7ce; }
  .sidebar-menu-rtl > li > a > .fa {
    width: 20px; }
.sidebar-menu-rtl > li:hover > a, .sidebar-menu-rtl > li.active > a {
  color: #fff;
  background: #1e282c;
  border-left-color: #3c8dbc; }
.sidebar-menu-rtl > li .label,
.sidebar-menu-rtl > li .badge {
  margin-top: 3px;
  margin-right: 5px; }
.sidebar-menu-rtl li.sidebar-header {
padding: 10px 15px 10px 25px;
font-size: 12px;
color: #4b646f;
background: #1a2226; }
.sidebar-menu-rtl li > a > .fa-angle-left {
width: auto;
height: auto;
padding: 0;
margin-right: 10px;
margin-top: 3px; }
.sidebar-menu-rtl li.active > a > .fa-angle-left {
transform: rotate(-90deg); }
.sidebar-menu-rtl li.active > .sidebar-submenu {
display: block; }
.sidebar-menu-rtl a {
color: #b8c7ce;
text-decoration: none; }
.sidebar-menu-rtl .sidebar-submenu {
list-style: none;
padding-right: 5px;
margin: 0 1px;
background: #2c3b41; }
.sidebar-menu-rtl .sidebar-submenu .sidebar-submenu {
  padding-right: 20px; }
.sidebar-menu-rtl .sidebar-submenu > li > a {
  padding: 5px 15px 5px 5px;
  display: block;
  font-size: 14px;
  color: #8aa4af; }
  .sidebar-menu-rtl .sidebar-submenu > li > a > .fa {
    width: 20px; }
  .sidebar-menu-rtl .sidebar-submenu > li > a > .fa-angle-left,
  .sidebar-menu-rtl .sidebar-submenu > li > a > .fa-angle-down {
    width: auto; }
.sidebar-menu-rtl .sidebar-submenu > li.active > a, .sidebar-menu-rtl .sidebar-submenu > li > a:hover {
  color: #fff; } */

.extendlist {
  max-height: 200px;
  height: auto;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}
.extendlistcollapse {
  max-height: fit-content;
}

i {
  border: solid white;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  margin-left: 45%;
}
.down {
  transform: rotate(45deg) ;
  -webkit-transform: rotate(45deg);
}
</style>
