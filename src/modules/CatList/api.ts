import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/apiInstance.ts';
import { IBreeds, ICat } from './types.ts';

export const catListApi = {
  getCatListInfiniteQueryOptions: ({ breed }: { breed?: string }) => {
    return infiniteQueryOptions({
      queryKey: ['cats', 'list', breed],
      queryFn: (meta) =>
        jsonApiInstance<ICat[]>(
          `images/search?page=${meta.pageParam}${breed ? `&breed_ids=${breed}` : '&has_breeds=1'}&limit=12&order=ASC`,
          {
            signal: meta.signal,
          },
        ),
      initialPageParam: 0,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      select: (data) =>
        data.pages.flatMap((data) =>
          data.map((cat) => {
            return {
              imgId: cat.id,
              imgUrl: cat.url,
              catId: cat.breeds[0].id,
              catName: cat.breeds[0].name,
            };
          }),
        ),
    });
  },

  getCatBreedsListQueryOptions: () => {
    return queryOptions({
      queryKey: ['breeds'],
      queryFn: (meta) =>
        jsonApiInstance<IBreeds[]>(`breeds`, {
          signal: meta.signal,
        }),
      select: (data) =>
        data.map((breed) => {
          return {
            breedId: breed.id,
            breedName: breed.name,
          };
        }),
    });
  },
};
