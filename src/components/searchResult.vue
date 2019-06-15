<template>
  <div class="p-3 mainblock">
    <h1>搜索结果({{data.length}})</h1>
    <div class="mx-auto rounded d-flex flex-wrap mt-4 searchResult">
      <h3 class='w-100'><b>{{ search }}搜索结果</b></h3>
      <Ele v-for="school in shownData" :data="school" :key="school.title"></Ele>
      <div class='paging' v-show="pageRange>1">
        <button class="btn btn-secondary-outline" :disabled="page==pageRange-1" @click="next">下一页</button>
        <button class="btn btn-secondary-outline" :disabled="page==0" @click="previous">上一页</button>
      </div>
      <div class="w-100 loaderView" v-show="!loaded">
        <div class="css-loader mx-auto"></div>
      </div>
      <notfound v-show="noResult"></notfound>
    </div>
  </div>
</template>

<script>
import ele from './ele.vue'
import notfound from './notfound.vue'
export default {
  components: {
    "Ele": ele,
    "notfound": notfound
  },
  data () {
    return {
      search: this.$route.params.search,
      data: [],
      page: 0,
      loaded: false,
      noResult: false
    }
  },
  methods: {
    next() {
      if (this.page + 1 < this.pageRange) {
        this.page += 1;
      }
    },
    previous() {
      if (this.page > 0) {
        this.page -= 1;
      }
    },
    noResultFound() {
      if (this.data) {
        return this.data.length == 0;
      } else {
        return true;
      }
    }
  },
  computed: {
    shownData() {
      if (this.page == this.pageRange - 1) {
          return this.data.slice(this.page * 12);
      } else if (this.page < this.pageRange) {
          return this.data.slice(this.page * 12, (this.page + 1) * 12);
      } else {
          return [];
      }
    },
    pageRange() {
      if (this.data) {
        return  Math.ceil(this.data.length / 12);
      } else {
        return 0;
      }
    },
    pageList() {
      var list = [];
      for (var i = 0; i < this.pageRange; i++) {
        list.push(i);
      }
      return list;
    }
  },
  mounted() {
    this.$http.get('http://localhost:5000/api/search/' + this.search)
        .then(data => {
          this.loaded = true;
          this.data = data.body;
          this.noResult = this.noResultFound();
        })
        .catch(err => {
          this.loaded = true;
          this.noResult = this.noResultFound();
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
.paging {
  width: 100%;
  margin: 0px 40px 20px 40px;
}
.btn {
  float: right;
  margin-right: 10px;
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
