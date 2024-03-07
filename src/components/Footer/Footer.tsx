import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { Icon } from '../UI';
import { usePageStore } from '../../store/pageStore';
import { useMemo } from 'react';

const cx = classNames.bind(styles);

const Footer = () => {
  const { page, setPage } = usePageStore();
  const isHomePage = useMemo(() => page == 'HOME', [page]);

  return (
    <div className={cx('footer')}>
      <div
        className={cx('tab', { 'tab--active': isHomePage })}
        onClick={() => setPage('HOME')}
      >
        <Icon
          name="Home"
          color={isHomePage ? '#ffffff' : '#6d6d6d'}
          size="24"
        />
        홈
      </div>

      <div
        className={cx('tab', { 'tab--active': !isHomePage })}
        onClick={() => setPage('SCRAP')}
      >
        <Icon
          name="Scrap"
          color={!isHomePage ? '#ffffff' : '#6d6d6d'}
          size="24"
        />
        스크랩
      </div>
    </div>
  );
};

export default Footer;
