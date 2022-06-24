import * as React from 'react';
import { Avatar } from './Avatar';
import { Flex } from '../Flex';

export default {
  title: 'Components/Avatar',
  component: Avatar,
};

export const Default = () => (
  <Avatar
    fallback="MD"
    src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
  />
);

export const Sizes = () => (
  <Flex align="center" css={{ gap: '$small' }}>
    <Avatar src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80" />
    <Avatar
      fallback="MD"
      size="small"
      src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
    />
  </Flex>
);

export const Fallback = () => (
  <Flex align="center" css={{ gap: '$small' }}>
    <Avatar fallback="MD" />
    <Avatar fallback="MD" size="small" />
  </Flex>
);
