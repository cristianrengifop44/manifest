import { css } from '../../styles';

export const useRadioStyles = css({
  $$radioBackgroundColor: '$colors$palette-white',
  $$radioBorderColor: '$colors$palette-grey-500',

  alignItems: 'center',
  boxSizing: 'border-box',
  display: 'inline-flex',
  justifyContent: 'flex-start',
  position: 'relative',
  width: 'auto',

  '.manifest-radio--control': {
    alignItems: 'center',
    backgroundColor: '$$radioBackgroundColor',
    border: '3px solid $$radioBorderColor:',
    borderRadius: '$full',
    boxSizing: 'border-box',
    color: '$palette-white',
    display: 'inline-flex',
    justifyContent: 'center',
    size: '1.125rem',
  },

  '.manifest-radio--indicator': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',

    '&::after': {
      backgroundColor: '$white',
      borderRadius: '$full',
      content: '""',
      display: 'block',
      size: '0.625rem',
    },
  },

  '.manifest-radio--input': {
    cursor: 'pointer',
    height: '100%',
    left: 0,
    margin: 0,
    opacity: 0,
    padding: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },

  '.manifest-radio--text': {
    marginLeft: '$small',
  },

  variants: {
    isChecked: {
      true: {
        $$radioBackgroundColor: '$colors$primary-default',
        $$radioBorderColor: 'transparent',
      },
    },
    isDisabled: {
      true: {
        pointerEvents: 'none',

        '.manifest-radio--control': {
          opacity: 0.37,
          pointerEvents: 'none',
        },
      },
    },
    isFocusVisible: {
      true: {
        '.manifest-radio--control': {
          outline: '$colors$palette-indigo-200 solid 3px',
        },
      },
      false: {
        outline: 'none',
      },
    },
    isHovered: {
      true: {
        $$radioBorderColor: '$colors$palette-grey-600',
      },
    },
  },
});

export const useRadioGroupStyles = css({
  border: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  margin: 0,
  padding: 0,

  variants: {
    orientation: {
      horizontal: {
        flexFlow: 'row wrap',
      },
      vertical: {
        flexFlow: 'column wrap',
      },
    },
  },

  defaultVariants: {
    orientation: 'vertical',
  },
});

export type { CSS } from '../../styles';
export { cx } from '../../styles';
