<template>
  <div>
    <canvas ref="qrcode"></canvas>
  </div>
</template>
<script lang="ts">
import QRCode from './qrcode';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class QRCodePage extends Vue {
  @Prop({default: 120}) private width: Number
  @Prop({default: 120}) private height: Number
  @Prop({default: -1}) private typeNumber: Number
  @Prop({default: 2}) private correctLevel: Number
  @Prop({default: '#ffffff'}) private background: String
  @Prop({default: '#000000'}) private foreground: String
  @Prop({required: true}) private value: String
  @Prop({default: 'qrcode.png'}) private fileName: String
  
  qrcode: any = null

  mounted() {
    this.createCanvas();
  }

  createCanvas() {
    const canvas: any = this.$refs.qrcode;
    const {
      background,
      foreground,
      correctLevel,
      typeNumber,
      width,
      height,
      value,
    }: any = this;
    const qrcode: any = new QRCode(typeNumber, correctLevel);
    this.qrcode = qrcode;
    qrcode.addData(value);
    qrcode.make();
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    // compute tileW/tileH based on width/height
    const tileW = width / qrcode.getModuleCount();
    const tileH = height / qrcode.getModuleCount();
    // draw in the canvas
    for (let row = 0; row < qrcode.getModuleCount(); row++) {
      for (let col = 0; col < qrcode.getModuleCount(); col++) {
        ctx.fillStyle = qrcode.isDark(row, col) ? foreground : background;
        const w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
        const h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
        ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h);
      }
    }
  }

  download (name) {
    const canvas: any = this.$refs.qrcode;
    name = name || this.fileName;
    if (window.navigator.msSaveBlob) { // ie11
      window.navigator.msSaveBlob(canvas.msToBlob(), name);
    } else if (!!(window as any).ActiveXObject || 'ActiveXObject' in window) { // ie11 以下
      // this.downloadInIE(canvas)
    } else { // 非ie
      const a = window.document.createElement('a');
      a.href = canvas.toDataURL();
      a.download = name;
      window.document.body.appendChild(a);
      a.click();
      a.remove();
    }
  }

  downloadInIE (canvas) {
    const op: any = window.open(canvas.toDataURL(), '', 'width=1,height=1,top=5000,left=5000');
    for (; op.document.readyState !== 'complete';) {
      if (op.document.readyState === 'complete') {
        break;
      }
    }
    op.document.execCommand('SaveAs');
    op.close();
  }

  @Watch('background')
  backgroundChange() {
    this.qrcode.background = this.background;
  }

  @Watch('foreground')
  foregroundChange() {
    this.qrcode.foreground = this.foreground;
  }

  @Watch('correctLevel')
  correctLevelChange() {
    this.qrcode.correctLevel = this.correctLevel;
  }

  @Watch('width')
  widthChange() {
    this.qrcode.width = this.width;
  }

  @Watch('height')
  heightChange() {
    this.qrcode.height = this.height;
  }

  @Watch('typeNumber')
  typeNumberChange() {
    this.qrcode.typeNumber = this.typeNumber;
  }

  @Watch('value')
  valueChange() {
    this.qrcode.value = this.value;
  }
};
</script>
