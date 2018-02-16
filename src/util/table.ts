export interface Table {
	columns: string[]
	rows: string[][]
}

export function printTable(table: Table) {
	let colsWidth = table.columns.map((c) => c.length)
	table.rows.forEach((r) => {
		r.forEach((ri, i) => {
			if (ri.length > colsWidth[i]) {
				colsWidth[i] = ri.length
			}
		})
	})
	colsWidth = colsWidth.map((c) => c + 2)
	console.log(fillLine(table.columns, colsWidth))
	table.rows.forEach((r) => {
		console.log(fillLine(r, colsWidth))
	})
}

function fillLine(items: string[], widthList: number[]) {
	let s = ''
	for (let i = 0; i < items.length; i++) {
		const t = items[i]
		const w = widthList[i]
		s += fillCol(t, w)
	}
	return s
}

function fillCol(str: string, width: number) {
	width = width || 0
	while (str.length < width) {
		str = str + ' '
	}
	return str
}
