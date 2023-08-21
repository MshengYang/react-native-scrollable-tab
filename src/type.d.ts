import { type StyleProp, type ViewStyle, type TextStyle } from 'react-native';

export interface ScrollableTabViewProps {
  initialPage: number;
  page: number;
  onChangeTab(param: { i: number; from: number }): any;
  onScroll(x: number): any;
  renderTabBar: any;
  tabBarUnderlineStyle: any;
  tabBarBackgroundColor: string;
  tabBarActiveTextColor: string;
  tabBarInactiveTextColor: string;
  tabBarTextStyle: object;
  style: StyleProp<ViewStyle>;
  contentProps: object;
  scrollWithoutAnimation: boolean;
  locked: boolean;
  preRenderingSiblingsNumber: number;
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
