import { watchIOStat } from '@lonord/disk-util'
import { SSEService } from './service'

const service: SSEService = {
	name: 'disk-iostat',
	type: 'sse',
	version: require('@lonord/disk-util/package.json').version,
	create: (params, onData, onError) => {
		let interval = parseInt(params.interval)
		if (isNaN(interval)) {
			interval = 0
		}
		const watcher = watchIOStat(interval, onData, onError)
		return {
			close: watcher.stop
		}
	}
}

export default service
