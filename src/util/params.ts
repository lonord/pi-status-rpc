import { Request } from 'express'

interface Params {
	[x: string]: string
}

export function collectParams(req: Request): Params {
	return {
		...req.body,
		...req.query,
		...req.params
	}
}
