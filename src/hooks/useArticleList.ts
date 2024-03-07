import { useInfiniteQuery } from '@tanstack/react-query';
import { useArticleStore } from '../store/articleStore';
import { usePageStore } from '../store/pageStore';
import { getArticle } from '../api/article';
import { useMemo } from 'react';

const useArticleList = () => {
  const { page } = usePageStore();
  const { articleFilter } = useArticleStore();

  // new york times has API call limit.
  // 5 requests per minute.
  const { data, isLoading, hasNextPage, isFetching, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['articles', articleFilter],
      queryFn: ({ pageParam = 1 }) => getArticle(articleFilter, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
      retry: false,
      enabled: page === 'HOME',
    });

  const articles = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  const canGetNextPage = useMemo(
    () => !isFetching && !isLoading && hasNextPage,
    [isFetching, isLoading, hasNextPage]
  );

  return {
    articles,
    canGetNextPage,
    fetchNextPage,
  };
};

export default useArticleList;
