import { useState, useEffect, useMemo, useCallback } from 'react';
import { Article } from '../types/article';
import { toast } from 'react-toastify';
import { useArticleStore } from '../store/articleStore';
import { NATION_MAP } from '../types/article';
import { usePageStore } from '../store/pageStore';

type ScrapedArticle = {
  [key: string]: Article;
};

const useScarpArticleList = () => {
  const { page, setHeader } = usePageStore();
  const { scrapArticleFilter } = useArticleStore();
  const { headline, date, nationalList } = scrapArticleFilter;

  const [scrappedAricles, setScrappedArticles] = useState<ScrapedArticle[]>(
    JSON.parse(localStorage.getItem('scrapped')!) || []
  );

  const scrappedArticleIds = useMemo(() => {
    return scrappedAricles.map((article) => Object.keys(article)[0]);
  }, [scrappedAricles]);

  const scrappedArticleContents = useMemo(() => {
    return scrappedAricles.map((article) => Object.values(article)[0]);
  }, [scrappedAricles]);

  const filterdNationalListEn = useMemo(() => {
    return nationalList.map((country) => {
      return NATION_MAP[country];
    });
  }, [nationalList]);

  const filteredScrapArticles = useMemo(() => {
    return scrappedArticleContents
      .filter((content) =>
        content.headline.toLowerCase().includes(headline.toLowerCase())
      )
      .filter((content) => {
        return date ? new Date(content.date) >= new Date(date) : content;
      })
      .filter((content) =>
        nationalList.length
          ? content.glocations.some((gloction) =>
              filterdNationalListEn.includes(gloction)
            )
          : content
      );
  }, [
    scrappedArticleContents,
    headline,
    date,
    nationalList,
    filterdNationalListEn,
  ]);

  const toggleScrap = useCallback(
    (article: Article, isScrapped: boolean) => {
      if (!isScrapped) {
        const articleData = { [article.id]: article };
        setScrappedArticles((prev) => [...prev, articleData]);

        toast.success('기사가 스크랩 되었습니다!');
      } else {
        setScrappedArticles((prev) =>
          prev.filter(
            (scrapedArticle) => !scrapedArticle.hasOwnProperty(article.id)
          )
        );
        toast.error('기사가 스크랩에서 삭제되었습니다.');
      }
    },
    [scrappedAricles]
  );

  useEffect(() => {
    localStorage.setItem('scrapped', JSON.stringify(scrappedAricles));
  }, [scrappedAricles]);

  useEffect(() => {
    if (page === 'SCRAP' && scrappedAricles.length === 0) {
      setHeader(false);
    } else {
      setHeader(true);
    }
  }, [page, scrappedAricles]);

  return {
    scrappedArticleIds,
    filteredScrapArticles,
    toggleScrap,
  };
};

export default useScarpArticleList;
