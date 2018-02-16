import { getDiskUsage } from '@lonord/disk-util'
import { HTTPService } from './service'

const service: HTTPService = {
	name: 'disk-usage',
	type: 'http',
	version: require('@lonord/disk-util/package.json').version,
	execute: async (params) => {
		return await getDiskUsage()
	}
}

export default service
