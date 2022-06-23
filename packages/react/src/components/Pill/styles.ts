import { css } from '../../styles';

export const usePillStyles = css({
  $$backgroundColor: 'tranparent',

  alignItems: 'center',
  backgroundColor: '$$backgroundColor',
  borderRadius: '$full',
  boxSizing: 'border-box',
  display: 'inline-flex',
  padding: '2px',
  position: 'relative',

  '.manifest-pill--icon': {
    alignItems: 'center',
    borderRadius: '$full',
    color: '$white',
    display: 'flex',
    fontSize: '$medium',
    justifyContent: 'center',
    size: 20,

    '> .material-icons': {
      fontSize: '$medium',
    },
  },

  '.manifest-pill--text': {
    backgroundColor: '$$backgroundColor',
    borderBottomRightRadius: '$full',
    borderTopRightRadius: '$full',
    left: 24,
    padding: '3px 6px 3px 2px',
    position: 'absolute',
    width: 'max-content',
  },

  variants: {
    colorScheme: {
      indigo: {
        $$backgroundColor: '$colors$palette-indigo-50',

        '.manifest-pill--text': {
          color: '$palette-indigo-700',
        },

        '.manifest-pill--icon': {
          backgroundColor: '$palette-indigo-700',
        },
      },
      red: {
        $$backgroundColor: '$colors$palette-red-50',

        '.manifest-pill--text': {
          color: '$palette-red-600',
        },

        '.manifest-pill--icon': {
          backgroundColor: '$palette-red-600',
        },
      },
    },
    isOpen: {
      true: {
        borderBottomRightRadius: 'inherit',
        borderTopRightRadius: 'inherit',
      },
    },
  },

  defaultVariants: {
    colorScheme: 'indigo',
  },
});

export type { CSS } from '../../styles';
export { cx } from '../../styles';
