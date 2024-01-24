module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				'feat', // 新功能（feature）
				'fix', // 修补bug
				'docs', // 文档（documentation）
				'style', // 格式（不影响代码运行的变动）
				'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
				'test', // 增加测试
				'perf', // 优化相关，比如提升性能，体验
				'revert', // 回滚到上一个版本
				'config', // 构建过程或辅助工具的变动
				'chore', // 改变构建流程，或者增加依赖库，工具等
				'build', // 依赖相关内容
				'ci', // 配置相关
				'update', // 更新代码、功能操作
				'wip' // 临时存储
			]
		],
		'type-case': [0],
		'type-empty': [0],
		'scope-empty': [0],
		'scope-case': [0],
		'subject-full-stop': [0, 'never'],
		'subject-case': [0, 'never'],
		'header-max-length': [0, 'always', 72]
	}
}
