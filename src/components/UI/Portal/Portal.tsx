import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Portal = (props: PortalProps) => {
  const {  children } = props;
  const targetElement = document.querySelector(
    `#${'modal'}`,
  ) as HTMLDivElement;

  return createPortal(children, targetElement);
};

export default Portal;
