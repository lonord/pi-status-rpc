import { Response } from 'express'

export function handleError(res: Response) {
	return (err: any) => {
		err = err || 'Error: unknow error occurred'
		res.status(err.errCode || 500)
		res.end(err.message || err)
	}
}
