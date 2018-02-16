#!/usr/bin/env node

import * as bodyParser from 'body-parser'
import * as program from 'commander'
import * as cors from 'cors'
import * as express from 'express'
import * as SseStream from 'ssestream'
import httpRouter from './router/http'
import sseRouter from './router/sse'
import { HTTPService, SSEService } from './service/service'
import { printTable, Table } from './util/table'

// tslint:disable-next-line:no-var-requires
const pkg = require('../package.json')

program
	.version(pkg.version)
	.description(pkg.description)
	.option('-p, --port <port>', 'port to listen, default 3000')
	.option('-h, --host <host>', 'host to listen, default 0.0.0.0')
	.option('-l, --list-service', 'list loaded services, not start server')
	.parse(process.argv)

console.log(`\n> pi-status-rpc <version: ${pkg.version}>\n`)

if (program.listService) {
	// tslint:disable-next-line:no-var-requires
	const services = require('./service/service')
	const httpServices = services.httpServices as HTTPService[]
	const sseServices = services.sseServices as SSEService[]
	const table: Table = {
		columns: [ '    TYPE', 'NAME', 'VERSION' ],
		rows: []
	}
	for (const s of httpServices) {
		table.rows.push([ `    ${s.type}`, s.name, s.version ])
	}
	for (const s of sseServices) {
		table.rows.push([`    ${s.type}`, s.name, s.version])
	}
	printTable(table)
	console.log('')
	process.exit(0)
}

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
