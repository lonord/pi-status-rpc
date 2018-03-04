import { watchIOStat } from '@lonord/disk-util'
import { SSEService } from './service'

// tslint:disable-next-line:no-var-requires
const pkg = require('@lonord/disk-util/package.json')

const service: SSEService = {
	name: 'disk-iostat',
	type: 'sse',
	version: pkg.version,
	description: pkg.description,
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
