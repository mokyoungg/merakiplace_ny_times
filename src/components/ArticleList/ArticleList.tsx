import styles from './ArticleList.module.scss';
import classNames from 'classnames/bind';
import ArticleCard from './ArticleCard/ArticleCard';
import { usePageStore } from '../../store/pageStore';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useArticleList from '../../hooks/useArticleList';
import useScarpArticleList from '../../hooks/useScrapArticleList';
import ArticleEmpty from '../ArticleEmpty/ArticleEmpty';
import { useInView } from 'react-intersection-observer';

const cx = classNames.bind(styles);

const ARTICLE_CARD_HEIGHT = '104px';

const ArticleList = () => {
  const { page, hasHeader } = usePageStore();
  const { articles, canGetNextPage, fetchNextPage } = useArticleList();

  const { scrappedArticleIds, filteredScrapArticles, toggleScrap } =
    useScarpArticleList();

  const { ref, inView } = useInView({
    root: document.getElementById('article-list'),
    rootMargin: `${ARTICLE_CARD_HEIGHT} 0px`,
  });

  useEffect(() => {
    if (inView && page === 'HOME' && canGetNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <ul
      id="article-list"
      className={cx('article-list', {
        'article-list--no-header': !hasHeader,
      })}
    >
      {(() => {
        switch (page) {
          case 'HOME':
            return (
              <>
                {articles && articles.length ? (
                  articles.map((article) => (
                    <li key={article.id}>
                      <ArticleCard
                        article={article}
                        toggleScrap={toggleScrap}
                        isScrapped={scrappedArticleIds.includes(article.id)}
                      />
                    </li>
                  ))
                ) : (
                  <ArticleEmpty />
                )}
              </>
            );

          case 'SCRAP':
            return (
              <>
                {filteredScrapArticles && filteredScrapArticles.length ? (
                  filteredScrapArticles.map((article) => (
                    <li key={article.id}>
                      <ArticleCard
                        article={article}
                        toggleScrap={toggleScrap}
                        isScrapped={scrappedArticleIds.includes(article.id)}
                      />
                    </li>
                  ))
                ) : (
                  <ArticleEmpty />
                )}
              </>
            );

          default:
            return null;
        }
      })()}

      <ToastContainer />
      <div ref={ref} className={cx('observer')} />
    </ul>
  );
};

export default ArticleList;
