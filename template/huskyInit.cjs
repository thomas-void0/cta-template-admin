// 首次安装项目执行的，husky install逻辑。用于修复无.git文件夹导致的husky install报错
/* eslint-disable n/handle-callback-err */
const fs = require("fs")
const path = require("path")
const { exec } = require('child_process');

const gitDirPath = path.join(__dirname, "/.git")

// 获取git文件
fs.access(gitDirPath, err => {
	if (err) {
		gitInit((err, stdout, stderr) => stdout.includes("Initialized") && husakyInstall())
	} else {
		husakyInstall()
	}
})


function husakyInstall() {
	exec("husky install");
	// modify pkg
	modifyPkg()
	// del file
	fs.rm(__filename, (err) => { err && console.log("Error: Found error for del huskyInit.cjs file, please try deleting manually.") })
}

function gitInit(callback) {
	exec("git init", callback)
}

function modifyPkg() {
	try {
		const pkgPath = path.join(__dirname, "/package.json")
		const pkgContent = fs.readFileSync(pkgPath, 'utf8')
		const result = pkgContent.replace('"node ./huskyInit.cjs"', '"husky install"');
		fs.writeFileSync(pkgPath, result, 'utf8');
	} catch (error) {
		console.log('Error: Found error for Modify package.json file.')
	}
}

