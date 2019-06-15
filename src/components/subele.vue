<template>
  <a class="block rounded d-flex flex-wrap" alt="detailBlock">
    <span>
      <img :src="source" alt="logo" height="32" width="32">
    </span>
    <div>
      <b> {{ name | snippet-title }} </b> <br/>
      {{ description | snippet }}
    </div>
    <a :href="dest" class="goto"></a>
  </a>
</template>

<script>
export default {
  props: [
    'name', 'source', 'dest'
  ],
  data () {
    return {
      description: ""
    }
  },
  methods: {

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
.block {
  background-color:  #fafafa;
  display: block;
  height: 64px;
  line-height: 18px;
  padding: 14px 16px;
  color: #A1A7B7;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 12px 20px 12px 20px;
}
.block > div {
  text-align: left;
  width: 152px;
}
.block:hover {
  background-color: #f1f2f9;
}
.goto {
  display: block;
  top: 16px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: url("../assets/goto.png") center no-repeat;
  background-size: 16px;
  opacity: 0.4;
}
.goto:hover {
  opacity: 1;
}
span {
    display: inline-block;
    width: 32px;
    height: 32px;
    position: relative;
    margin-top: 2px;
    margin-right: 16px;
}
img {
  max-width:32px;
  max-height:32px;
  width:auto;
  height:auto;
  border: 0;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  margin: auto;
}
a {
  color: #30333C;
  text-decoration: none;
  transition: .2s;
}
a:hover {
  text-decoration: none;
  color: #6B7386;;
}
b {
  color: black;
}
b:hover {
  color: #007bff;
}
</style>
