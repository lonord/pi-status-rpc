#!/usr/bin/env node

import * as bodyParser from 'body-parser'
import * as program from 'commander'
import * as cors from 'cors'
import * as express from 'express'
import * as SseStream from 'ssestream'
import httpRouter from './router/http'
import sseRouter from './router/sse'

// tslint:disable-next-line:no-var-requires
const pkg = require('../package.json')

program
	.version(pkg.version)
	.description(pkg.description)
	.option('-p, --port', 'port to listen, default 3000')
	.option('-h, --host', 'host to listen, default 0.0.0.0')
	.parse(process.argv)

console.log(`> pi-status-rpc <version: ${pkg.version}>`)

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/http', httpRouter())
app.use('/sse', sseRouter())

const port = program.port || 3000
const host = program.host || '0.0.0.0'
app.listen(port, host, (err) => {
	if (err) {
		throw err
	}
	console.log(`> server is listening on http://${host}:${port}`)
})
