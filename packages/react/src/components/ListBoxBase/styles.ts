import { css } from '../../styles';

export const useListBoxStyles = css({
  boxSizing: 'border-box',
  margin: 0,
  outline: 'none',
  padding: 0,
  position: 'relative',
});

export const useListItemBoxStyles = css({
  $$listBoxItemBackgroundColor: 'transparent',

  alignItems: 'center',
  backgroundColor: '$$listBoxItemBackgroundColor',
  borderRadius: '$small',
  boxSizing: 'border-box',
  color: '$text-primary',
  cursor: 'pointer',
  display: 'flex',
  outline: 'none',
  padding: '$small',
  position: 'relative',
  transition: '$color',
  typography: '$subtext',

  '.manifest-listbox-item--icon': {
    alignSelf: 'center',
    color: '$text-secondary',
    display: 'inline-flex',
    flexShrink: 0,
  },

  '.manifest-listbox-item--icon__end': {
    marginLeft: '$small',
  },

  '.manifest-listbox-item--icon__start': {
    marginRight: '$small',
  },

  '.manifest-listbox-item--text': {
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
        $$listBoxItemBackgroundColor: '$colors$background-secondary',
      },
    },
    isHovered: {
      true: {
        $$listBoxItemBackgroundColor: '$colors$background-secondary',
      },
    },
    isPressed: {
      true: {
        $$listBoxItemBackgroundColor: '$colors$background-secondary',
      },
    },
    isSelected: {
      true: {
        $$listBoxItemBackgroundColor: '$colors$background-secondary',
      },
    },
  },
});

export const useListBoxSectionStyles = css({
  boxSizing: 'border-box',
  margin: 0,
  minWidth: 0,

  '.manifest-listbox-section--group': {
    margin: 0,
    padding: 0,
  },

  '.manifest-listbox-section--label': {
    color: '$text-tertiary',
    px: '$x-small',
  },
});

export type { CSS } from '../../styles';
export { cx } from '../../styles';
