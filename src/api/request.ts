export const createRequestFetcher = async ({title}: {title: string}) => {
  const res = await fetch(
    'https://dummyjson.com/products/add',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
      })
    });

  if (!res.ok) {
    throw new Error('Request error');
  }

  return res.json();
};
