const xl = require('xlsx');
const fs = require('fs');
const path = require('path');

let args = process.argv.splice(2);

console.log(args)

if (!args[0]) return;

let input, output, dir;

if (args[0] && (args[0].endsWith('.xls') || args[0].endsWith('.xlsx'))) {
  input = args[0];
  output = args[1] && args[1] + '.json' || 'output.json';
  dir = args[2] || path.resolve(__dirname, '../');
} else {
  console.log('只能转换excel格式文件!');
}

//workbook 对象，指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
const workbook = xl.readFile(input)

const sheetNames = workbook.SheetNames;

const worksheet = workbook.Sheets[sheetNames[0]];

//返回json数据
let data = xl.utils.sheet_to_json(worksheet);

console.log('data:', data);

if (output) {
  let dataStr = JSON.stringify(data);
  fs.writeFile(dir + '/' + output, dataStr, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('转换成功!');
    }
  })
}


// console.log('TODO 将转换后的数据显示到浏览器页面上!')