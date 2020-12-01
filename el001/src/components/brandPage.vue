<template>
  <div class="page">
    <div class="main">
      <div class="commandBar">
        <el-button type="primary">新增</el-button>
        <el-button type="danger">删除</el-button>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="tableHeader">
        <div class="column1">行号</div>
        <div class="column2">名称</div>
        <div class="column3">Logo</div>
        <div class="column4">首字母</div>
        <div class="column5H">描述详情</div>
        <div class="column6">操作</div>
      </div>
      <div class="datatable">
        <div class="datarow" v-for="(item, index) in dataStage" :key="item.ID">
          <div class="column1">{{ index + 1 }}</div>
          <div class="column2">{{ item.Name }}</div>
          <div class="column3">
            <el-image
              class="img"
              v-show="hasImage(item.Logo)"
              :src="toImageUri(item.Logo)"
              :lazy="true"
              :fit="'contain'"
            ></el-image>
          </div>
          <div class="column4">{{ item.Initial }}</div>
          <div class="column5">
            <div class="desc">{{ item.Desc }}</div>
          </div>
          <div class="column6">
            <el-button type="primary" @click="itemClick(item)">编辑</el-button>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[25, 50, 75, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataList.length"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 编辑弹窗 -->
    <div>
      <el-dialog
        title="品牌编辑"
        :visible.sync="dialogVisible"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="品牌名称：">
            <el-input v-model="currentRowVM.Name"></el-input>
          </el-form-item>
          <el-form-item label="首字母：">
            <el-input v-model="currentRowVM.Initial"></el-input>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" height="150px" v-model="currentRowVM.Desc"></el-input>
          </el-form-item>

        
        </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >提 交</el-button
            >
          </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 25,
      dataList: [],
      dataStage: [],
      dialogVisible: false,
      currentRowVM: {},
    };
  },
  watch: {
    currentPage() {
      this.refreshDataState();
    },
    pageSize() {
      this.refreshDataState();
    },
  },
  methods: {
    itemClick(item) {
      if (item == false) {
        return;
      }
      this.dialogVisible = true;
      let str = JSON.stringify(item);
      this.currentRowVM = JSON.parse(str);
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    refreshDataState() {
      this.dataStage.splice(0, this.dataStage.length);
      for (let i = 0; i < this.pageSize; i++) {
        var index = (this.currentPage - 1) * this.pageSize + i;
        if (index < this.dataList.length) {
          this.dataStage.push(this.dataList[index]);
        } else {
          break;
        }
      }
    },
    toImageUri(uri) {
      if (this.hasImage(uri) == false) {
        return null;
      }
      return `http://47.99.206.102:8410/image?uri=${uri}&height=30`;
      console.log(uri);
    },
    hasImage(uri) {
      return uri && uri != "";
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.dataList.length / this.pageSize);
    },
  },

  mounted() {
    let vm = this;
    fetch("http://47.99.206.102:8410/getdata?tablename=brand")
      .then((s) => s.json())
      .then((s) => {
        s.forEach((it) => vm.dataList.push(it));
        vm.refreshDataState();
      });
  },
};
</script>

<style scoped>
.page {
  height: 100%;
}
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: stretch;
  background-color: white;
}

.datatable {
  flex: 1 1 120px;
  overflow-y: scroll;
  overflow-x: hidden;

  margin-left: 30px;
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
  border-top: 1px solid #eee;
}

.tableHeader {
  font-weight: bold;
  display: flex;
  color: #909090;
  margin-left: 30px;
  border-bottom: 1px solid #aaa;
  height: 36px;
  align-items: center;
  white-space: nowrap;
}
.datarow {
  display: flex;
  height: 31px;
  text-overflow: ellipsis;
  overflow: hidden;
  border-bottom: 1px solid #eee;
  align-items: center;
  text-align: left;
}
.column1 {
  width: 80px;
  flex: 0 0 auto;
}
.column2 {
  width: 150px;
  flex: 0 0 auto;
}
.column3 {
  flex: 0 0 150px;
}
.img {
  height: 30px;
  vertical-align: middle;
}
.column4 {
  width: 80px;
  flex: 0 0 auto;
}
.column5H {
  flex: 1 1 auto;
}
.column5 {
  flex: 1 1 auto;
  align-self: start;
  overflow: hidden;
}
.column5 > div {
  line-height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-right: 10px;
}
.column6 {
  width: 100px;
  flex: 0 0 auto;
}
</style>

