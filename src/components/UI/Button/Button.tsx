import { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {}

const Button = (props: ButtonProps) => {
  const { className, onClick, children, ...rest } = props;

  return (
    <button className={cx(className, 'button')} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
