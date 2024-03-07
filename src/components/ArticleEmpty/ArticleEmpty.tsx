import styles from './ArticleEmpty.module.scss';
import classNames from 'classnames/bind';
import { Button, Icon } from '../UI';
import { usePageStore } from '../../store/pageStore';
import { useMemo } from 'react';

const cx = classNames.bind(styles);

const ArticleEmpty = () => {
  const { page, setPage } = usePageStore();
  const emptyNotice = useMemo(
    () =>
      page === 'HOME' ? '검색된 기사가 없습니다.' : '저장된 스크랩이 없습니다.',
    [page]
  );

  return (
    <div className={cx('empty-notice')}>
      <div className={cx('notice-cotainer')}>
        <Icon name="Scrap" size="36" />
        {emptyNotice}
      </div>

      {page === 'SCRAP' && (
        <Button onClick={() => setPage('HOME')}>스크랩 하러 가기</Button>
      )}
    </div>
  );
};

export default ArticleEmpty;
