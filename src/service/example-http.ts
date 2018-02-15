import { HTTPService } from './service'

const service: HTTPService = {
	name: 'example-http',
	type: 'http',
	version: '1.0.0',
	execute: async (params) => {
		return 'hello world: ' + JSON.stringify(params)
	}
}

export default service
