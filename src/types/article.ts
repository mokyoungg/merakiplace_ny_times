export const NATIONAL_LIST = [
  '대한민국',
  '중국',
  '일본',
  '미국',
  '북한',
  '러시아',
  '프랑스',
  '영국',
] as const;

export const NATION_MAP: Record<Nation, string> = {
  대한민국: 'South Korea',
  북한: 'North Korea',
  일본: 'Japan',
  미국: 'United States',
  중국: 'China',
  러시아: 'Russia',
  프랑스: 'France',
  영국: 'England',
} as const;

export type Nation = (typeof NATIONAL_LIST)[number];

export interface ArticleFilter {
  headline: string;
  date?: Date | null;
  nationalList: Nation[];
}

export interface Article {
  id: string;
  url: string;
  headline: string;
  glocations: string[];
  date: string;
  person: string;
  organization: string | null;
}

type ArticleKeyword = {
  name: string;
  value: string;
  [key: string]: any;
};

export interface ArticleResponse {
  _id: string;
  web_url: string;
  headline: {
    main: string;
    [key: string]: any;
  };
  byline: {
    original: string;
    organization: string;
    [key: string]: any;
  };
  pub_date: string;
  keywords: ArticleKeyword[];
}
