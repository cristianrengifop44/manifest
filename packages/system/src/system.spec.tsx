import * as React from 'react';
import { screen, render } from '@testing-library/react';
import { createComponent } from '../src/system';

describe('@project44-manifest/system - createComponent', () => {
  it('should support the as prop', () => {
    const TestComponent = createComponent<'span', { testProp?: string }>((props, forwardedRef) => {
      const { children, ...other } = props;

      return (
        <span {...other} data-testid="test" ref={forwardedRef}>
          {children}
        </span>
      );
    });

    const { rerender } = render(<TestComponent />);

    expect(screen.getByTestId('test').getAttribute('as')).toBeNull();

    rerender(<TestComponent as="div" />);

    expect(screen.getByTestId('test').getAttribute('as')).toBe('div');
  });

  it('should support forwarding refs', () => {
    const ref = jest.fn();

    const TestComponent = createComponent<'span', { testProp?: string }>((props, forwardedRef) => {
      const { children, ...other } = props;

      return (
        <span {...other} data-testid="test" ref={forwardedRef}>
          {children}
        </span>
      );
    });

    render(<TestComponent ref={ref} />);

    expect(ref).toHaveBeenCalled();
  });
});
