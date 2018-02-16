import getInterface from '@lonord/net-get-interface'
import { HTTPService } from './service'

const service: HTTPService = {
	name: 'net-interface',
	type: 'http',
	version: require('@lonord/net-get-interface/package.json').version,
	execute: async (params) => {
		return await getInterface()
	}
}

export default service
