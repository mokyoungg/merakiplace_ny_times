import { usePageStore } from '../store/pageStore';
import { useArticleStore } from '../store/articleStore';
import { useCallback, useMemo } from 'react';
import { ArticleFilter } from '../types/article';

const useArticleFitler = () => {
  const { page } = usePageStore();
  const {
    articleFilter,
    scrapArticleFilter,
    setAricleFilter,
    setScrapArticleFilter,
  } = useArticleStore();

  const { headline, date, nationalList } = articleFilter;
  const {
    headline: scrapHeadline,
    date: scrapDate,
    nationalList: scrapNationalList,
  } = scrapArticleFilter;

  const filteredHeadline = useMemo(
    () => (page === 'HOME' ? headline : scrapHeadline),
    [page, headline, scrapHeadline]
  );

  const filteredDate = useMemo(
    () => (page === 'HOME' ? date : scrapDate),
    [page, date, scrapDate]
  );

  const filteredNationalList = useMemo(
    () => (page === 'HOME' ? nationalList : scrapNationalList),
    [page, nationalList, scrapNationalList]
  );

  const applyFilter = useCallback(
    (filter: ArticleFilter) => {
      if (page === 'HOME') {
        setAricleFilter(filter);
      } else {
        setScrapArticleFilter(filter);
      }
    },
    [page]
  );

  return {
    filteredHeadline,
    filteredDate,
    filteredNationalList,
    applyFilter,
  };
};

export default useArticleFitler;
