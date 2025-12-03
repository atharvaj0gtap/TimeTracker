// Invoice Configuration
// Update these values to change invoice details across the entire application

export const INVOICE_CONFIG = {
  // Your (Contractor) Details
  contractor: {
    name: 'Atharva Jagtap',
    email: 'atharvauni2021@gmail.com',
    paymentEmail: 'atharvahjagtap@gmail.com',
  },

  // Client Details
  client: {
    name: 'Arts Factory Society',
    address: '281 Industrial Ave',
    city: 'Vancouver',
    province: 'BC',
    postalCode: 'V6A 2P3',
    country: 'Canada',
  },

  // Payment Details
  payment: {
    hourlyRate: 30, // CAD per hour
    currency: 'CAD',
    currencySymbol: '$',
  },

  // Pay Period Configuration
  // Reference pay period start date (must be a Sunday)
  payPeriod: {
    referenceStartDate: '2025-11-09', // Nov 9, 2025 (Sunday)
    periodLengthDays: 14, // 2 weeks
    paymentDaysAfterPeriodEnd: 7, // Friday after 2nd Monday
  },
}

// Helper function to format currency
export const formatCurrency = (amount) => {
  return `${amount.toFixed(2)} ${INVOICE_CONFIG.payment.currency}`
}

// Helper function to get full client address
export const getClientFullAddress = () => {
  const { address, city, province, postalCode } = INVOICE_CONFIG.client
  return `${address}, ${city}, ${province} ${postalCode}`
}
