import * as React from 'react';
import { CSS, cx, useAvatarStyles } from './styles';
import { useImage } from '../../hooks';

/**
 * -----------------------------------------------------------------------------------------------
 * Avatar
 * -----------------------------------------------------------------------------------------------
 */

type AvatarElement = React.ElementRef<'div'>;
type AvatarNativeProps = React.ComponentPropsWithoutRef<'div'>;

interface AvatarProps extends AvatarNativeProps {
  /**
   * The alt text passed to the image.
   */
  alt?: string;
  /**
   * Theme aware style object.
   */
  css?: CSS;
  /**
   * Name used as a fallback if src is not provided or image cannot be found.
   */
  fallback?: React.ReactNode;
  /**
   * The size of the avatar.
   *
   * @default 'medium'
   */
  size?: 'medium' | 'small';
  /**
   * The `src` attribute for the `img` element.
   */
  src?: string;
}

const Avatar = React.forwardRef<AvatarElement, AvatarProps>((props, forwardedRef) => {
  const {
    alt,
    className: classNameProp,
    css,
    fallback,
    size = 'medium',
    src = '',
    ...other
  } = props;

  const status = useImage({ src });

  const { className } = useAvatarStyles({ css, size });

  return (
    <div {...other} className={cx('manifest-avatar', className, classNameProp)} ref={forwardedRef}>
      {status === 'loaded' && <img alt={alt} className="manifest-avatar--image" src={src} />}
      {status === 'error' && <span className="manifest-avatart--fallback">{fallback}</span>}
    </div>
  );
});

if (__DEV__) {
  Avatar.displayName = 'ManifestAvatar';
}

Avatar.toString = () => '.manifest-avatar';

export { Avatar };
export type { AvatarProps };
