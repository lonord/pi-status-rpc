import { Router } from 'express'
import * as SseStream from 'ssestream'
import { sseServices } from '../service/service'
import { collectParams } from '../util/params'

export default () => {
	const router = Router()

	for (const service of sseServices) {
		console.log(`> mount sse service: ${service.name}`)
		router.all(`/${service.name}`, (req, res) => {
			const sseStream = new SseStream(req)
			sseStream.pipe(res)

			const serviceInstance = service.create(collectParams(req), (data) => {
				sseStream.write({
					event: 'data',
					data
				})
			}, (err) => {
				sseStream.write({
					event: 'error',
					data: err.message || err
				})
				sseStream.end()
				serviceInstance && serviceInstance.close()
			})

			res.on('close', () => {
				sseStream.unpipe(res)
				serviceInstance && serviceInstance.close()
			})
		})
	}
	return router
}
