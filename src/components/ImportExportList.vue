<template>
  <div class="batch-processing-list">
      <div class="header-wrapper">
        <explain
          :list="listObj.explainText"
        />
        <div class="header__operation">
          <span class="operation__batch-update"><i :class="listObj.headerLeft.icon"></i>{{listObj.headerLeft.text}}</span>
          <slot name="operation"></slot>
          <span class="operation__upload" v-for="(item, index) in listObj.headerRight" :key="index" @click="handleCreate(listObj.type, item)">
            <el-upload
              v-if="item.type === 'import'"
              accept="xlsx"
              :show-file-list="false"
              :headers="tokenCookie"
              :action="importUrl"
              :before-upload="beforeUpload"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              >
              <i :class="item.icon"></i>{{item.text}}
            </el-upload>
            <span v-else><i :class="item.icon"></i>{{item.text}}</span>
          </span>
        </div>
      </div>
      <div class="content-wrapper">
        <el-table :data="listObj.list" :highlight-current-row="true" style="width: 100%;">
          <el-table-column label="序号" min-width="60" align="left" header-align="left">
            <template slot-scope="scope">{{scope.row.id}}</template>
          </el-table-column>
          <el-table-column label="导出时间" min-width="150">
            <template slot-scope="scope">{{scope.row.created_at}}</template>
          </el-table-column>
          <el-table-column label="状态" min-width="70">
            <template slot-scope="scope"><span :class="{'cr': scope.row.status_name === '已失败'}">{{ scope.row.status_name }}</span></template>
          </el-table-column>
          <el-table-column label="进度" min-width="110">
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="Math.min(+scope.row.progress, 100)"></el-progress>
            </template>
          </el-table-column>
          <el-table-column label="数据总数">
            <template slot-scope="scope">{{ scope.row.exported_count }}</template>
          </el-table-column>
          <el-table-column label="导出人员" min-width="150">
            <template slot-scope="scope">{{ scope.row.requester.name }}</template>
          </el-table-column>
          <el-table-column label="操作" min-width="125">
            <template slot-scope="scope">
              <div v-if="listObj.type !== 'export'"><el-button type="text" size="small" @click="handleDownload(scope.row, 'source')">下载源文件</el-button><br></div>
              <div v-if="scope.row.status_code === 'completed'"><el-button type="text" size="small"  @click="handleDownload(scope.row, 'result')">{{downLoadText}}</el-button></div>
              <el-popover v-if="scope.row.status_name === '已失败'" placement="left" trigger="click">
                <div class="el-popover__header">
                  <span class="f16">失败原因</span>
                </div>
                <div class="import-export-popover">{{ scope.row.remark }}</div>
                <el-button type="text" size="small" slot="reference">查看失败原因</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="pageOption.page"
        :page-size="pageOption.count"
        layout="total, pager, jumper, slot"
        :total="listObj.total">
      </el-pagination>
  </div>
</template>
<script>

import cookie from '@/common/cookie';
import cache from '@/common/cache'
import Explain from './Explain.vue';

export default {
  components: {
    Explain,
  },
  data() {
    return {
      pageOption: {
        page: 1,
        count: 10,
      },
      popoverShow: false,
      tokenCookie: {},
    };
  },
  props: {
    importUrl: null,
    listObj: {
      type: null, // 列表类型：导入、导出、批量更新
      explainText: [], // 说明文案
      headerLeft: {}, // 表格左上配置
      headerRight: [], // 表格右上配置
      total: 0, // 数据总数
      list: [], // 列表数据
    },
  },
  computed: {
    downLoadText () {
      const listObjType = this.listObj.type === 'import' ? '查看导入结果' : '下载导出文件';
      return this.listObj.type === 'update' ? '查看更新结果' : listObjType;
    },
    createTimeText () {
      return this.listObj.type === 'export' ? '导出时间' : '上传时间';
    },
    operatorText () {
      return this.listObj.type === 'export' ? '导出人员' : '导入人员';
    },
    retryText () {
      return this.listObj.type === 'export' ? '重新导出' : '重新导入';
    },
  },
  activated () {
    this.tokenCookie = {
      'X-CSRF-Token': cookie.getCookie('csrf-token'),
      'access_token': cache.getLocalStorageData('access_token')
    };
  },
  methods: {
    // 翻页事件
    handleCurrentChange (value) {
      this.pageOption.page = value;
      this.$emit('on-change', this.pageOption);
    },
    // 下载文件
    handleDownload (row, type) {
      this.$emit('on-download', {
        ...row,
        type,
        // fileType: row.type,
      });
    },
    handleCreate (type, item) {
      if (item.type === 'download') {
        // 下载更新模板
        window.location.href = item.url;
      } else {
        // 创建新任务
        this.$emit('on-execute', this.pageOption);
      }
    },
    // 导入之前
    beforeUpload(file) {
      const isXLSX = (file.name && file.name.endsWith('.xlsx')) || file.name.endsWith('.xls');
      if (!isXLSX) {
        this.$message.error('文件必须是.xlsx或.xls格式');
        throw new Error(`文件必须是.xlsx或.xls格式, fileName: ${file.name}`);
      }
      return isXLSX;
    },
    uploadError(err, file, fileList) {
      this.$message.error(err.message);
    },
    uploadSuccess(res) {
      // 上传文件成功以后创建导入任务
      this.$emit('on-import-success', res.data);
    },
  },
};
</script>

<style lang="less">
@import "../assets/styles/base/fn";
.import-export-popover {
  // width: 300px;
  padding: 0 20px;
  text-align: center;
  font-size: 16px;
  height: 46px;
  line-height: 46px;
}
.batch-processing-list {
  width: @wrapper-main;
  margin: 0 auto;
  .el-pagination {
    padding-left: 20px;
    padding-right: 20px;
    background: #fff;
  }
  .el-progress {
    margin-top: 5px;
  }
  .cr {
    color: red;
  }
  .header-wrapper {
    background: #fff;
    padding: 20px 20px 0 20px;
    .header__operation {
      height: 52px;
      line-height: 52px;
      .operation__batch-update {
        font-size: 14px;
        font-weight: bold;
        i {
          display: inline-block;
          margin-right: 10px;
          width: 17px;
          height: 18px;
          color: #4768b0;
          vertical-align: middle;
        }
      }
      .operation__upload {
        float: right;
        color: @color-primary;
        cursor: pointer;
        margin-left: 16px;
        i {
          margin-right: 6px;
        }
        a {
          color: @color-primary;
        }
      }
    }
  }
  .content-wrapper {
    background: #fff;
    padding: 0 20px;
  }
}
</style>
