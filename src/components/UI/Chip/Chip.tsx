import { ComponentPropsWithoutRef } from 'react';
import styles from './Chip.module.scss';
import classNames from 'classnames/bind';

import { Icon } from '..';
import { ICON_NAME } from '../Icon/SvgIcon';

const cx = classNames.bind(styles);

interface ChipProps
  extends Pick<
    ComponentPropsWithoutRef<'div'>,
    'className' | 'children' | 'onClick'
  > {
  filled?: boolean;
  outlined?: boolean;
  prefixIconName?: ICON_NAME;
}

const Chip = (props: ChipProps) => {
  const {
    className,
    children,
    filled = false,
    outlined = false,
    prefixIconName,
    onClick,
    ...rest
  } = props;

  return (
    <div
      className={cx(className, 'wrapper', {
        'wrapper--filled': filled,
        'wrapper--outlined': outlined,
      })}
      onClick={onClick}
      {...rest}
    >
      {prefixIconName && <Icon className={cx('icon')} name={prefixIconName} />}

      {children}
    </div>
  );
};

export default Chip;
