import axios from 'axios';
import {
  Nation,
  ArticleFilter,
  ArticleResponse,
  Article,
  NATION_MAP,
} from '../types/article';
import { format } from 'date-fns';

const API_KEY = 'Pyoyhxn9psdxxRiHP5ur1nuD3Jlm8DuK';

const createFilterQueryParams = (nationalList: Nation[]) => {
  const news_desk = `news_desk:("World", "Foreign")`;

  if (nationalList.length > 0) {
    const glocations = nationalList
      .map((nation) => `"${NATION_MAP[nation]}"`)
      .join(',');

    return `${news_desk} AND glocations:(${glocations})`;
  } else {
    return news_desk;
  }
};

const createDateParams = (date: Date) => {
  return format(date, 'yyyyMMdd');
};

const createArticle = (articleData: ArticleResponse[]): Article[] => {
  const articles = articleData.map((article: ArticleResponse) => {
    const { web_url, _id, headline, byline, pub_date, keywords } = article;

    const locations = keywords
      .filter((keyword) => keyword.name === 'glocations')
      .map((glocation) => glocation.value);

    return {
      id: _id,
      url: web_url,
      headline: headline.main,
      date: pub_date,
      person: byline.original,
      organization: byline.organization,
      glocations: locations,
    };
  });

  return articles;
};

export const getArticle = async (
  parameter: ArticleFilter,
  pageParam: number
) => {
  const baseUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;

  const { headline, date, nationalList } = parameter;

  const fl = 'headline,web_url,byline,_id,pub_date,keywords';
  const fq = createFilterQueryParams(nationalList);
  const beginDate = date ? createDateParams(date) : null;

  const params = new URLSearchParams();

  params.append('page', pageParam.toString());

  if (beginDate) {
    params.append('begin_date', beginDate);
  }

  params.append('fl', fl);
  params.append('fq', fq);
  params.append('q', headline);
  params.append('api-key', API_KEY);

  const url = `${baseUrl}?${params}`;

  const res = await axios.get(url);

  const docs: ArticleResponse[] = await res.data.response.docs;

  if (docs.length > 0) {
    const artilces = createArticle(docs);
    return artilces;
  } else {
    return [] as Article[];
  }
};
