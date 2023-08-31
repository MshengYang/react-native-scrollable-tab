import type { ReactElement } from 'react';
import type { ScrollViewProps } from 'react-native';
import { type ViewStyle, type TextStyle } from 'react-native';

export interface ScrollableTabViewProps {
  initialPage?: number;
  page?: number;
  onChangeTab?(param: { i: number; from: number }): void;
  onScroll?(x: number): void;
  renderTabBar?: false | ((props: DefaultTabBarProps) => any);
  tabBarUnderlineStyle?: ViewStyle;
  tabBarBackgroundColor?: string;
  tabBarActiveTextColor?: string;
  tabBarInactiveTextColor?: string;
  tabBarTextStyle?: TextStyle;
  style?: ViewStyle;
  contentProps?: ScrollViewProps;
  scrollWithoutAnimation?: boolean;
  locked?: boolean;
  preRenderingSiblingsNumber?: number;
  tabs: string[];
  tabStyle?: ViewStyle;
  children: ReactElement[];
}

export interface DefaultTabBarProps {
  activeTextColor?: string;
  inactiveTextColor?: string;
  backgroundColor?: string;
  tabs: string[];
  tabBarUnderlineStyle?: ViewStyle;
  containerWidth: number;
  tabStyle: ViewStyle;
  style: ViewStyle;
  textStyle: TextStyle;
  activeTab: number;
  scrollValue: Animated.AnimatedDivision<string | number>;
  goToPage(page: number): void;
}
