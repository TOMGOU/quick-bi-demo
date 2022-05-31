<template>
  <section class="dynamic-form">
    <el-form label-width="100px" label-position="left">
      <template v-for="(item, index) in options">
        <div v-if="isShowForm(item, '[object Object]')" :key="index">
            <!-- v-if="inputShow[item.name]" -->
          <el-form-item
            v-if="item.reverseStamp !== notShowType"
            :label="item.label"
            :prop="item.name"
            :required="item.required"
          >
            <el-input-number
              v-if="item.type == 'el-input-number'"
              size="mini"
              style="width:100%"
              v-model.trim="formData[item.name]"
              controls-position="right"
              @change="changed($event, item.name)"
            />

            <el-input
              v-if="item.type == 'el-input-text'"
              v-model.trim="formData[item.name]"
              type="text"
              size="mini"
              placeholder="请输入内容"
              clearable
              @change="changed($event, item.name)"
            />

            <el-input
              v-if="item.type == 'el-input-textarea'"
              v-model.trim="formData[item.name]"
              type="textarea"
              size="mini"
              rows="2"
              placeholder="请输入内容"
              @change="changed($event, item.name)"
            />

            <el-switch
              v-if="item.type == 'el-switch'"
              v-model="formData[item.name]"
              size="mini"
              placeholder="请输入内容"
              @change="changed($event, item.name)"
            />
            <color-picker
              v-if="item.type == 'vue-color'"
              v-model="formData[item.name]"
              @change="val => changed(val, item.name)"
            />
            <!-- <customUpload
              v-if="item.type == 'custom-upload'"
              v-model="formData[item.name]"
              @change="changed($event, item.name)"
            /> -->

            <el-radio-group
              v-if="item.type == 'el-radio-group'"
              v-model="formData[item.name]"
              @change="val => changed(val, item.name)"
            >
              <el-radio
                v-for="itemChild in item.selectOptions"
                :key="itemChild.code"
                :label="itemChild.code"
                >{{ itemChild.name }}</el-radio
              >
            </el-radio-group>

            <el-select
              v-if="item.type == 'el-select'"
              size="mini"
              v-model="formData[item.name]"
              clearable
              placeholder="请选择"
              @change="val => changed(val, item.name)"
            >
              <el-option
                v-for="itemChild in item.selectOptions"
                :key="itemChild.code"
                :label="itemChild.name"
                :value="itemChild.code"
              />
            </el-select>

            <el-slider
              v-if="item.type == 'el-slider'"
              v-model="formData[item.name]"
              @change="val => changed(val, item.name)"
            />

            <el-button
              v-if="item.type == 'el-button'"
              type="primary"
              size="mini"
              plain
              @click="addStaticData"
              >编辑</el-button
            >

            <!-- 弹窗 -->
            <el-dialog
              title="代码编辑"
              :visible.sync="dialogVisibleStaticData"
              width="50%"
              :before-close="handleClose"
            >
              <vue-json-editor
                v-model="formData[item.name]"
                :show-btns="false"
                :mode="'code'"
                lang="zh"
                class="my-editor"
              />
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleStaticData = false"
                  >取 消</el-button
                >
                <el-button type="primary" @click="saveData">确 定</el-button>
              </span>
            </el-dialog>
          </el-form-item>
        </div>
        <div v-else-if="isShowForm(item, '[object Array]')" :key="'a-' + index">
          <el-collapse accordion>
            <el-collapse-item
              v-for="(itemChild, indexChild) in item"
              :key="indexChild"
              :title="itemChild.name"
              :name="indexChild"
            >
              <template v-for="(itemChildList, idx) in itemChild.list">
                <el-form-item
                  :key="idx"
                  :label="itemChildList.label"
                  :prop="itemChildList.name"
                  :required="itemChildList.required"
                >
                  <el-input-number
                    v-if="itemChildList.type == 'el-input-number'"
                    size="mini"
                    style="width:100%"
                    v-model="formData[itemChildList.name]"
                    controls-position="right"
                    :placeholder="itemChildList.placeholder"
                    @change="changed($event, itemChildList.name)"
                  />

                  <el-input
                    v-if="itemChildList.type == 'el-input-text'"
                    v-model.trim="formData[itemChildList.name]"
                    type="text"
                    size="mini"
                    placeholder="请输入内容"
                    clearable
                    @change="changed($event, itemChildList.name)"
                  />

                  <el-input
                    v-if="itemChildList.type == 'el-input-textarea'"
                    v-model.trim="formData[itemChildList.name]"
                    size="mini"
                    type="textarea"
                    rows="2"
                    placeholder="请输入内容"
                    @change="changed($event, itemChildList.name)"
                  />

                  <el-switch
                    v-if="itemChildList.type == 'el-switch'"
                    v-model="formData[itemChildList.name]"
                    placeholder="请输入内容"
                    size="mini"
                    @change="changed($event, itemChildList.name)"
                  />

                  <color-picker
                    v-if="itemChildList.type == 'vue-color'"
                    v-model="formData[itemChildList.name]"
                    @change="val => changed(val, itemChildList.name)"
                  />

                  <el-upload
                    v-if="itemChildList.type == 'el-upload-picture'"
                    size="mini"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                  />

                  <el-radio-group
                    v-if="itemChildList.type == 'el-radio-group'"
                    v-model="formData[itemChildList.name]"
                    @change="val => changed(val, itemChildList.name)"
                  >
                    <el-radio
                      v-for="it in itemChildList.selectOptions"
                      :key="it.code"
                      :label="it.code"
                      >{{ it.name }}</el-radio
                    >
                  </el-radio-group>

                  <el-select
                    v-if="itemChildList.type == 'el-select'"
                    size="mini"
                    v-model="formData[itemChildList.name]"
                    clearable
                    placeholder="请选择"
                    @change="val => changed(val, itemChildList.name)"
                  >
                    <el-option
                      v-for="it in itemChildList.selectOptions"
                      :key="it.code"
                      :label="it.name"
                      :value="it.code"
                    />
                  </el-select>

                  <el-slider
                    v-if="itemChildList.type == 'el-slider'"
                    v-model="formData[itemChildList.name]"
                    @change="val => changed(val, itemChildList.name)"
                  />
                </el-form-item>
                <!-- <customColorComponents
                  v-if="itemChildList.type == 'customColor'"
                  :key="'b-' + idx"
                  v-model="formData[itemChildList.name]"
                  @change="changed($event, itemChildList.name)"
                /> -->
              </template>
            </el-collapse-item>
          </el-collapse>
        </div>
      </template>
    </el-form>
  </section>
</template>
<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ColorPicker from './ColorPicker.vue';
import VueJsonEditor from 'vue-json-editor'

@Component({
  components: {
    ColorPicker,
    VueJsonEditor
  },
})
export default class DynamicForm extends Vue {
  dialogVisibleStaticData = false
  formData = {}
  notShowType = 'staticData'
  @Prop({ default: () => ([]) }) options

  @Watch('options', { immediate: true, deep: true })
  onOptionChanged(val) {
    this.setDefaultValue()
  }

  setDefaultValue() {
    if (this.options && this.options.length > 0) {
      for (let i = 0; i < this.options.length; i++) {
        const obj = this.options[i];
        if (Object.prototype.toString.call(obj) == "[object Object]") {
          // this.deepClone 不存在
          this.formData[this.options[i].name] = this.deepClone(
            this.options[i].value
          );
          if (this.options[i].name === 'dataType') {
            this.notShowType = this.options[i].value
          }
        } else if (Object.prototype.toString.call(obj) == "[object Array]") {
          for (let j = 0; j < obj.length; j++) {
            const list = obj[j].list;
            list.forEach(el => {
              this.formData[el.name] = el.value;
            });
          }
        }
      }
      this.formData = Object.assign({}, this.formData);
    }
  }

  changed (val, key) {
    if (val.extend) {
      this.$set(this.formData, key, val.value);
    } else {
      this.$set(this.formData, key, val);
    }
    this.$emit("onChanged", this.formData)
    for (var i = 0; i < this.options.length; i++) {
      var item = this.options[i];
      if (item.relactiveDom == key) {
        this.inputShow[item.name] = val == item.relactiveDomValue;
        this.inputShow = Object.assign({}, this.inputShow);
      }
    }
  }

  handleClose() {
    this.dialogVisibleStaticData = false;
  }

  addStaticData() {
    this.dialogVisibleStaticData = true;
  }

  saveData() {
    this.$emit("onChanged", this.formData);
    this.dialogVisibleStaticData = false;
  }

  isShowForm(val, type) {
    return Object.prototype.toString.call(val) == type;
  }
}
</script>
<style lang="less" scoped>
  .dynamic-form {
    .el-form {
      text-align: left;
    }
    .el-form-item {
      margin-bottom: 0;
      color: #000;
      font-size: 12px;
      font-weight: 500;
    }
    /deep/.el-form-item__label {
      font-size: 12px;
    }
    .el-collapse {
      border-top: none;
      border-bottom: none;
      text-align: left;
    }
  }
</style>