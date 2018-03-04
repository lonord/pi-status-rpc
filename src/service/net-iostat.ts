import { watchTrafficSpeed } from '@lonord/net-traffic-monitor'
import { SSEService } from './service'

// tslint:disable-next-line:no-var-requires
const pkg = require('@lonord/net-traffic-monitor/package.json')

const service: SSEService = {
	name: 'net-iostat',
	type: 'sse',
	version: pkg.version,
	description: pkg.description,
	create: (params, onData, onError) => {
		let interval = parseInt(params.interval)
		if (isNaN(interval)) {
			interval = 0
		}
		const watcher = watchTrafficSpeed(params.ifName, interval, onData, onError)
		return {
			close: watcher.stop
		}
	}
}

export default service
