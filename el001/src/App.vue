<template>
  <div id="app">
    <sidebar class="sidebar" @select="select"></sidebar>
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
     display: flex;
     flex-direction:  row;
     background-color: #f0f2f5;
}
.contentdiv{
  height: 100%;
  flex: 1 1 auto;
}
.sidebar{
  flex: 0 0 auto;
    width: 175px;
    min-width: 175px;
}
</style>
