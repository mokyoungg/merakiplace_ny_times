import 'react-datepicker/dist/react-datepicker.css';
import styles from './ArticleSearch.module.scss';
import classNames from 'classnames/bind';
import { Input, Chip, Button, Icon } from '../UI';
import DatePicker from 'react-datepicker';
import { useState, useCallback } from 'react';
import { NATIONAL_LIST, Nation } from '../../types/article';
import { useModalStore } from '../../store/modalStore';
import useArticleFitler from '../../hooks/useArticleFilter';

const cx = classNames.bind(styles);

const ArticleSearch = () => {
  const { closeModal } = useModalStore();
  const { filteredHeadline, filteredDate, filteredNationalList, applyFilter } =
    useArticleFitler();

  const [headlineValue, setHeadlineValue] = useState(filteredHeadline || '');
  const [dateValue, setDateValue] = useState<Date | null | undefined>(
    filteredDate || null
  );
  const [nationalListValue, setNationalListValue] = useState<Nation[]>(
    filteredNationalList || []
  );

  const handleDateChange = (date: Date) => {
    setDateValue(date);
  };

  const handleChange = useCallback(
    (targetValue: Nation) => {
      let newValue = [...nationalListValue];

      if (newValue.includes(targetValue)) {
        newValue = newValue.filter((value) => value !== targetValue);
      } else {
        newValue = [...newValue, targetValue];
      }

      setNationalListValue(newValue);
    },
    [nationalListValue]
  );

  const setFilter = useCallback(() => {
    closeModal();

    setTimeout(() => {
      applyFilter({
        headline: headlineValue,
        date: dateValue,
        nationalList: nationalListValue,
      });
    }, 1000);
  }, [headlineValue, dateValue, nationalListValue]);

  return (
    <div className={cx('article-search')}>
      <div className={cx('filter-container')}>
        <div className={cx('label')}>헤드라인</div>

        <Input
          placeholder="검색할 헤드라인을 입력해주세요."
          value={headlineValue}
          onChange={(e) => setHeadlineValue(e.target.value)}
        />
      </div>

      <div className={cx('filter-container')}>
        <div className={cx('label')}>날짜</div>

        <DatePicker
          selected={dateValue}
          onChange={handleDateChange}
          dateFormat="yyyy.MM.dd"
          placeholderText="날짜를 택해주세요."
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          customInput={
            <Input
              name="date-picker"
              value={dateValue ? dateValue.toDateString() : ''}
              suffixElement={
                <div className={cx('calendar-container')}>
                  <Icon name="Calendar" size="16" color="#c4c4c4" />
                </div>
              }
            />
          }
        />
      </div>

      <div className={cx('filter-container')}>
        <div className={cx('label')}>국가</div>

        <ul className={cx('nation-list')}>
          {NATIONAL_LIST.map((nation) => (
            <li key={nation}>
              <Chip
                onClick={() => handleChange(nation)}
                filled={Boolean(nationalListValue.includes(nation))}
              >
                {nation}
              </Chip>
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={setFilter}>필터 적용하기</Button>
    </div>
  );
};

export default ArticleSearch;
