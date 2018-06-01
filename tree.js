var fs = require('fs');
var dirPath = require('path');
var filePath = dirPath.resolve(__dirname); //当前文件夹目录
var fileArr = []; //读取文件存储数组
var ignores = ['node_modules','dist'] //需要忽略的文件夹
var charSet = {
    'node': '├── ', //节点
    'pipe': '│   ', // 上下链接
    'last': '└── ', // 最后的file或folder需要回勾
    'indent': '    ' // 缩进
};
function readFile(path,level) {
    var files = fs.readdirSync(path); //同步读取文件列表
    files.forEach(function (filename,index) {
        if (ignores.includes(filename)) {
            console.log(filename + "已经忽略"); //忽略文件夹
        } else {
            var stats = fs.statSync(path + '/' + filename);
            if (stats.isFile()) {
                if (level === 1) {
                    fileArr.push(charSet.node + filename);
                } else {
                    var arr = '';
                    for (var i = 2; i < level; i++) {
                        arr += charSet.indent;
                    }
                    fileArr.push(charSet.pipe + arr + charSet.last + filename);
                }
                writeFile(fileArr);
            } else if (stats.isDirectory()) {
                if (level===1) {
                    fileArr.push(charSet.node + filename);
                } else {
                    var str = '';
                    for (var i = 2; i < level; i++) {
                        str += charSet.indent;
                    }
                    fileArr.push(charSet.pipe + str + charSet.node + filename);
                }
                writeFile(fileArr);
                readFile(path + '/' + filename, level+1);
            }
        }
    });
}
function writeFile(data) {
    var data = data.join("\n");
    fs.writeFile(filePath + "/" + "filelist.md", data + '\n', function (err) {
        if (err) throw err;
    });
}
readFile(filePath,1);