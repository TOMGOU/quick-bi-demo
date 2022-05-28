/**
 * mixin editor
 */
import VueUEditor from 'vue-ueditor';

export default {
  components: {
    VueUEditor,
  },
  data () {
    return {
      // cdn 路径
      ueditorPath: `${this.$store.state.cdnCommon}ueditor/1.4.3/`,
      // 富文本编辑器配置
      editorConfig: {
        UEDITOR_HOME_URL: `${this.$store.state.cdnCommon}ueditor/1.4.3/`,
        enableAutoSave: false,
        imageActionUrl: '/image_upload_ueditor',
        referrer: '',
      },
      editorContent: '',
      isDataReady: false,
      isEditorReady: false,
      editorInstance: {},
    };
  },
  watch: {
    isDataReady() {
      if (this.isDataReady && this.isEditorReady) {
        // debugger
        this.editorInstance.setContent(this.editorContent);
      }
    },
    isEditorReady() {
      if (this.isDataReady && this.isEditorReady) {
        this.editorInstance.setContent(this.editorContent);
      }
    },
  },
  methods: {
    initEditor() {
      this.editorContent = '';
      this.isDataReady = false;
      this.isEditorReady = false;
      this.editorInstance = {};
    },
    editorReady(editorInstance) {
      this.isEditorReady = true;
      this.editorInstance = editorInstance;
      editorInstance.addListener('contentChange', () => {
        this.editorContent = editorInstance.getContent();
      });
    },
  },
};
