import type { AriaMenuProps } from '@react-types/menu';
import type { FocusableProps } from '@react-types/shared';
import type { Node } from '@react-types/shared';
import type { PopoverProps } from '../Popover';
import type { TreeState } from '@react-stately/tree';
import * as React from 'react';
import {
  CSS,
  cx,
  useDropdownStyles,
  useDropdownItemBoxStyles,
  useDropdownSectionStyles,
} from './styles';
import { Item, Section } from '@react-stately/collections';
import { mergeProps, mergeRefs } from '@react-aria/utils';
import { useHover, usePress } from '@react-aria/interactions';
import { Popover } from '../Popover';
import { Typography } from '../Typography';
import { useFocusRing } from '@react-aria/focus';
import { useMenu } from '@react-aria/menu';
import { useMenuItem } from '@react-aria/menu';
import { useMenuSection } from '@react-aria/menu';
import { useMenuTrigger } from '@react-aria/menu';
import { useMenuTriggerState } from '@react-stately/menu';
import { useOverlayPosition } from '@react-aria/overlays';
import { useSeparator } from '@react-aria/separator';
import { useTreeState } from '@react-stately/tree';

/**
 * -----------------------------------------------------------------------------------------------
 * Dropdown Context
 * -----------------------------------------------------------------------------------------------
 */

interface DropdownContext<T extends object = object> {
  closeOnSelect?: boolean;
  menuProps: React.HTMLAttributes<HTMLUListElement>;
  menuRef: React.RefObject<HTMLUListElement>;
  triggerProps: React.HTMLAttributes<HTMLButtonElement>;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const DropdownContext = React.createContext<DropdownContext | null>(null);

const useDropdownContext = () => React.useContext(DropdownContext);

/**
 * -----------------------------------------------------------------------------------------------
 * Dropdown
 * -----------------------------------------------------------------------------------------------
 */

interface DropdownProps extends PopoverProps {
  /**
   * Whether the dropdown closes when a selection is made.
   *
   * @default true
   */
  closeOnSelect?: boolean;
}

const Dropdown: React.FC<React.PropsWithChildren<DropdownProps>> = props => {
  const { children, closeOnSelect = true } = props;

  const menuRef = React.useRef<HTMLUListElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const [trigger, menu] = React.Children.toArray(children);

  const state = useMenuTriggerState(props);
  const { menuTriggerProps, menuProps } = useMenuTrigger({ trigger: 'press' }, state, triggerRef);
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    scrollRef: menuRef,
    placement: 'bottom end',
    shouldFlip: true,
    isOpen: state.isOpen,
    onClose: state.close,
  });

  return (
    <DropdownContext.Provider
      value={{
        closeOnSelect,
        menuProps,
        menuRef,
        triggerProps: menuTriggerProps,
        triggerRef,
      }}
    >
      {trigger}
      <Popover {...positionProps} isOpen={state.isOpen} onClose={state.close}>
        {menu}
      </Popover>
    </DropdownContext.Provider>
  );
};

if (__DEV__) {
  Dropdown.displayName = 'ManifestDropdown';
}

/**
 * -----------------------------------------------------------------------------------------------
 * Dropdown Menu
 * -----------------------------------------------------------------------------------------------
 */

type DropdownMenuAriaProps = AriaMenuProps<object>;
type DropdownMenuElement = React.ElementRef<'ul'>;
type DropdownMenuNativeProps = Omit<React.ComponentPropsWithRef<'ul'>, keyof DropdownMenuAriaProps>;

interface DropdownMenuProps extends DropdownMenuNativeProps, DropdownMenuAriaProps {
  /**
   * Theme aware style object.
   */
  css?: CSS;
}

const DropdownMenu = React.forwardRef<DropdownMenuElement, DropdownMenuProps>(
  (props, forwardedRef) => {
    const { className: classNameProp, css, ...other } = props;

    const { menuRef, menuProps: contextProps } = useDropdownContext() as DropdownContext;

    const completeProps = { ...mergeProps(contextProps, other) };

    const state = useTreeState(completeProps);
    const { menuProps } = useMenu(completeProps, state, menuRef);

    const { className } = useDropdownStyles({ css });

    return (
      <ul
        {...menuProps}
        className={cx('manifest-dropdown', className, classNameProp)}
        ref={mergeRefs(menuRef, forwardedRef)}
      >
        {[...state.collection].map(item => {
          if (item.type === 'section') {
            return (
              <DropdownSection
                key={item.key}
                item={item}
                state={state}
                onAction={completeProps.onAction}
              />
            );
          }

          let menuItem = (
            <DropdownItem
              key={item.key}
              item={item}
              state={state}
              onAction={completeProps.onAction}
            />
          );

          if (item.wrapper) {
            menuItem = item.wrapper(menuItem);
          }

          return menuItem;
        })}
      </ul>
    );
  },
);

if (__DEV__) {
  DropdownMenu.displayName = 'ManifestDropdownMenu';
}

DropdownMenu.toString = () => '.manifest-dropdown';

/**
 * -----------------------------------------------------------------------------------------------
 * DropdownItem @private The rendered component for the react-aria collection Item.
 * -----------------------------------------------------------------------------------------------
 */

type DropdownItemNativeProps = Omit<React.ComponentPropsWithoutRef<'div'>, keyof FocusableProps>;

interface DropdownItemProps<T extends object = object>
  extends DropdownItemNativeProps,
    FocusableProps {
  /**
   * Theme aware style object.
   */
  css?: CSS;
  /**
   * Icon added after the button text.
   */
  endIcon?: React.ReactElement;
  /**
   * Whether the item is virtualized.
   */
  isVirtualized?: boolean;
  /**
   * Item object in the collection.
   */
  item: Node<T>;
  /**
   * Icon added before the button text.
   */
  startIcon?: React.ReactElement;
  /**
   * Collection state.
   */
  state: TreeState<T>;
  /**
   * Callback executed on item select.
   */
  onAction?(key: React.Key): void;
}

const DropdownItem: React.FC<DropdownItemProps> = props => {
  const {
    autoFocus,
    className: classNameProp,
    css,
    endIcon: endIconProp,
    isVirtualized,
    item,
    startIcon: startIconProp,
    state,
  } = props;

  const { rendered, key } = item;

  const itemRef = React.useRef<HTMLLIElement>(null);

  const isFocused = state.selectionManager.focusedKey === item.key;
  const isDisabled = state.disabledKeys.has(key);
  const isSelected = state.selectionManager.isSelected(key);

  const { menuItemProps, labelProps } = useMenuItem(
    {
      'aria-label': item['aria-label'],
      key,
      isDisabled,
      isVirtualized,
      isSelected,
    },
    state,
    itemRef,
  );
  const { focusProps } = useFocusRing({
    autoFocus,
  });
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { pressProps, isPressed } = usePress({ isDisabled, ref: itemRef });

  const endIcon = React.useMemo(
    () => endIconProp ?? (item.props.endIcon as React.ReactElement),
    [endIconProp, item.props.endIcon],
  );

  const startIcon = React.useMemo(
    () => startIconProp ?? (item.props.startIcon as React.ReactElement),
    [startIconProp, item.props.startIcon],
  );

  const { className } = useDropdownItemBoxStyles({
    css,
    isDisabled,
    isFocused,
    isHovered,
    isPressed,
    isSelected,
  });

  return (
    <li
      {...mergeProps(menuItemProps, pressProps, focusProps, hoverProps)}
      className={cx('manifest-dropdown-item', className, classNameProp)}
      ref={itemRef}
    >
      {startIcon && (
        <span className={cx('manifest-dropdown-item--icon', 'manifest-dropdown-item--icon__start')}>
          {startIcon}
        </span>
      )}

      <Typography {...labelProps} className="manifest-dropdown-item--text" variant="subtext">
        {rendered}
      </Typography>

      {endIcon && (
        <span className={cx('manifest-dropdown-item--icon', 'manifest-dropdown-item--icon__end')}>
          {endIcon}
        </span>
      )}
    </li>
  );
};

if (__DEV__) {
  DropdownItem.displayName = 'ManifestDropdownItem';
}

DropdownItem.toString = () => '.manifest-dropdown-item';

/**
 * -----------------------------------------------------------------------------------------------
 * Dropdown MenuSection @private The rendered component for the react-aria collection Section.
 * -----------------------------------------------------------------------------------------------
 */

type DropdownSectionNativeProps = React.ComponentPropsWithoutRef<'li'>;

interface DropdownSectionProps<T extends object = object> extends DropdownSectionNativeProps {
  /**
   * Theme aware style object.
   */
  css?: CSS;
  /**
   * Item object in the collection.
   */
  item: Node<T>;
  /**
   * Tree state of the collection.
   */
  state: TreeState<T>;
  /**
   * Callback executed on item select.
   */
  onAction?(key: React.Key): void;
}

const DropdownSection: React.FC<DropdownSectionProps> = props => {
  const { className: classNameProp, css, item, onAction, state } = props;

  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: item.rendered,
    'aria-label': item['aria-label'],
  });

  const { separatorProps } = useSeparator({ elementType: 'li' });

  const showSeparator = item.key !== state.collection.getFirstKey();

  const { className } = useDropdownSectionStyles({ css });

  return (
    <>
      {showSeparator && <li {...separatorProps} className="manifest-dropdown-section--separator" />}
      <li {...itemProps} className={cx('manifest-dropdown-section', className, classNameProp)}>
        {item.rendered && (
          <Typography
            {...headingProps}
            className="manifest-dropdown-section--label"
            variant="caption"
          >
            {item.rendered}
          </Typography>
        )}
        <ul {...groupProps} className="manifest-dropdown-section--group">
          {[...item.childNodes].map(node => {
            let item = (
              <DropdownItem key={node.key} item={node} state={state} onAction={onAction} />
            );

            if (node.wrapper) {
              item = node.wrapper(item);
            }

            return item;
          })}
        </ul>
      </li>
    </>
  );
};

if (__DEV__) {
  DropdownSection.displayName = 'ManifestDropdownSection';
}

DropdownSection.toString = () => '.manifest-dropdown-section';

export { Dropdown, DropdownMenu, Item as DropdownItem, Section as DropdownSection };
export { DropdownProps, DropdownMenuProps, DropdownItemProps, DropdownSectionProps };
