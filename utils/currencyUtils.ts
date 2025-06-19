export const getExchangeRate = async (
  fromCurrency: string,
  toCurrency: string
): Promise<number | null> => {
  const url = `https://api.frankfurter.dev/v1/latest?base=${fromCurrency}&symbols=${toCurrency}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.rates[toCurrency] || null;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return null; // Handle the error gracefully and return null
  }
};
