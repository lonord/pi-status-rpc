import getInterface from '@lonord/net-get-interface'
import { HTTPService } from './service'

// tslint:disable-next-line:no-var-requires
const pkg = require('@lonord/net-get-interface/package.json')

const service: HTTPService = {
	name: 'net-interface',
	type: 'http',
	version: pkg.version,
	description: pkg.description,
	execute: async (params) => {
		return await getInterface()
	}
}

export default service
