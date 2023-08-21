import type { ReactElement } from 'react';
import type { ScrollViewProps } from 'react-native';
import { type StyleProp, type ViewStyle, type TextStyle } from 'react-native';

export interface ScrollableTabViewProps {
  initialPage?: number;
  page?: number;
  onChangeTab?(param: { i: number; from: number }): void;
  onScroll?(x: number): void;
  renderTabBar?: false | ((props: DefaultTabBarProps) => any);
  tabBarUnderlineStyle?: StyleProp<ViewStyle>;
  tabBarBackgroundColor?: string;
  tabBarActiveTextColor?: string;
  tabBarInactiveTextColor?: string;
  tabBarTextStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  contentProps?: ScrollViewProps;
  scrollWithoutAnimation?: boolean;
  locked?: boolean;
  preRenderingSiblingsNumber?: number;
  tabs: string[];
  children: ReactElement[];
}

export interface DefaultTabBarProps {
  activeTextColor?: string;
  inactiveTextColor?: string;
  backgroundColor?: string;
  tabs: string[];
  tabBarUnderlineStyle?: StyleProp<ViewStyle>;
  containerWidth: number;
  tabStyle: StyleProp<ViewStyle>;
  style: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  activeTab: number;
  scrollValue: Animated.AnimatedDivision<string | number>;
  goToPage(page: number): void;
}
