import { Chip } from '../UI';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { useModalStore } from '../../store/modalStore';
import Modal from '../UI/Modal/Modal';
import ArticleSearch from '../ArticleSearch/ArticleSearch';
import { usePageStore } from '../../store/pageStore';
import useArticleFitler from '../../hooks/useArticleFilter';

const cx = classNames.bind(styles);

const Header = () => {
  const { hasHeader } = usePageStore();
  const { openModal } = useModalStore();

  const { filteredHeadline, filteredDate, filteredNationalList } =
    useArticleFitler();

  const headLineText = useMemo(
    () => (filteredHeadline.length > 0 ? filteredHeadline : '전체 헤드라인'),
    [filteredHeadline]
  );

  const dateText = useMemo(
    () =>
      filteredDate ? format(new Date(filteredDate), 'yyyy.M.dd') : '전체 날짜',
    [filteredDate]
  );

  const nationText = useMemo(
    () =>
      filteredNationalList && filteredNationalList.length > 0
        ? filteredNationalList.length === 1
          ? filteredNationalList.toString()
          : `${filteredNationalList[0]} 외 ${filteredNationalList.length - 1}개`
        : '전체 국가',
    [filteredNationalList]
  );

  return (
    <>
      {!hasHeader ? null : (
        <div className={cx('header')}>
          <Chip
            className={cx('headline')}
            prefixIconName="Search"
            onClick={openModal}
            outlined={Boolean(filteredHeadline)}
          >
            <div className={cx('text')}>{headLineText}</div>
          </Chip>

          <Chip
            className={cx('header-chip')}
            prefixIconName="Calendar"
            onClick={openModal}
            outlined={Boolean(filteredDate)}
          >
            {dateText}
          </Chip>

          <Chip
            className={cx('header-chip')}
            onClick={openModal}
            outlined={Boolean(filteredNationalList.length > 0)}
          >
            {nationText}
          </Chip>

          <Modal>
            <ArticleSearch />
          </Modal>
        </div>
      )}
    </>
  );
};

export default Header;
