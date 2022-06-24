import { css } from '../../styles';

export const useTagStyles = css({
  alignItems: 'center',
  appearance: 'none',
  background: 'none',
  border: 'none',
  borderRadius: '$small',
  boxSizing: 'border-box',
  color: '$text-primary',
  display: 'inline-flex',
  height: '1.5rem',
  justifyContent: 'center',
  outline: 0,
  padding: 0,
  textDecoration: 'none',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',

  '.manifest-tag--button': {
    marginRight: '$x-small',
  },

  '.manifest-tag--icon': {
    fontSize: '1rem',
    size: '1rem',
  },

  '.manifest-tag--text': {
    color: 'inherit',
    overflow: 'hidden',
    px: '$small',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export type { CSS } from '../../styles';
export { cx } from '../../styles';
