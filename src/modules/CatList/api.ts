import { infiniteQueryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/apiInstance.ts';

export interface IBreeds {
  id: string;
  name: string;
}

export interface ICat {
  id: string;
  url: string;
  breeds: IBreeds[];
}

export const catListApi = {
  getCatListInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ['cats', 'list'],
      queryFn: (meta) =>
        jsonApiInstance<ICat[]>(
          `images/search?page=${meta.pageParam}&limit=10&has_breeds=1`,
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
};
