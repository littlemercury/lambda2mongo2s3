exports.handler = function (event, context) {
var mongoBackup = require(‘mongo-backup-to-s3’);
console.log(‘creating config’);
var config = {
  mongodb:{
    url: ‘mongodb://:@<ENTER MONGODB URL>’
  },
  s3:{
    bucket:”<S3 BUCKET>",
    folder:”<S3 FOLDER>",
    key: ”<KEY>",
    secret: ”<SECRET>"
  }
};
  mongoBackup.dumpToS3(config);
  context.succeed();
}
