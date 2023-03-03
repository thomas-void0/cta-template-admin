// 首次安装项目执行的，husky install逻辑。用于修复无.git文件夹导致的husky install报错
/* eslint-disable n/handle-callback-err */
const fs = require("fs")
const path = require("path")
const { exec } = require('child_process');

const gitDirPath = path.join(__dirname, "/.git")
const gitIgnorePath = path.join(__dirname, "/.gitignore")

// 获取git文件
fs.access(gitDirPath, err => {
	if (err) {
		gitInit((err, stdout, stderr) => stdout.includes("Initialized") && husakyInstall())
	} else {
		husakyInstall()
	}
})


// 获取.gitignore文件
function createGitIgnore() {
	try {
		fs.accessSync(gitIgnorePath)
	} catch (error) {
		const str = `
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`
		fs.writeFileSync(path.join(__dirname, ".gitignore"), str, { flag: "w" })
	}
}

function husakyInstall() {
	exec("husky install");
	// create .gitignore
	createGitIgnore()
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
		const result = pkgContent.replace('node ./gitInit.cjs', 'husky install');
		fs.writeFileSync(pkgPath, result, 'utf8');
	} catch (error) {
		console.log('Error: Found error for Modify package.json file.')
	}
}

