import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import type { DefaultTabBarProps } from './type';

const DefaultTabBar = (props: DefaultTabBarProps) => {
  const {
    activeTextColor = 'navy',
    inactiveTextColor = 'black',
    backgroundColor = 'navy',
    tabBarUnderlineStyle,
    containerWidth,
    tabs,
    goToPage,
    style,
    tabStyle,
    activeTab,
    textStyle,
    scrollValue,
  } = props;
  const renderTab = (
    name: string,
    page: number,
    isTabActive: boolean,
    onPressHandler: (page: number) => void
  ) => {
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return (
      <TouchableOpacity
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ flex: 1 }}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        onPress={() => onPressHandler(page)}
      >
        <View style={[styles.tab, tabStyle]}>
          <Text style={[{ color: textColor, fontWeight }, textStyle]}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const numberOfTabs = tabs.length;
  const tabUnderlineStyle = StyleSheet.create([
    {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: backgroundColor,
      bottom: 0,
    },
  ]);

  const translateX = scrollValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, containerWidth / numberOfTabs],
  });

  return (
    <View
      style={[styles.tabs, { backgroundColor: props.backgroundColor }, style]}
    >
      {tabs.map((name, page) => {
        const isTabActive = activeTab === page;
        // const renderTab = props.renderTab || renderTab;
        return renderTab(name, page, isTabActive, goToPage);
      })}
      <Animated.View
        style={[
          tabUnderlineStyle,
          {
            transform: [{ translateX }],
          },
          tabBarUnderlineStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});

export default DefaultTabBar;
