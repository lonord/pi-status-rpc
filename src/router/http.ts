import { Router } from 'express'
import { httpServices } from '../service/service'
import { handleError } from '../util/error'
import { collectParams } from '../util/params'

export default () => {
	const router = Router()

	for (const service of httpServices) {
		console.log(`> mount http service: ${service.name}`)
		router.all(`/${service.name}`, (req, res) => {
			service.execute(collectParams(req)).then((result) => {
				res.json(result)
			}).catch(handleError(res))
		})
	}

	return router
}
