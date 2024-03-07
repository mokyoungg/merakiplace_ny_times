import { ComponentPropsWithRef, forwardRef } from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface InputProps extends ComponentPropsWithRef<'input'> {
  suffixElement?: JSX.Element;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    id,
    type = 'text',
    className,
    placeholder,
    value,
    suffixElement,
    ...rest
  } = props;

  return (
    <div className={cx(classNames, 'wrapper')}>
      <input
        className={cx('input')}
        type={type}
        placeholder={placeholder}
        value={value}
        ref={ref}
        {...rest}
      />

      {suffixElement}
    </div>
  );
});

export default Input;
