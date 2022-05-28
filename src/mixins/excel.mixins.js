/**
 * mixin excel 导入/导出/更新
 */
import UploadExcel from '../components/UploadExcel.vue';

export default {
  components: {
    UploadExcel,
  },
  methods: {
    /**
     * 页面初始化请求，是否有历史查询记录
     * @param {*} res ajax res
     * @param {*} url res result_oss_filename
     * @param {*} cb 修改data数据的回调函数
     */
    initExcel(res, url, cb) {
      if (res.code === 0) {
        if (res.task.status === 'completed') {
          this.actionStates.hasRecord = true;
          this.resultObj.downBeforeUrl = url;
        } else {
          this.actionStates.hasRecord = false;
        }
        // 此回调函数与请求状态无关
        if (typeof cb === 'function') {
          cb();
        }
      } else {
        this.$message.error(res.error || '当前网络环境不稳定');
      }
    },
    /**
     * 轮询查询结果，展示不同的界面
     * @param {*} res ajax res
     * @param {*} url res result_oss_filename
     * @param {*} cb 修改data数据的回调函数
     */
    setIntervalQuery(res, url, cb) {
      if (res.code === 0) {
        switch (res.task.status) {
          case 'completed':
            this.actionStates.isLoading = false;
            this.actionStates.isEnter = true;
            this.actionStates.isComplete = true;
            cb();
            this.resultObj.downUrl = url;
            clearInterval(this.timerId);
            break;
          case 'failed':
            this.actionStates.isEnter = true;
            this.actionStates.isComplete = false;
            this.$message.error(res.task.status);
            clearInterval(this.timerId);
            break;
          case 'started':
          case 'created':
            break;
          default:
            break;
        }
      } else {
        this.$message.error(res.error);
      }
    },
  },
};
