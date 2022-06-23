import { css } from '../../styles';

export const useDropdownStyles = css({
  boxSizing: 'border-box',
  display: 'block',
  listStyleType: 'none',
  margin: 0,
  padding: '$small',
  overflow: 'auto',
  userSelect: 'none',

  '& > .manifest-separator': {
    mx: '-$small',
    my: '$small',
  },
});

export const useDropdownItemBoxStyles = css({
  $$dropdownItemBackgroundColor: 'transparent',

  alignItems: 'center',
  backgroundColor: '$$listBoxItemBackgroundColor',
  borderRadius: '$small',
  boxSizing: 'border-box',
  color: '$text-primary',
  cursor: 'default',
  display: 'flex',
  outline: 'none',
  padding: '$small',
  position: 'relative',

  '.manifest-dropdown-item--icon': {
    alignSelf: 'center',
    color: '$text-secondary',
    display: 'inline-flex',
    flexShrink: 0,
  },

  '.manifest-dropdown-item--icon__end': {
    marginLeft: '$small',
  },

  '.manifest-dropdown-item--icon__start': {
    marginRight: '$small',
  },

  '.manifest-dropdown-item--text': {
    display: 'block',
    flex: '1 1 0%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  variants: {
    isDisabled: {
      true: {
        cursor: 'not-allowed',
        pointerEvents: 'none',
        opacity: 0.57,
      },
    },
    isFocused: {
      true: {
        $$dropdownItemBackgroundColor: '$colors$background-secondary',
      },
    },
    isHovered: {
      true: {
        $$dropdownItemBackgroundColor: '$colors$background-secondary',
      },
    },
    isPressed: {
      true: {
        $$dropdownItemBackgroundColor: '$colors$background-secondary',
      },
    },
    isSelected: {
      true: {
        $$dropdownItemBackgroundColor: '$colors$background-secondary',
      },
    },
  },
});

export const useDropdownSectionStyles = css({
  '.manifest-listbox-section--group': {
    boxSizing: 'border-box',
    display: 'block',
    listStyleType: 'none',
    margin: 0,
    padding: '$small',
    overflow: 'auto',
    userSelect: 'none',
  },

  '.manifest-listbox-section--label': {
    color: '$text-tertiary',
    px: '$x-small',
  },
});

export type { CSS } from '../../styles';
export { cx } from '../../styles';
