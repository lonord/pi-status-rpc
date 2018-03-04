import { HTTPService } from './service'

const service: HTTPService = {
	name: 'example-http',
	type: 'http',
	version: '1.0.0',
	description: 'example http service',
	execute: async (params) => {
		return 'hello world: ' + JSON.stringify(params)
	}
}

export default service
