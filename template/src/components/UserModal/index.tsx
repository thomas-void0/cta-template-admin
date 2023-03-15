import {
	useState,
	forwardRef,
	useImperativeHandle,
	ForwardRefRenderFunction
} from 'react'
import { Form, Upload, Modal, Input, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/es/upload'

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
						<ImgCrop rotationSlider>
							<Upload
								action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
								listType="picture-card"
								fileList={fileList}
								onChange={onChange}
								onPreview={onPreview}
							>
								{fileList.length < 5 && '+ Upload'}
							</Upload>
						</ImgCrop>
					</Form.Item>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default forwardRef(UserModal)
