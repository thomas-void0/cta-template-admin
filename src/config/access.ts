import { InitialStateType } from '@/core/context/global'

export default function accessFactory(
	initialState: InitialStateType
): Record<string, boolean> {
	// const { accessInfo } = initialState

	return {
		canNav1: false
	}
}
