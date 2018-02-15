import { SSEService } from './service'

const service: SSEService = {
	name: 'example-sse',
	type: 'sse',
	version: '1.0.0',
	create: (params, onData, onError) => {
		let count = 0
		const timer = setInterval(() => {
			count++
			onData({
				count,
				msg: 'hello world'
			})
			if (count > 5) {
				onError(new Error('error1 occurred'))
				clearInterval(timer)
			}
		}, 1000)
		return {
			close: () => {
				timer && clearInterval(timer)
			}
		}
	}
}

export default service
