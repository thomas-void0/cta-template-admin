import { round } from 'lodash-es'

// 获取环境变量
export function getEnv() {
	return import.meta.env.VITE_NODE_ENV
}

/**
 * 下载图片
 * @param imgSrc 图片地址
 * @param name 下载图片名称
 */
export const downloadIamge = (imgSrc: string, name?: string) => {
	const image = new Image()
	// 解决跨域 Canvas 污染问题
	image.setAttribute('crossOrigin', 'anonymous')
	image.onload = function () {
		const canvas = document.createElement('canvas')
		canvas.width = image.width
		canvas.height = image.height
		const context = canvas.getContext('2d')
		context?.drawImage(image, 0, 0, image.width, image.height)
		const url = canvas.toDataURL('image/png') // 得到图片的base64编码数据
		const a = document.createElement('a') // 生成一个a元素
		const event = new MouseEvent('click') // 创建一个单击事件
		a.download = name || '下载'
		a.href = url // 将生成的URL设置为a.href属性
		a.dispatchEvent(event) // 触发a的单击事件
	}
	image.src = imgSrc
}

// 复制文本
export const copy = (text: string | number): boolean => {
	if (!text) return false

	const textArea = document.createElement('textarea')

	textArea.style.position = 'fixed'

	textArea.style.top = '0'

	textArea.style.left = '0'

	textArea.style.width = '2em'

	textArea.style.height = '2em'

	textArea.style.padding = '0'

	textArea.style.border = 'none'

	textArea.style.outline = 'none'

	textArea.style.boxShadow = 'none'

	textArea.style.background = 'transparent'

	textArea.value = text.toString()

	document.body.appendChild(textArea)

	textArea.select()

	document.body.removeChild(textArea)

	return !!document.execCommand('copy')
}

/**
 * 下载excel
 * @param param0
 * @returns
 */
export const promiseDownloadExcel = ({
	url,
	data,
	method = 'post',
	filename,
	headers
}: {
	url: string
	data: any
	method: 'post' | 'get'
	filename?: string
	headers?: any
}) => {
	function _download(data: any, filename: any) {
		// @ts-ignore
		if (typeof window.chrome !== 'undefined') {
			// Chrome version
			const blob = new Blob([data], { type: 'application/vnd.ms-excel' })
			const link = document.createElement('a')
			link.href = window.URL.createObjectURL(blob)
			link.download = filename
			link.click()
			// @ts-ignore
		} else if (typeof window.navigator.msSaveBlob !== 'undefined') {
			// IE version
			const blob = new Blob([data], { type: 'application/force-download' })
			// @ts-ignore
			window.navigator.msSaveBlob(blob, filename)
		} else {
			// Firefox version
			const file = new File([data], filename, { type: 'application/force-download' })
			window.open(URL.createObjectURL(file))
		}
	}

	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()
		let fileName = ''
		request.open(method, url, true)
		request.responseType = 'blob'
		request.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
		request.withCredentials = true
		if (headers) {
			request.setRequestHeader('n-token', headers['n-token'])
		}
		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status === 200) {
					fileName = decodeURI(request.getResponseHeader('Content-Disposition') || '')
					fileName =
						`${filename || '-'}.xlsx` ||
						`${fileName.substr(20, fileName.length - 1)}.xlsx` ||
						'下载文件.xlsx'
					resolve(true)
				} else {
					reject(request)
				}
			}
		}
		request.onload = () => {
			_download(request.response, fileName)
		}
		request.send(JSON.stringify(data))
	})
}

/**
 * 将数字转换为带单位的格式
 *
 * @param {string | number} _num 要转换的值
 * @param {number} len 保留小数的位数 默认两位 会去掉小数点后面的0
 */
const ONE_HUNDRED_MILLION = 100000000 as const
const TEN_THOUSAND = 10000 as const
const ONE_THOUSAND = 1000 as const
const TRILLION = ONE_HUNDRED_MILLION * 10000

type Num = number | string | undefined | null
export function countUnit(num: Num, len = 2, isK = false) {
	if (num === undefined || num === null) return num

	if (typeof num === 'string') {
		// 匹配空字符和非数字字符
		if (!/^-?\d+(\.\d+)?$/.test(num)) {
			return num
		}

		// eslint-disable-next-line no-param-reassign
		num = Number(num)
	}

	// 大于一万亿
	if (num >= TRILLION) {
		return `${round(num / TRILLION, len)}万亿`
	}

	// 大于一亿
	if (num >= ONE_HUNDRED_MILLION) {
		return `${round(num / ONE_HUNDRED_MILLION, len)}亿`
	}

	// 大于1万
	if (num >= TEN_THOUSAND) {
		return `${round(num / TEN_THOUSAND, len)}w`
	}

	// 大于1千
	if (isK && num >= ONE_THOUSAND) {
		return `${round(num / ONE_THOUSAND, len)}k`
	}

	// 小于负一亿
	if (num <= -ONE_HUNDRED_MILLION) {
		return `${round(num / ONE_HUNDRED_MILLION, len)}亿`
	}

	// 小于负1万
	if (num <= -TEN_THOUSAND) {
		return `${round(num / TEN_THOUSAND, len)}w`
	}

	return round(num, len)
}

// 千分位分隔符
export const thousandBitSeparator = (num: number) => {
	if (num) {
		const source = String(num).split('.') // 按小数点分成2部分
		source[0] = source[0].replace(/(\d)(?=(\d{3})+$)/gi, '$1,') // 只将整数部分进行逗号分割
		return source.join('.') // 再将小数部分合并进来
	}
	return ''
}
