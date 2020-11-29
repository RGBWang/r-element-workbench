<template>
  <div id="app">
    <sidebar  @select="select"></sidebar>
    <div class="contentdiv">
 <brandpage v-show="activePage=='brandpage'"></brandpage>
    <mapeditor v-show="activePage=='mapeditor'"></mapeditor>
    </div>
   
  </div>
</template>

<script>
import BrandPage from './components/brandPage.vue';
export default {
  name: "App",
  data(){
  return {activePage:null};
  },
  components: {
    sidebar: () => import("./components/sidebar"),
    brandpage:()=>import("./components/brandPage"),
    mapeditor:()=>import("./components/mapEditor")
  },
   methods: {
    select(index, indexPath) {
      this.activePage=index;
    },
  
  },
};
</script>

<style>
@import url("../node_modules/element-ui/lib/theme-chalk/index.css");
body{
  margin: 0;
  padding: 0;
 
}
#app{
     height: 100vh;
     display: grid;
     grid-template-columns: auto 1fr;
     background-color: #f0f2f5;
}
.contentdiv{
  height: 100%;
}
</style>
