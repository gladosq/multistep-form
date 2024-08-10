import {useQuery} from '@tanstack/react-query';

export const getJobsFetcher = async () => {
  const res = await fetch(
    'https://dummyjson.com/products/category-list',
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });

  if (!res.ok) {
    throw new Error('Jobs info error');
  }

  return res.json();
};

export default function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: () => getJobsFetcher()
  });
}
