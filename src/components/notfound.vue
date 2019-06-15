<template>
  <div class="w-100">
    <div class="d-flex flex-wrap mx-auto contentBlock">
      <div class="errorImage">
        <img :src="require('../assets/error.png')" alt="error" height="64" width="64" class="">
      </div>
      <div class="errorContent">
        <p>暂无内容~</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>
.contentBlock {
  width: fit-content;
}
.errorImage {
  margin: 20px 20px 20px 0px;
}
.errorContent {
  margin: 35px 20px 20px 100px;
}
.errorContent > p {
  font-size: 1.5em;
}
</style>
