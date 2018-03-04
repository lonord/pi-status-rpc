import { getDiskUsage } from '@lonord/disk-util'
import { HTTPService } from './service'

// tslint:disable-next-line:no-var-requires
const pkg = require('@lonord/disk-util/package.json')

const service: HTTPService = {
	name: 'disk-usage',
	type: 'http',
	version: pkg.version,
	description: pkg.description,
	execute: async (params) => {
		return await getDiskUsage()
	}
}

export default service
