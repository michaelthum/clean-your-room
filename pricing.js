export function calculateProductPrice(product, employee, selectedOptions) {
  let price = 0
  const fmtc = selectedOptions.familyMembersToCover

  switch (product.type) {
    case 'medical':
      if (fmtc.includes('ee')) {
        const eeCost = product.costs.find(cost => {
          return cost.role === 'ee'
        })

        price += eeCost.price
      }

      if (fmtc.includes('sp')) {
        const spCost = product.costs.find(cost => {
          return cost.role === 'sp'
        })

        price += spCost.price
      }

      if (fmtc.includes('ch')) {
        const chCost = product.costs.find(cost => {
          return cost.role === 'ch'
        })

        price += chCost.price
      }

      if (fmtc.includes('chs')) {
        const chsCost = product.costs.find(cost => {
          return cost.role === 'chs'
        })

        price += chsCost.price
      }

      return parseInt(price * 100) / 100
    case 'volLife':
      if (fmtc.includes('ee')) {
        const eeCoverage = selectedOptions.coverageLevel.find(coverage => {
          return coverage.role === 'ee'
        })

        const eeCost = product.costs.find(cost => {
          return cost.role === 'ee'
        })

        price += (eeCoverage.coverage / eeCost.costDivisor) * eeCost.price
      }

      if (fmtc.includes('sp')) {
        const spCoverage = selectedOptions.coverageLevel.find(coverage => {
          return coverage.role === 'sp'
        })

        const spCost = product.costs.find(cost => {
          return cost.role === 'sp'
        })

        price += (spCoverage.coverage / spCost.costDivisor) * spCost.price
      }

      if (product.employerContribution.mode === 'dollar') {
        price = price - product.employerContribution.contribution
      } else {
        const dollarsOff = price * (product.employerContribution.contribution / 100)
        price = price - dollarsOff
      }

      return parseInt(price * 100) / 100
    case 'ltd':
      if (fmtc.includes('ee')) {
        const eeCoverage = product.coverage.find(coverage => {
          return coverage.role === 'ee'
        })

        const eeCost = product.costs.find(cost => {
          return cost.role === 'ee'
        })

        const salaryPercentage = eeCoverage.percentage / 100

        price += ((employee.salary * salaryPercentage) / eeCost.costDivisor) * eeCost.price
      }

      if (product.employerContribution.mode === 'dollar') {
        price = price - product.employerContribution.contribution
      } else {
        const dollarsOff = price * product.employerContribution.contribution
        price = price - dollarsOff
      }

      return parseInt(price * 100) / 100
    default:
      throw new Error(`Unknown product type: ${product.type}`)
  }
}
