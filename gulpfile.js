const gulp = require('gulp');
// 阿里云 OSS 上传
const { argv } = require('yargs');
const aoss = require('./build/ali-oss');
const complexityOSS = require('./build/complexity-oss')

// 上传cdn文件
gulp.task('oss', () => {
  const { ACCESSKEYID } = process.env;
  const { ACCESSKEYSECRET } = process.env;
  const options = {
    prefix: argv.prefix,
    accessKeyId: ACCESSKEYID,
    accessKeySecret: ACCESSKEYSECRET,
    region: 'oss-cn-shanghai',
    bucket: 'lixin-assets',
  };
  return gulp.src(['www/**/*.*', '!www/**/*.html']).pipe(aoss(options));
});

gulp.task('complexity', () => {
  const { COMPLEXITY_ACCESSKEYID, COMPLEXITY_ACCESSKEYSECRET } = process.env;
  const options = {
    accessKeyId: COMPLEXITY_ACCESSKEYID,
    accessKeySecret: COMPLEXITY_ACCESSKEYSECRET,
    region: 'oss-cn-shenzhen',
    bucket: 'lixin-ops',
  };
  return complexityOSS(options)
})
