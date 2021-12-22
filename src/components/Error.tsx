/**
 * React 16 Error Boundaries
 * https://reactjs.org/docs/error-boundaries.html
 * https://github.com/bvaughn/react-error-boundary
 *
 * Don't throw inside onPress() in development for testing, go with useEffect()
 * https://github.com/carloscuesta/react-native-error-boundary/issues/95#issuecomment-754587387
 */
import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

const ErrorHandler = (props: { error: Error; resetErrorBoundary: Function }) => {
  const { error, resetErrorBoundary } = props;

  useEffect(() => {
    console.log('ErrorHandler: ', error);

    // FIXME: Add to Sentry Monitoring

    BootSplash.hide({ fade: true });
    resetErrorBoundary();
  }, []);

  return null;
};

export default ErrorHandler;
 