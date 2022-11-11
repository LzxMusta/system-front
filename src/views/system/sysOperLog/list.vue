<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%; margin-top: 10px"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" /> -->
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="系统模块" />
      <el-table-column prop="businessType" label="操作类型" />
      <el-table-column prop="requestMethod" label="请求方式" />
      <el-table-column prop="operName" label="操作人员" />
      <el-table-column prop="operIp" label="操作IP地址" />
      <el-table-column prop="method" label="请求方法" />
      <el-table-column prop="status" label="操作状态" />
      <el-table-column prop="createTime" label="操作时间" width="160" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="findById(scope.row.id)"
            title="详情"
            >详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />

     <!-- 弹框 -->
    <el-dialog title="日志详情" :visible.sync="dialogVisible" width="40%">
      
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          icon="el-icon-check"
           @click="dialogVisible = false"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api/system/sysOperLog";

export default {
  // 定义数据模型
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: [], // 角色列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数

      dialogVisible:false,
    };
  },
  //页面渲染之前获取数据
  created() {
    this.fetchData();
  },
  // 定义方法
  methods: {
    fetchData(pageNum = 1) {
      this.page = pageNum;
      // 调用api
      api.getLogList(this.page, this.limit).then((response) => {
        // debugger;
        this.listLoading = false;
        this.list = response.data.records;
        this.total = response.data.total;
      });
    },
     //编辑
    findById(id) {
      api.findSysLoginLogById(id).then((response) => {
        this.dialogVisible = true
        this.sysRole = response.data;
      });
    },
  },
};
</script>