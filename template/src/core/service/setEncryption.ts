// 参数加密
import md5 from 'blueimp-md5'
import sampleSize from 'lodash-es/sampleSize'

const arr = [
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'a',
	'b',
	'c',
	'd',
	'e',
	'f'
]

interface Data {
	nonce?: string
	xyz?: string
	[key: string]: any
}

const gw = (url: string) => {
	const index = url.indexOf('/xdnphb/')
	if (index !== -1) {
		return url.slice(index)
	}
	return url
}

/**
 * 添加xyz参数
 * @param {string} url 请求地址
 * @param {object} data 请求数据
 */
export default function setEncryption(url?: string, data: Record<string, any> = {}) {
	if (!url) {
		return {}
	}

	let code = `${gw(url)}?AppKey=joker`

	const param: Data = {}

	Object.keys(data)
		.sort()
		.forEach(key => {
			const value =
				data[key] === null || typeof data[key] === 'undefined' ? '' : data[key]
			param[key] = value
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			code += `&${key}=${value}`
		})

	// 随机取数大小为9的数组转为字符串
	const nonce = sampleSize(arr, 9).join('')
	code += `&nonce=${nonce}`

	param.nonce = nonce
	param.xyz = md5(code)
	return param
}
