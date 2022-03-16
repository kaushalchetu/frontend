import { createSelector } from 'reselect'

const getHeaders = state => state.headers
const getRows = state => state.rows

export const headerSelector = createSelector(
    getHeaders,
    headers => {
        const headerData = headers ? headers.map(header => ({
            name: header,
            label: header
        })) : []

        return [{
            name: 'year',
            label: 'Años'
        }]
            .concat(headerData, [{
                name: 'totalFinCost',
                label: 'Totales Generales'
            }])
    }
)

export const reportSelector = createSelector(
    getHeaders,
    getRows,
    (headers, rows) =>
        rows && Object.keys(rows).map(year => {
            const row = {
                year: year
            }

            const data = rows[year]
            const totalGrandFinCost = data.reduce((total, value) => total + Number(value.finCost), 0) / 1000000     //Calculation in millions

            headers.forEach(header => {
                const filteredCost = data
                    .filter(value => value.secName === header)
                    .map(value => value.finCost)

                const totalFinCost = filteredCost.reduce((total, cost) => total + Number(cost), 0) / 1000000       //Calculation in millions

                row[header] = totalFinCost.toFixed(2)
            })

            row.totalFinCost = totalGrandFinCost.toFixed(2);

            return row
        })
)

export const footerSelector = createSelector(
    headerSelector,
    reportSelector,
    (headers, rows) => {
        const data = {
            footer: true
        }

        headers.forEach(header => {
            let total = 0
            if (header.name !== 'year') {
                total = rows && rows.reduce((total, row) => total + Number(row[header.name]), 0)
            }

            data[header.name] = (header.name !== 'year' && total) && total.toFixed(2)
        })

        return data
    }
)