import React from 'react';
import styles from './Flex.module.css';
import { classNames } from '@ui/utils/classNames';

const Themes = {
  default: 'theme-default',
  invert: 'theme-invert',
} as const;

type ThemeName = keyof typeof Themes;

type FlexProps<T extends React.ElementType> = {
  center?: boolean;
  children?: React.ReactNode;
  fit?: boolean;
  gap?: boolean;
  horizontal?: boolean;
  pad?: boolean;
  scroll?: boolean;
  clip?: boolean;
  type?: T;
  verticalCenter?: boolean;
  wrap?: boolean;
  theme?: ThemeName;
};

type FlexAllowedProps<T extends React.ElementType = 'div'> = FlexProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof FlexProps<T>>;

export function Flex<T extends React.ElementType = 'div'>({
  children,
  horizontal,
  fit,
  pad,
  gap,
  center,
  scroll,
  clip,
  theme,
  type,
  verticalCenter,
  wrap,
  ...rest
}: FlexAllowedProps<T>) {
  const Tag: React.ElementType = type || 'div';
  const themeClass = theme && styles[Themes[theme]];
  return (
    <Tag
      className={classNames([
        styles.flex,
        horizontal && styles.horizontal,
        fit && styles.fit,
        pad && styles.pad,
        gap && styles.gap,
        center && styles.center,
        scroll && styles.scroll,
        clip && styles.clip,
        verticalCenter && styles.verticalCenter,
        wrap && styles.wrap,
        themeClass,
      ])}
      {...rest}
    >
      {children}
    </Tag>
  );
}
