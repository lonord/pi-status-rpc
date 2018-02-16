import { Router } from 'express'
import { handleError } from '../util/error'
import { collectParams } from '../util/params'

export default () => {
	const httpServices = require('../service/service').httpServices
	const router = Router()

	for (const service of httpServices) {
		router.all(`/${service.name}`, (req, res) => {
			service.execute(collectParams(req)).then((result) => {
				res.json(result)
			}).catch(handleError(res))
		})
	}

	return router
}
