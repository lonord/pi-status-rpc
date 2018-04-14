import { HTTPService } from './service'

// tslint:disable-next-line:no-var-requires
const ss = require('@lonord/ss-redir-service')
// tslint:disable-next-line:no-var-requires
const pkg = require('@lonord/ss-redir-service/package.json')

const ssClient = ss.default() as IPCMethods

const service: HTTPService = {
	name: 'ss-status',
	type: 'http',
	version: pkg.version,
	description: pkg.description,
	execute: async (params) => {
		const action = params.action
		let result = 'OK'
		if (action === 'start') {
			await ssClient.start()
		} else if (action === 'stop') {
			await ssClient.stop()
		} else if (action === 'getStatus') {
			result = await ssClient.getStatus()
		} else if (action === 'setSSMode') {
			const mode = params.mode
			if (mode !== 'auto' && mode !== 'global') {
				throw new Error('ss mode should be `auto` or `global`')
			}
			await ssClient.setSSMode(mode)
		} else if (action === 'updateStandardGFWList') {
			await ssClient.updateStandardGFWList()
		}
		return result
	}
}

export default service

export interface IPCMethods {
	start(): Promise<void>
	stop(): Promise<void>
	getStatus(): Promise<any>
	setSSMode(mode: string): Promise<void>
	updateStandardGFWList(): Promise<void>
}
