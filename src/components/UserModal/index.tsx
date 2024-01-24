import {
	useState,
	forwardRef,
	useImperativeHandle,
	ForwardRefRenderFunction
} from 'react'
import { Form, Upload, Modal, Input, UploadFile, UploadProps } from 'antd'
import { RcFile } from 'antd/es/upload'
import { useGlobal } from '@/core'

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
	const { globalState } = useGlobal()
	const { userInfo } = globalState
	const [fileList, setFileList] = useState<UploadFile[]>([
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
		}
	])

	const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		setFileList(newFileList)
	}

	const onPreview = async (file: UploadFile) => {
		let src = file.url as string
		if (!src) {
			src = await new Promise(resolve => {
				const reader = new FileReader()
				reader.readAsDataURL(file.originFileObj as RcFile)
				reader.onload = () => resolve(reader.result as string)
			})
		}
		const image = new Image()
		image.src = src
		const imgWindow = window.open(src)
		imgWindow?.document.write(image.outerHTML)
	}

	useImperativeHandle(ref, () => ({
		open() {
			setOpen(true)
		}
	}))

	function onModalClose() {
		setOpen(false)
	}

	return (
		<Modal title="编辑用户信息" open={open} onCancel={onModalClose}>
			<Form
				name="validate_other"
				{...formItemLayout}
				onFinish={onFinish}
				style={{ maxWidth: 600 }}
			>
				<Form.Item
					name="nickName"
					label="名称"
					initialValue={userInfo?.nickName}
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
						<Upload
							action="user/upload"
							listType="picture-card"
							fileList={fileList}
							onChange={onChange}
							onPreview={onPreview}
						>
							{fileList.length < 5 && '+ Upload'}
						</Upload>
					</Form.Item>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default forwardRef(UserModal)
