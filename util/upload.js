const fs = require('fs');
const path = require('path');
const multer = require('koa-multer');

function mkdirs(dirpath) {
  if (!fs.existsSync(path.dirname(dirpath))) {
    mkdirs(path.dirname(dirpath));
  }
  fs.mkdirSync(dirpath);
}

var storage = multer.diskStorage({
//定义文件保存路径
destination: function (req, file, cb) {
  let date = new Date();
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDay()

  let staticPath = `./upload/static/${year}/${month}/${day}`

  fs.readdir(staticPath, (err) => {
    if (err) {
      mkdirs(staticPath)
    }
  })

  cb(null, staticPath);//路径根据具体而定。如果不存在的话会自动创建一个路径
},
//修改文件名
filename: function (req, file, cb) {
  console.log(file)
  var fileFormat = (file.originalname).split(".");
  cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
}
})

module.exports = multer({ storage: storage });
