import { focus, css } from '../../styles';

export const usePaginationStyles = css({
  alignItems: 'center',
  boxSizing: 'border-box',
  columnGap: '$x-small',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  rowGap: '$small',

  '.manifest-pagination--ellipsis': {
    height: 'auto',
    padding: '$xx-small $small',
    textAlign: 'center',
  },
});

export const usePaginationButtonStyles = css(
  {
    $$paginationBackgroundColor: '$colors$palette-grey-50',

    alignItems: 'center',
    appearance: 'none',
    backgroundColor: '$$paginationBackgroundColor',
    border: '1px solid $colors$palette-grey-200',
    borderRadius: '$small',
    boxSizing: 'border-box',
    color: '$text-secondary',
    cursor: 'pointer',
    display: 'inline-flex',
    margin: 0,
    outline: 0,
    position: 'relative',
    padding: '$xx-small $small',
    transition: '$color',
    textDecoration: 'none',
    userSelect: 'none',
    width: 'auto',

    '.manifest-pagination-item--icon__end': {
      marginLeft: '$xx-small',
    },

    '.manifest-pagination-item--icon__start': {
      marginRight: '$xx-small',
    },

    variants: {
      isActive: {
        true: {
          $$paginationBackgroundColor: '$colors$palette-grey-200',
        },
      },
      isDisabled: {
        true: {
          opacity: 0.37,
          pointerEvents: 'none',
        },
      },
      isHovered: {
        true: {
          $$paginationBackgroundColor: '$palette-grey-100',
        },
      },
      isPressed: {
        true: {},
      },
    },

    compoundVariants: [
      {
        isActive: true,
        isHovered: true,
        css: {
          $$paginationBackgroundColor: '$colors$palette-grey-200',
        },
      },
    ],
  },
  focus,
);

export type { CSS } from '../../styles';
export { cx } from '../../styles';
