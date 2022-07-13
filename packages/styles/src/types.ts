import { CSS } from './index';

export interface StyleProps {
  /**
   * Class name attached to the root element.
   */
  className?: string;
  /**
   * Theme aware style object.
   */
  css?: CSS;
}
