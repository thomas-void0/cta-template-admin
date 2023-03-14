import { Button, Form, Input, message } from 'antd'
import { reqLogin } from '@/api'
import { useNavigate } from 'react-router'

const Login = () => {
	const navigate = useNavigate()

	const onFinish = (values: any) => {
		reqLogin(values).then(res => {
			const { success, msg, data } = res
			if (success && data) {
				message.success('登录成功')
				navigate('/')
			} else {
				message.error(msg)
			}
		})
	}

	return (
		<div className="tw-flex tw-h-[100vh] tw-w-full tw-items-center tw-justify-center">
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				autoComplete="off"
			>
				<Form.Item
					label="账号"
					name="username"
					rules={[{ required: true, message: '账号不能位空!' }]}
					initialValue="admin"
				>
					<Input style={{ width: '300px' }} />
				</Form.Item>

				<Form.Item
					label="密码"
					name="password"
					rules={[{ required: true, message: '密码不能为空!' }]}
					initialValue="123456"
				>
					<Input.Password style={{ width: '300px' }} />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						登录
					</Button>
					<Button className="tw-ml-[16px]">注册</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Login
