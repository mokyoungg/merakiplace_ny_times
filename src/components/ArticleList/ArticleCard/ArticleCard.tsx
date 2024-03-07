import styles from './ArticleCard.module.scss';
import classNames from 'classnames/bind';
import { Icon } from '../../UI';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Article } from '../../../types/article';
import { useMemo } from 'react';

const cx = classNames.bind(styles);

interface ArticelCardProps {
  article: Article;
  isScrapped: boolean;
  toggleScrap: (artile: Article, isScrapped: boolean) => void;
}

const ArticleCard = (props: ArticelCardProps) => {
  const { article, isScrapped, toggleScrap } = props;

  const { headline, person, organization, date, url } = article;

  const articleDate = useMemo(
    () => format(new Date(date), 'yyyy.M.dd (E)', { locale: ko }),
    [date]
  );

  const goToArticleWeb = () => {
    window.location.href = url;
  };

  return (
    <div className={cx('article-card')} onClick={goToArticleWeb}>
      <div className={cx('headline-container')}>
        <div className={cx('headline')}>{headline}</div>
        <div
          className={cx('scrap-button')}
          onClick={(e) => {
            e.stopPropagation();
            toggleScrap(article, isScrapped);
          }}
        >
          <Icon name={isScrapped ? 'StarFill' : 'Star'} />
        </div>
      </div>

      <div className={cx('info-container')}>
        <div className={cx('byline')}>
          {organization && (
            <span className={cx('organization')}>{organization}</span>
          )}
          <span className={cx('person')}>{person}</span>
        </div>

        <div className={cx('date')}>{articleDate}</div>
      </div>
    </div>
  );
};

export default ArticleCard;
