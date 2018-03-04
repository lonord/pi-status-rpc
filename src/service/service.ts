import { readdirSync } from 'fs'
import { join } from 'path'

export const sseServices: SSEService[] = []
export const httpServices: HTTPService[] = []

readdirSync(__dirname).filter((f) => f.endsWith('.js') && f !== 'service.js').forEach((f) => {
	try {
		const r = require(`./${f}`)
		const s = (r.default || r) as Service
		if (s) {
			if (isSSEService(s)) {
				sseServices.push(s)
			} else if (isHTTPService(s)) {
				httpServices.push(s)
			} else {
				console.log(`> ignore unknow service: ${s.name}`)
			}
		}
	} catch (e) {
		console.error(`> fail to load service file: ${join(__dirname, f)}`)
	}
})

function isSSEService(service: Service): service is SSEService {
	return service.type === 'sse'
}

function isHTTPService(service: Service): service is HTTPService {
	return service.type === 'http'
}

export interface Params {
	[x: string]: string
}

export interface SSEService extends Service {
	create(params: Params, onData: (data: any) => void, onError: (err: Error) => void): SSEServiceInstance
}

export interface SSEServiceInstance {
	close()
}

export interface HTTPService extends Service {
	execute(params: Params): Promise<any>
}

interface Service {
	name: string
	description: string
	version: string
	type: 'sse' | 'http'
}
