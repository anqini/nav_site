<template>
  <div>
    <NavBar id="sidebar" class="h-100" :showBar="show" :routeParam="$route.params"></NavBar>
    <div :class="combClass2">
        <Header @sidebar="sidebar($event)"></Header>
        <transition name="fade">
          <router-view :key="$route.fullPath"></router-view>
        </transition>
    </div>
  </div>
</template>

<script>
import header from './components/header.vue'
import footer from './components/footer.vue'
import main from './components/main.vue'
import navBar from './components/navBar.vue'

export default {
  components: {
    'Header': header,
    'Footer': footer,
    'Main': main,
    'NavBar': navBar
  },
  data () {
    return {
      show: true
    }
  },
  mounted() {

  },
  methods: {
    sidebar() {
      this.show = !this.show;
    }
  },
  computed: {
    combClass2() {
      return {
        mainpage: true,
        fullpage: !this.show
      }
    }
  }
}
</script>

<style scoped>

Header {
  position: fixed;
}
div {
  background-color: #efefef;
}
.mainpage {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 100;
  padding-left: 200px;
  transition: all 0.3s ease;
}
.fullpage {
  padding-left: 0px;
}
#sidebar {
  left: 0px;
  height: 100%;
  position: fixed;
  z-index: 1000;
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .5s;
}

.fade-enter-active {
  transition-delay: .5s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
