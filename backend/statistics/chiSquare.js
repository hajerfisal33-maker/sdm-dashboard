const jStat = require("jstat");

function chiSquareTest(data, categoryField, binaryField) {

    const categories = [...new Set(data.map(item => item[categoryField]))];

    let observed = [];

    categories.forEach(category => {

        const yes = data.filter(item =>
            item[categoryField] === category &&
            Number(item[binaryField]) === 1
        ).length;

        const no = data.filter(item =>
            item[categoryField] === category &&
            Number(item[binaryField]) === 0
        ).length;

        observed.push([yes, no]);

    });

    const rowTotals = observed.map(row => row[0] + row[1]);

    const colTotals = [

        observed.reduce((sum, row) => sum + row[0], 0),

        observed.reduce((sum, row) => sum + row[1], 0)

    ];

    const grandTotal = rowTotals.reduce((a, b) => a + b, 0);

    let chiSquare = 0;

    observed.forEach((row, i) => {

        row.forEach((value, j) => {

            const expected =

                (rowTotals[i] * colTotals[j]) /

                grandTotal;

            if (expected > 0) {

                chiSquare += Math.pow(value - expected, 2) / expected;

            }

        });

    });

    const degreesOfFreedom = (categories.length - 1) * (2 - 1);

    const pValue = 1 - jStat.chisquare.cdf(

        chiSquare,

        degreesOfFreedom

    );

    return {

        chiSquare: Number(chiSquare.toFixed(3)),

        degreesOfFreedom,

        pValue: Number(pValue.toFixed(5))

    };

}

module.exports = chiSquareTest;