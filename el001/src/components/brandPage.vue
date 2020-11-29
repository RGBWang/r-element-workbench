<template>
  <div class="flexcontainer">
    <div class="commandBar">
      <el-button type="primary">新增</el-button>
      <el-button type="danger">删除</el-button>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <div class="datatable">
      <el-table
        ref="multipleTable"
        :data="dataStage"
          :row-style="{height: '30px'}"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="Name"
          label="品牌名"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="Initial"
          label="首字母"
          width="180"
        ></el-table-column>
        <el-table-column prop="Desc" label="详情"> </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
         <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[25, 50, 75,100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataList.length">
    </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    click() {
      console.log(arguments.callee);
    },
       cellstyle(){
      return "locacell";
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.refreshDataState();
      },
      handleCurrentChange(val){
 this.currentPage=val;
        this.refreshDataState();
      },
      refreshDataState(){

        this.dataStage.splice(0,this.dataStage.length);
        for (let i = 0; i < this.pageSize; i++) {
          var index=(this.currentPage-1)*this.pageSize+i;
          if(index<this.dataList.length){
            this.dataStage.push(this.dataList[index]);
          }
          else{
            break;
          }
          
        }
      }
  },
  computed:{
    totalPages(){
      return Math.ceil(this.dataList.length/this.pageSize);
    }
  },
  data() {
    return { 
      currentPage:1,
      pageSize:25,
      dataList:[],
      dataStage: [],
   
       };
  },
  mounted() {
    let vm = this;
    fetch("http://47.99.206.102:8410/getdata?tablename=brand")
      .then((s) => s.json())
      .then((s) =>{ s.forEach((it) => vm.dataList.push(it));
      vm.refreshDataState();});
  },
};
</script>

<style>
.flexcontainer {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: stretch;
  background-color: white;
}

.datatable {
  flex: 1 1 120px;
  overflow-y: scroll;
}
.commandBar {
  background-color: #eef1f6;
  border-radius: 5px;
  margin: 10px 25px;
  flex: 0 0 50px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination {
  flex: 0 0 50px;
  text-align: center;
}

.locacell{
  max-height: 30px;
}
</style>