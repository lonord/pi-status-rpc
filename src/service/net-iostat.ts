import { watchTrafficSpeed } from '@lonord/net-traffic-monitor'
import { SSEService } from './service'

const service: SSEService = {
	name: 'net-iostat',
	type: 'sse',
	version: require('@lonord/net-traffic-monitor/package.json').version,
	create: (params, onData, onError) => {
		let interval = parseInt(params.interval)
		if (isNaN(interval)) {
			interval = 0
		}
		const ifName = params.ifName
		if (!ifName) {
			const e = new Error(`param 'ifName' is required`) as any
			e.errCode = 400
			throw e
		}
		const watcher = watchTrafficSpeed(ifName, interval, onData, onError)
		return {
			close: watcher.stop
		}
	}
}

export default service
