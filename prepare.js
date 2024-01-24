#!/usr/bin/env node

import fs from "fs"
import { exec } from "child_process"

// 如果没有.git则不进行husky初始化，主要为了处理vercel部署问题。
const gitExists = fs.existsSync('.git')
gitExists && exec('husky install', console.log)

// // 检测git是否初始化，如果没有初始化。默认生成.git
// if (!gitExists) {
// 	console.log("git init...")
// 	exec("git init", (err) => err ? console.log(err) : huskyInstall())
// } else {
// 	huskyInstall()
// }

// function huskyInstall() {
// 	exec('husky install', console.log)
// }
