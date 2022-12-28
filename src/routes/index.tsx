import { Navigate, RouteObject } from 'react-router'

import { RouteConfig } from '@/core/Router/type'
import { lazy } from 'react'
import { lazyLoad } from '@/core/Router'
import iconBrandRule from './img/icon-brand-rule.svg'
import iconReportBrand from './img/icon-report-brand.svg'
import iconBrandManage from './img/icon-brand-manage.svg'

const routes: RouteConfig[] = [
	{
		path: '/*',
		element: lazyLoad(lazy(() => import('@/core/Layout'))),
		children: [
			{
				index: true,
				element: <Navigate to={'/brandManage/brandRule'} />
			},
			{
				path: 'brandManage',
				name: '品牌管理',
				// icon: <BoldOutlined />,
				icon: <img src={iconBrandManage} width={14} height={14} />,
				layout: {
					topItemRender: false
				},
				children: [
					{
						path: 'brandRule',
						name: '品牌规则',
						icon: <img src={iconBrandRule} width={14} height={14} />,
						element: lazyLoad(lazy(() => import('@/pages/BrandManage/BrandRule')))
					},
					{
						path: 'reportBrand',
						name: '报备品牌',
						icon: <img src={iconReportBrand} width={14} height={14} />,
						element: lazyLoad(lazy(() => import('@/pages/BrandManage/ReportBrand')))
					}
				]
			}
		]
	},
	{
		path: '/403',
		element: <div className="tw-font-bold">无权限</div>
	},
	{ path: '*', element: lazyLoad(lazy(() => import('@/pages/NotFound'))) }
]

export default routes as RouteObject[]
