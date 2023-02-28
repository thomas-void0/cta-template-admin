/* global NodeJS */
import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import Nprogress from 'nprogress'

import 'nprogress/nprogress.css'
import ChaseLoading from '../ChaseLoading'

type ProcessLoadingProps = {
	show: () => void
	instance: HTMLElement | null
	hide: () => void
	parent: HTMLElement | Element | null
} & React.FC<{
	visible?: boolean
	spin?: boolean
}>

Nprogress.configure({
	showSpinner: false
})

// progress queue: singleton
const queue: (NodeJS.Timeout | undefined)[] = []

const ProcessLoading: ProcessLoadingProps = props => {
	const { visible = false, spin = false } = props

	const timer = useRef<NodeJS.Timeout>()

	useEffect(() => {
		if (visible) {
			Nprogress.start()
		} else {
			Nprogress.done()
		}
	}, [visible])

	/** for dynamicImport */
	useEffect(() => {
		if (visible) {
			return () => {}
		}

		if (!queue.length) {
			timer.current = setTimeout(() => {
				Nprogress.start()
			}, 300)
		}

		queue.push(timer.current)

		return () => {
			requestAnimationFrame(() => {
				timer.current && clearTimeout(timer.current)
				queue.shift()
				if (!queue.length) {
					Nprogress.done()
				}
			})
		}
	}, [])

	return spin ? (
		<div className={'wd-w-full wd-h-full'}>
			<ChaseLoading loading />
		</div>
	) : null
}

ProcessLoading.instance = null
ProcessLoading.parent = null

ProcessLoading.show = function () {
	if (!ProcessLoading.instance) {
		ProcessLoading.instance = document.createElement('div')
		document.body.appendChild(ProcessLoading.instance)
	}

	ReactDOM.render(<ProcessLoading visible />, ProcessLoading.instance)
}

ProcessLoading.hide = function () {
	const { instance } = ProcessLoading
	if (instance) {
		ReactDOM.render(<ProcessLoading visible={false} />, ProcessLoading.instance)
	}
}

const showPageLoading = ProcessLoading.show
const destoryPageLoading = ProcessLoading.hide

export default ProcessLoading

export { showPageLoading, destoryPageLoading }
