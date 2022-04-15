import { createSelector } from 'reselect'

const getUCEvenData = state => state.uc_even_data
const getUCOddData = state => state.uc_odd_data
const getUDEvenData = state => state.ud_even_data
const getUDOddData = state => state.ud_odd_data

const chunkArray = (array, size) =>
    Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
        array.slice(i * size, i * size + size)
    );

export const sic30GraphSelector = createSelector(
    getUCEvenData,
    getUCOddData,
    getUDEvenData,
    getUDOddData,
    (ucEvenData, ucOddData, udEvenData, udOddData) => {
        const ciEven = []
        const ciOdd = []
        const cdEven = []
        const cdOdd = []
        
        ucEvenData && ucEvenData.forEach((value, index) => {
            const ciEvenData = value.data.map(data => Number(data))
            const ciOddValues = ucOddData[index]
            const cdEvenValues = udEvenData[index]
            const cdOddValues = udOddData[index]

            const ciOddData = ciOddValues ? ciOddValues.data.map(data => Number(data)) : []
            const ciOddColor = ciOddValues?.color
            const cdEvenData = cdEvenValues ? cdEvenValues.data.map(data => Number(data)) : []
            const cdEvenColor = cdEvenValues?.color
            const cdOddData = cdOddValues ? cdOddValues.data.map(data => Number(data)) : []
            const cdOddColor = cdOddValues?.color

            if (ciEvenData.length && ciEvenData[3] > ciEvenData[1]) {
                for (let i = ciEvenData[1]; i < ciEvenData[3]; i += 100) {
                    ciEven.push({
                        name: ciEvenData[0] + "+" + i,
                        color: value.color,
                        spanCell: ciEvenData[0] === 206 && i < 700
                    })
                }
            }
            else {
                for (let i = ciEvenData[1]; i < 1000; i += 100) {
                    ciEven.push({
                        name: ciEvenData[0] + "+" + i,
                        color: value.color,
                        spanCell: ciEvenData[0] === 206 && i < 700
                    })
                }

                for (let i = 0; i < ciEvenData[3]; i += 100) {
                    ciEven.push({
                        name: ciEvenData[2] + "+" + i,
                        color: value.color,
                        spanCell: ciEvenData[2] === 206 && i < 700
                    })
                }
            }

            if (ciOddData.length && ciOddData[3] > ciOddData[1]) {
                for (let i = ciOddData[1]; i < ciOddData[3]; i += 100) {
                    ciOdd.push({
                        name: ciOddData[0] + "+" + i,
                        color: ciOddColor,
                        spanCell: ciOddData[0] === 206 && i < 700
                    })
                }
            }
            else {
                for (let i = ciOddData[1]; i < 1000; i += 100) {
                    ciOdd.push({
                        name: ciOddData[0] + "+" + i,
                        color: ciOddColor,
                        spanCell: ciOddData[0] === 206 && i < 700
                    })
                }

                for (let i = 0; i < ciOddData[3]; i += 100) {
                    ciOdd.push({
                        name: ciOddData[2] + "+" + i,
                        color: ciOddColor,
                        spanCell: ciOddData[2] === 206 && i < 700
                    })
                }
            }

            if (cdEvenData.length && cdEvenData[3] > cdEvenData[1]) {
                for (let i = cdEvenData[1]; i < cdEvenData[3]; i += 100) {
                    cdEven.push({
                        name: cdEvenData[0] + "+" + i,
                        color: cdEvenColor,
                        spanCell: cdEvenData[0] === 206 && i < 700
                    })
                }
            }
            else {
                for (let i = cdEvenData[1]; i < 1000; i += 100) {
                    cdEven.push({
                        name: cdEvenData[0] + "+" + i,
                        color: cdEvenColor,
                        spanCell: cdEvenData[0] === 206 && i < 700
                    })
                }

                for (let i = 0; i < cdEvenData[3]; i += 100) {
                    cdEven.push({
                        name: cdEvenData[2] + "+" + i,
                        color: cdEvenColor,
                        spanCell: cdEvenData[2] === 206 && i < 700
                    })
                }
            }

            if (cdOddData.length && cdOddData[3] > cdOddData[1]) {
                for (let i = cdOddData[1]; i < cdOddData[3]; i += 100) {
                    cdOdd.push({
                        name: cdOddData[0] + "+" + i,
                        color: cdOddColor,
                        spanCell: cdOddData[0] === 206 && i < 700
                    })
                }
            }
            else {
                for (let i = cdOddData[1]; i < 1000; i += 100) {
                    cdOdd.push({
                        name: cdOddData[0] + "+" + i,
                        color: cdOddColor,
                        spanCell: cdOddData[0] === 206 && i < 700
                    })
                }

                for (let i = 0; i < cdOddData[3]; i += 100) {
                    cdOdd.push({
                        name: cdOddData[2] + "+" + i,
                        color: cdOddColor,
                        spanCell: cdOddData[2] === 206 && i < 700
                    })
                }
            }
        })

        const totalIndex = ciEven.map((val, index) => index)

        return { ciEven, ciOdd, cdEven, cdOdd, chunks: chunkArray(totalIndex, 81) }
    }
)