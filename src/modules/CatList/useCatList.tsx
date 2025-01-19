import { useInfiniteQuery } from '@tanstack/react-query';
import { catListApi } from './api.ts';
import { useIntersection } from '../../shared/hooks/useIntersection.ts';
import Spinner from '../../shared/ui/Spinner.tsx';
import { useBreedStore } from '../../shared/store/store.ts';

export const useCatList = () => {
  const breed = useBreedStore((state) => state.breed);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...catListApi.getCatListInfiniteQueryOptions({ breed: breed }),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const cursor = (
    <div ref={cursorRef} className="flex justify-center items-center mt-4">
      {!hasNextPage && !isLoading && (
        <div className="text-xl">No more cats available.</div>
      )}
      {isFetchingNextPage && <Spinner />}
    </div>
  );

  return { error, data, isLoading, cursor };
};
