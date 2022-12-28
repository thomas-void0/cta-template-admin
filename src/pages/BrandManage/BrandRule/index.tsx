// 品牌规则
import { Badge, Button, Input, Radio, Table } from 'antd'
import classNames from 'classnames'
import { isNumber } from 'lodash-es'
import { FC, useMemo, useState } from 'react'
import { PLATFORM_LIST } from '../sourceData'
import { PlatformListType } from '../type'
import styles from './index.module.css'
import { DeleteOutlined } from '@ant-design/icons'
import CheckBrandDrawer from './components/CheckBrandDrawer'

const BrandRule: FC<any> = () => {
	// return <div className="tw-border-tc-secondary tw-bg-primary tw-font-bold">品牌规则</div>

	const [open, setOpen] = useState(false)

	const options = [
		{
			label: (
				<Badge count={5} offset={[10, -5]} style={{ zIndex: 10 }}>
					待审核
				</Badge>
			),
			value: '待审核'
		},
		{
			label: (
				<Badge count={6} offset={[10, -5]} style={{ zIndex: 10 }}>
					已收录
				</Badge>
			),
			value: '已收录'
		},
		{
			label: (
				<Badge count={7} offset={[10, -5]} style={{ zIndex: 10 }}>
					已驳回
				</Badge>
			),
			value: '已驳回'
		}
	]

	const dataSource = [
		{
			idx: 1,
			brandId: '4jhg34h34hgf47dxczvz',
			brandExternalInfo: {
				brandName: 'SK-Ⅱ',
				brandDesc: '这是品牌介绍这是品牌介绍这是品牌介绍',
				brandImage:
					'https://img1.baidu.com/it/u=3206399133,969750247&fm=253&fmt=auto&app=120&f=JPEG?w=1000&h=500'
			},
			brandChineseName: '海蓝之谜',
			brandEnglishName: 'LAMER',
			launchIndustry: '美妆 一般化妆品',
			commercialOrder: {
				tiktok: 1000,
				redBook: 1000
			},
			submitUser: 'Echo',
			submitTime: '2022-09-07 14:45',
			lastModifiedUser: 'Echo',
			lastModifiedTime: '2022-10-07 14:45',
			brandIncludeTime: '2022-09-07 14:45',
			brandStatus: 1,
			initialization: 1
		},
		{
			idx: 2,
			brandId: '4jhg34h34hgf47dxczvz',
			brandExternalInfo: {
				brandName: 'SK-Ⅱ',
				brandDesc: '这是品牌介绍这是品牌介绍这是品牌介绍',
				brandImage:
					'https://img1.baidu.com/it/u=3206399133,969750247&fm=253&fmt=auto&app=120&f=JPEG?w=1000&h=500'
			},
			brandChineseName: '海蓝之谜',
			brandEnglishName: 'LAMER',
			launchIndustry: '美妆 一般化妆品',
			commercialOrder: {
				tiktok: 10,
				redBook: 10
			},
			submitUser: 'Echo',
			submitTime: '2022-09-08 14:45',
			lastModifiedUser: 'Echo',
			lastModifiedTime: '2022-10-07 14:45',
			brandIncludeTime: '2022-09-07 14:45',
			brandStatus: 2,
			initialization: 2
		},
		{
			idx: 3,
			brandId: '4jhg34h34hgf47dxczvz',
			brandExternalInfo: {
				brandName: 'SK-Ⅱ',
				brandDesc: '这是品牌介绍这是品牌介绍这是品牌介绍',
				brandImage:
					'https://img1.baidu.com/it/u=3206399133,969750247&fm=253&fmt=auto&app=120&f=JPEG?w=1000&h=500'
			},
			brandChineseName: '海蓝之谜',
			brandEnglishName: 'LAMER',
			launchIndustry: '美妆 一般化妆品',
			commercialOrder: {
				tiktok: 100,
				redBook: 100
			},
			submitUser: 'Echo',
			submitTime: '2022-09-09 14:45',
			lastModifiedUser: 'Echo',
			lastModifiedTime: '2022-10-07 14:45',
			brandIncludeTime: '2022-09-07 14:45',
			brandStatus: 3,
			initialization: 3
		}
	]

	const columns = [
		{
			title: '序号',
			dataIndex: 'idx',
			key: 'idx',
			align: 'center',
			width: 70,
			fixed: 'left'
		},
		{
			title: '品牌ID',
			dataIndex: 'brandId',
			key: 'brandId',
			align: 'center',
			width: 120,
			render: (text: string, record: Record<string, any>) => (
				<span className={classNames(styles.brandId, styles.ellipsis)} title={text}>
					{text}
				</span>
			)
		},
		{
			title: '品牌对外信息',
			dataIndex: 'brandExternalInfo',
			key: 'brandExternalInfo',
			align: 'center',
			wdith: 100,
			render: (text: Record<string, any>, record: Record<string, any>) => (
				<div className={styles.brandExternalInfo}>
					<img src={text.brandImage} />
					<div>
						<span className={styles.brandName}>{text.brandName}</span>
						<span
							className={classNames(styles.brandDesc, styles.ellipsis)}
							title={text.brandDesc}
						>
							{text.brandDesc}
						</span>
					</div>
				</div>
			)
		},
		{
			title: '品牌中文',
			dataIndex: 'brandChineseName',
			key: 'brandChineseName',
			align: 'center',
			width: 100
		},
		{
			title: '品牌英文',
			dataIndex: 'brandEnglishName',
			key: 'brandEnglishName',
			align: 'center',
			width: 100
		},
		{
			title: '投放行业',
			dataIndex: 'launchIndustry',
			key: 'launchIndustry',
			align: 'center',
			width: 120
		},
		{
			title: '品牌关联商单数',
			dataIndex: 'commercialOrder',
			key: 'commercialOrder',
			align: 'center',
			width: 130,
			render: (text: Record<string, any>) => {
				const list = []
				if (isNumber(text.tiktok)) {
					list.push({
						...PLATFORM_LIST.find((item: PlatformListType) => item.code === 1),
						number: text.tiktok
					})
				}
				if (isNumber(text.redBook)) {
					list.push({
						...PLATFORM_LIST.find((item: PlatformListType) => item.code === 2),
						number: text.tiktok
					})
				}
				return (
					<>
						{list.map((item: Record<string, any>) => (
							<span className={styles.commercialOrder}>
								<img src={item.icon} />
								{item.number}
							</span>
						))}
					</>
				)
			}
		},
		{
			title: '提交用户',
			dataIndex: 'submitUser',
			key: 'submitUser',
			align: 'center',
			width: 90,
			render: (text: string) => (
				<span className={styles.submitUser}>
					<img src="https://img1.baidu.com/it/u=3623703370,2851058181&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=281" />
					{text}
				</span>
			)
		},
		{
			title: '提交时间',
			dataIndex: 'submitTime',
			key: 'submitTime',
			align: 'center',
			width: 120,
			sorter: (a: any, b: any) => Date.parse(a.submitTime) - Date.parse(b.submitTime)
		},
		{
			title: '最后修改人',
			dataIndex: 'lastModifiedUser',
			key: 'lastModifiedUser',
			align: 'center',
			width: 110,
			render: (text: string) => (
				<span className={styles.submitUser}>
					<img src="https://img1.baidu.com/it/u=3623703370,2851058181&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=281" />
					{text}
				</span>
			)
		},
		{
			title: '最后修改时间',
			dataIndex: 'lastModifiedTime',
			key: 'lastModifiedTime',
			align: 'center',
			width: 120
		},
		{
			title: '品牌收录时间',
			dataIndex: 'brandIncludeTime',
			key: 'brandIncludeTime',
			align: 'center',
			width: 120
		},
		{
			title: '品牌状态',
			dataIndex: 'brandStatus',
			key: 'brandStatus',
			align: 'center',
			width: 90,
			render: (text: number, record: Record<string, any>) => {
				return (
					<>
						{text === 1 ? (
							<span className={classNames(styles.statusZero, styles.statusOne)}>
								已收录
							</span>
						) : null}
						{text === 2 ? (
							<span className={classNames(styles.statusZero, styles.statusTwo)}>
								待审核
							</span>
						) : null}
						{text === 3 ? (
							<span className={classNames(styles.statusZero, styles.statusThree)}>
								已驳回
							</span>
						) : null}
					</>
				)
			}
		},
		{
			title: '初始化',
			dataIndex: 'initialization',
			key: 'initialization',
			align: 'center',
			width: 90,
			render: (text: number, record: Record<string, any>) => {
				/**
				 * 1 初始化完成 2 初始化中 3 重新初始化
				 */
				return (
					<>
						{text === 1 ? '初始化完成' : null}
						{text === 2 ? '初始化中' : null}
						{text === 3 ? (
							<span
								className={classNames(styles.initAgain, styles.pointer, styles.notSelect)}
								onClick={() => {
									console.log('重新初始化')
								}}
							>
								重新初始化
							</span>
						) : null}
					</>
				)
			}
		},
		{
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
			align: 'center',
			width: 170,
			fixed: 'right',
			render: (text: string, record: Record<string, any>) => {
				return (
					<div className={styles.operation}>
						<span
							className={classNames(styles.pointer, styles.notSelect)}
							onClick={() => {
								console.log('品牌规则')
								setOpen(true)
							}}
						>
							品牌规则
						</span>
						<span
							className={classNames(styles.pointer, styles.notSelect)}
							onClick={() => {
								console.log('修改记录')
							}}
						>
							修改记录
						</span>
						<DeleteOutlined
							className={styles.pointer}
							onClick={() => {
								console.log('删除记录')
							}}
						/>
					</div>
				)
			}
		}
	]
	const tableWidth = useMemo(
		() => columns.reduce((prev, col) => (prev += col.width ?? 0), 0),
		[]
	)
	const rowSelection = {
		onChange: (selectedRowKeys: React.Key[], selectedRows: Record<string, any>[]) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
		},
		getCheckboxProps: (record: Record<string, any>) => ({
			disabled: record.name === 'Disabled User', // Column configuration not to be checked
			name: record.name
		})
	}

	return (
		<div className={styles.container}>
			<div className={styles.firstLine}>
				<Input
					addonBefore="品牌"
					placeholder="请输入品牌名称进行搜索"
					style={{ width: 300 }}
				/>
				<div className={styles.buttons}>
					<Button>数据初始化</Button>
					<Button>收录品牌</Button>
				</div>
			</div>
			<div className={styles.secondLine}>
				<Radio.Group optionType="button" options={options} />
			</div>
			<Table
				// @ts-ignore
				columns={columns}
				dataSource={dataSource}
				className={styles.tableBox}
				scroll={{ x: tableWidth + 170 }}
				rowSelection={{
					type: 'checkbox',
					...rowSelection
				}}
				rowKey="idx"
			/>

			<CheckBrandDrawer
				open={open}
				maskClosable
				onClose={() => {
					setOpen(false)
				}}
			/>
		</div>
	)
}

export default BrandRule
