import { Router } from 'express'
import * as SseStream from 'ssestream'
import { collectParams } from '../util/params'

export default () => {
	const sseServices = require('../service/service').sseServices
	const router = Router()

	for (const service of sseServices) {
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
