import { ComponentPropsWithoutRef } from 'react';
import { ICON_NAME, SVG_ICON } from './SvgIcon';

type ICON_COLOR = '#6d6d6d' | '#ffffff' | '#c4c4c4';

interface IconProps
  extends Pick<ComponentPropsWithoutRef<'svg'>, 'className' | 'onClick'> {
  name: ICON_NAME;
  size?: '16' | '24' | '36';
  color?: ICON_COLOR;
}

const Icon = (props: IconProps) => {
  const { className = '', name, size = '16', color = '#6d6d6d' } = props;
  const isExistIcon = name !== undefined && SVG_ICON.hasOwnProperty(name);

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isExistIcon ? SVG_ICON[name](color) : null}
    </svg>
  );
};

export default Icon;
