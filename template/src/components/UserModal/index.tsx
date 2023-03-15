import {
	useState,
	forwardRef,
	useImperativeHandle,
	ForwardRefRenderFunction
} from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { Form, Upload, Modal, Input } from 'antd'

export interface UserModalRef {
	open: () => void
}

const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 }
}

const normFile = (e: any) => {
	console.log('Upload event:', e)
	if (Array.isArray(e)) {
		return e
	}
	return e?.fileList
}

const onFinish = (values: any) => {
	console.log('Received values of form: ', values)
}

const UserModal: ForwardRefRenderFunction<UserModalRef, {}> = (_, ref) => {
	const [open, setOpen] = useState(false)

	useImperativeHandle(ref, () => ({
		open() {
			setOpen(true)
		}
	}))

	return (
		<Modal title="编辑用户信息" open={open}>
			<Form
				name="validate_other"
				{...formItemLayout}
				onFinish={onFinish}
				initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
				style={{ maxWidth: 600 }}
			>
				<Form.Item
					name="nickName"
					label="名称"
					rules={[{ required: true, message: '姓名不能为空!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item name="select" label="Select">
					<Input />
				</Form.Item>

				<Form.Item label="Dragger">
					<Form.Item
						name="dragger"
						valuePropName="fileList"
						getValueFromEvent={normFile}
						noStyle
					>
						<Upload.Dragger name="files" action="/upload.do">
							<p className="ant-upload-drag-icon">
								<InboxOutlined />
							</p>
							<p className="ant-upload-text">Click or drag file to this area to upload</p>
							<p className="ant-upload-hint">Support for a single or bulk upload.</p>
						</Upload.Dragger>
					</Form.Item>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default forwardRef(UserModal)
