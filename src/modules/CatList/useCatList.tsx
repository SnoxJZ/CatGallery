import { useInfiniteQuery } from '@tanstack/react-query';
import { catListApi } from './api.ts';
import { useIntersection } from '../../shared/hooks/useIntersection.ts';
import Spinner from '../../shared/ui/Spinner.tsx';

export const useCatList = () => {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...catListApi.getCatListInfiniteQueryOptions(),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const cursor = (
    <div ref={cursorRef} className="flex justify-center items-center">
      {!hasNextPage && <div>End of list</div>}
      {isFetchingNextPage && <Spinner />}
    </div>
  );

  return { error, data, isLoading, cursor };
};
