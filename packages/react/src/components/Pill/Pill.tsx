import * as React from 'react';
import { CSS, cx, usePillStyles } from './styles';
import { useTooltip, useTooltipTrigger } from '@react-aria/tooltip';
import { mergeProps } from '@react-aria/utils';
import { Typography } from '../Typography';
import { useOverlayPosition } from '@react-aria/overlays';
import { useTooltipTriggerState } from '@react-stately/tooltip';

/**
 * -----------------------------------------------------------------------------------------------
 * Pill
 * -----------------------------------------------------------------------------------------------
 */

type PillElement = React.ElementRef<'div'>;
type PillNativeProps = React.ComponentPropsWithoutRef<'div'>;

interface PillProps extends PillNativeProps {
  /**
   * The color scheme of the pill
   *
   * @default 'indigo'
   */
  colorScheme?: 'indigo' | 'red';
  /**
   * Theme aware style object.
   */
  css?: CSS;
  /**
   * The icon to render in the pill.
   */
  icon?: React.ReactNode;
  /**
   * Whether the pill is collpased by default.
   */
  isCollapsed?: boolean;
  /**
   * The text label of the pill.
   */
  label?: React.ReactNode;
}

const Pill = React.forwardRef<PillElement, PillProps>((props, forwaredRef) => {
  const {
    className: classNameProp,
    colorScheme = 'indigo',
    css,
    icon,
    isCollapsed = false,
    label,
    ...other
  } = props;

  const overlayRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  const state = useTooltipTriggerState({ isDisabled: !isCollapsed, delay: 0 });

  const { triggerProps, tooltipProps: contentProps } = useTooltipTrigger(
    { isDisabled: !isCollapsed },
    state,
    triggerRef,
  );
  const { overlayProps: positionProps } = useOverlayPosition({
    isOpen: state.isOpen,
    offset: 4,
    overlayRef,
    placement: 'end',
    targetRef: triggerRef,
  });
  const { tooltipProps } = useTooltip({ isOpen: state.isOpen }, state);

  const isOpen = isCollapsed ? state.isOpen : true;

  const { className } = usePillStyles({ colorScheme, css, isOpen });

  return (
    <div {...other} className={cx('manifest-pill', className, classNameProp)} ref={forwaredRef}>
      {icon && (
        <span {...triggerProps} className="manifest-pill--icon" ref={triggerRef}>
          {icon}
        </span>
      )}
      {isOpen && (
        <Typography
          {...mergeProps(contentProps, tooltipProps, isCollapsed ? positionProps : {})}
          className="manifest-pill--text"
          variant="captionBold"
        >
          {label}
        </Typography>
      )}
    </div>
  );
});

if (__DEV__) {
  Pill.displayName = 'Pill';
}

Pill.toString = () => '.manifest-pill';

export { Pill };
export type { PillProps };
