import { create } from 'zustand';
import { ArticleFilter as ArticleFilterType } from '../types/article';

type ArticleFitlerStore = {
  articleFilter: ArticleFilterType;
  scrapArticleFilter: ArticleFilterType;
  setAricleFilter: (filter: ArticleFilterType) => void;
  setScrapArticleFilter: (filter: ArticleFilterType) => void;
};

export const useArticleStore = create<ArticleFitlerStore>((set) => ({
  articleFilter: {
    headline: '',
    date: null,
    nationalList: [],
  },
  scrapArticleFilter: {
    headline: '',
    date: null,
    nationalList: [],
  },
  setAricleFilter: (filter) => set({ articleFilter: filter }),
  setScrapArticleFilter: (filter) => set({ scrapArticleFilter: filter }),
}));
