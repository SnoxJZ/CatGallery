import { useQuery } from '@tanstack/react-query';
import { catListApi } from './api.ts';

export const useBreedList = () => {
  const {
    data: breeds,
    error: breedError,
    isLoading: isLoadingBreeds,
  } = useQuery({
    ...catListApi.getCatBreedsListQueryOptions(),
  });

  return { breeds, breedError, isLoadingBreeds };
};
