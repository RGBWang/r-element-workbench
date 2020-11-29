<template>
  <div class="leftBar fixWidth">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo fixWidth"
        @select="select"
        background-color="#1f2d3d"
        text-color="#bfcbd9"
        :default-active="defaultactive"
        active-text-color="#409eff"
      >
        <el-submenu  index='1' class="fixWidth">
          <template slot="title">
            <i class="el-icon-s-promotion"></i>
            <span>地图</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="mapeditor">地图编辑器</el-menu-item>
            <el-menu-item index="inf">公共设施</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index='2'>
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>品牌</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="brandpage">品牌列表</el-menu-item>
            <el-menu-item index="brandclass">品牌业态</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="3">
          <i class="el-icon-info"></i> <span>信息公示</span></el-menu-item
        >
        <el-menu-item index="4">
          <i class="el-icon-s-home"></i> <span>关于我们</span></el-menu-item
        >
        <el-menu-item index="5">
          <i class="el-icon-s-tools"></i> <span>软件设置</span></el-menu-item
        >
      </el-menu>
  </div>
</template>

<script>
export default {
  data(){
    return {defaultactive:'brandpage'};
  },
  methods: {
    select(index, indexPath) {
      this.$emit("select",index,indexPath);
    },
  
  },
   mounted:function(){
      this.$emit("select",this.defaultactive);
   }
};
</script>

<style>
  .leftBar{
    background-color: #1f2d3d;
    height: 100%;
    box-shadow: 0 0 5px 0 black;
    z-index: 1;
  }

  .fixWidth{
     width: 175px;
     overflow: hidden;
  }

 
</style>