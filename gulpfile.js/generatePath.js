const path = require('path');
const fs = require('fs');
const watch = require('gulp-watch');
const jsonFormat = require('json-format');

// 小程序示例目录
const demoDir = `${path.resolve()}/src`;
// 路径文件初始化内容
const TPL_CONTENT = `export const PATH =  {

};`

// 查找是否有指定的文件夹名，返回其相关信息，包含两个属性，key为以相对于项目根目录的路径，value为其下文件列表
function lookUpDir(path) {

  let result = [];

  const fileList = fs.readdirSync(path);
  fileList.forEach(fileName => {
    let subPath = `${path}/${fileName}`;
    let stat = fs.statSync(subPath);

    if (stat.isFile()) return;

    if (fileName === 'pages') {
      let key = subPath.replace(`${demoDir}/`, '');
      let fl = fs.readdirSync(subPath);
      fl = fl.filter(fileName => {
        return fs.statSync(`${subPath}/${fileName}`).isDirectory();
      });
      result.push({
        key,
        value: fl,
      });
    } else {
      result = [].concat(result, lookUpDir(subPath));
    }

  })

  return result;
}

// 读取app.json内容，返回一个json对象
function getAppJson() {

  const path = `${demoDir}/app.json`;

  const content = fs.readFileSync(path, {
    flag: 'r',
    encoding: 'utf8',
  });

  return JSON.parse(content);

}

// 创建constant/path.js文件并初始化
function createPathFile() {

  const dir = `${demoDir}/constant`;

  try {
    let fl = fs.readdirSync(dir);
    if (!fl.includes('path.js')) {
      fs.writeFileSync(`${dir}/path.js`, TPL_CONTENT);
    }
  } catch (e) {
    fs.mkdirSync(dir);
    fs.writeFileSync(`${dir}/path.js`, TPL_CONTENT);
  }

}

// 格式化写入内容
function writeFormattingContent(path, contentJson, insertBefore = '', insertAfter = '') {

  let formattingContent = jsonFormat(contentJson, {
    type: 'space',
    size: 2
  });
  fs.writeFileSync(path, insertBefore + formattingContent + insertAfter);

}

function generatePathTask(done) {

  // 获取所有pages文件夹的文件列表
  let targetDir = lookUpDir(demoDir);
  // console.log(targetDir);

  // 获取app.json内容
  let appJson = getAppJson();
  // console.log(appJson);

  // 若没有这个文件，则先创建constant/path.js文件并初始化，否则什么都不做
  createPathFile();
  let path = {};

  console.log('----------> 第一步：获取信息并初始化完毕 ');

  // 确定每个文件夹是主包还是分包
  let hasSubpack = false;
  for (let pair of targetDir) {
    // console.log(pair.key, pair.value);
    if (pair.key === 'pages') {
      // 主包
      // 根据路径信息更新app.json文件的pages字段
      appJson.pages = pair.value.map(val => {
        return `pages/${val}/${val}`
      });
      // 根据路径信息获取键和值，键为页面名称大写形式，若是复合名称取第一个单词，值为页面路径，若没有则插入json
      pair.value.forEach(val => {
        val = val.split('-')[0];
        path[val.toUpperCase()] = `/pages/${val}/${val}`;
      });
    } else {
      hasSubpack = true;
      // 分包
      // 根据路径信息更新app.json文件的subpackages字段某一元素下的pages字段。若没有则添加，其中该元素属性root为pages目录的父目录名称
      let subPackName = pair.key.replace('/pages', '');
      appJson.subpackages = appJson.subpackages || [];
      let idx = appJson.subpackages.findIndex(item => {
        return item.root === subPackName;
      });
      if (idx > -1) {
        appJson.subpackages[idx].pages = pair.value.map(val => {
          return `pages/${val}/${val}`
        })
      } else {
        appJson.subpackages.push({
          root: subPackName,
          name: subPackName,
          independent: false,
          pages: pair.value.map(val => {
            return `pages/${val}/${val}`
          }),
        })
      }
      // 根据路径信息获取键和值，键为分包名称大写形式，值的处理同主包
      let subVal = {};
      pair.value.forEach(val => {
        val = val.split('-')[0];
        subVal[val.toUpperCase()] = `/${pair.key}/${val}/${val}`;
      });
      path[subPackName.toUpperCase()] = subVal;
    }
  }
  if (!hasSubpack && appJson.subpackages) {
    appJson.subpackages = [];
  }

  console.log('----------> 第二步：数据更新完毕 ');

  // 所有文件夹遍历结束，按一定格式写入到app.json和constant/path.js文件
  writeFormattingContent(`${demoDir}/app.json`, appJson);
  writeFormattingContent(`${demoDir}/constant/path.js`, path, 'export const PATH =  ', ';');

  console.log('----------> 第三步：更新信息写入完毕 ');

  toString.call(done) === '[object Function]' && done();
}

exports.generatePathTask = generatePathTask;

exports.watchPathTask = function() {

  // FIXME:暂时只能监听所有pages文件夹下的文件列表是否删除，而重命名、移动、新增尚未实现
  watch('demo/**/pages/*', {
    events: ['unlinkDir'],
  }, function() {
    return generatePathTask();
  });
}
