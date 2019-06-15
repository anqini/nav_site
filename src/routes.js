import main from './components/main.vue';
import uni_detail from './components/uni-details.vue'
import web_detail from './components/web-details.vue'
import cate from './components/category.vue'
import searchResult from './components/searchResult.vue'

export default [
  { path:'/', component:main },
  { path:'/catagory/:type', component: cate},
  { path:'/detail/uni/:id', component: uni_detail },
  { path:'/detail/web/:id', component: web_detail },
  { path:'/search/:search', component: searchResult }
]
