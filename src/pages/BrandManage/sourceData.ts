import iconOfficialTiktok from '@/assets/img/icon-official-tiktok.svg'
import iconOfficialXiaoHongShu from '@/assets/img/icon-official-xiaohongshu.svg'
import iconOfficialWeibo from '@/assets/img/icon-official-weibo.svg'
import iconOfficialWechat from '@/assets/img/icon-official-wechat.svg'
import iconOfficialBilibili from '@/assets/img/icon-official-bilibili.svg'
import { PlatformListType } from './type'

export const PLATFORM_LIST: PlatformListType[] = [
	{
		code: 1,
		label: '抖音',
		icon: iconOfficialTiktok,
		disabled: false
	},
	{
		code: 2,
		label: '小红书',
		icon: iconOfficialXiaoHongShu,
		disabled: false
	},
	{
		code: 3,
		label: '微博',
		icon: iconOfficialWeibo,
		disabled: false
	},
	{
		code: 4,
		label: '微信',
		icon: iconOfficialWechat,
		disabled: false
	},
	{
		code: 5,
		label: 'B站',
		icon: iconOfficialBilibili,
		disabled: false
	}
]
