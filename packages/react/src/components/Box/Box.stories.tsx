import * as React from 'react';
import { Box } from './Box';
import { Flex } from '../Flex';

export default {
  title: 'Components/Box',
  component: Box,
};

export const Default = () => <Box css={{ backgroundColor: '$background-top-nav', size: 200 }} />;
