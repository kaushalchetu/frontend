import { createSelector } from 'reselect'

const getUCData = state => state.uc_data
const getUDData = state => state.ud_data

export const sicGraphSelector = createSelector(
    getUCData,
    getUDData,
    (ucData, udData) => {
        const ci = []
        const cd = []

        ucData && ucData.forEach((value, index) => {
            const ciData = value.data.map(data => Number(data))
            const cdValues = udData[index]
            const cdData = cdValues ? cdValues.data.map(data => Number(data)) : []
            const cdColor = cdValues?.color

            if (ciData.length && ciData[3] > ciData[1]) {
                for (let i = ciData[1]; i < ciData[3]; i += 100) {
                    ci.push({
                        name: ciData[0] + "+" + i,
                        color: value.color
                    })
                }
            }
            else {
                for (let i = ciData[1]; i < 1000; i += 100) {
                    ci.push({
                        name: ciData[0] + "+" + i,
                        color: value.color
                    })
                }

                for (let i = 0; i < ciData[3]; i += 100) {
                    ci.push({
                        name: ciData[2] + "+" + i,
                        color: value.color
                    })
                }
            }

            if (cdData.length && cdData[3] > cdData[1]) {
                for (let i = cdData[1]; i < cdData[3]; i += 100) {
                    cd.push({
                        name: cdData[0] + "+" + i,
                        color: cdColor
                    })
                }
            }
            else {
                for (let i = cdData[1]; i < 1000; i += 100) {
                    cd.push({
                        name: cdData[0] + "+" + i,
                        color: cdColor
                    })
                }

                for (let i = 0; i < cdData[3]; i += 100) {
                    cd.push({
                        name: cdData[2] + "+" + i,
                        color: cdColor
                    })
                }
            }
        })

        return { ci, cd }
    }
)