import React, { useEffect, useRef, useState, type ReactElement } from 'react';
import {
  Dimensions,
  View,
  Animated,
  ScrollView,
  StyleSheet,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type LayoutChangeEvent,
} from 'react-native';

import DefaultTabBar from './DefaultTabBar';
import type { DefaultTabBarProps, ScrollableTabViewProps } from './type';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const width = Dimensions.get('screen').width;
let scrollOnMountCalled = false;
const ScrollableTabView = (props: ScrollableTabViewProps) => {
  const {
    initialPage = 0,
    page = -1,
    tabBarTextStyle,
    renderTabBar,
    onChangeTab,
    onScroll = () => {},
    tabBarUnderlineStyle,
    tabBarBackgroundColor,
    tabBarActiveTextColor,
    tabBarInactiveTextColor,
    contentProps = {},
    scrollWithoutAnimation = false,
    locked = false,
    tabs,
    preRenderingSiblingsNumber = 0,
    children,
    style,
  } = props;

  const [containerWidth, setContainerWidth] = useState(width);
  const scrollX = useRef(
    new Animated.Value(initialPage * containerWidth)
  ).current;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sceneKeys, setSceneKeys] = useState<string[]>([]);

  const scrollView = useRef<ScrollView>(null);
  let [scrollValue, setScrollValue] = useState(
    Animated.divide(scrollX, new Animated.Value(containerWidth))
  );
  const _children = (childrenTemp = children): ReactElement[] => {
    return React.Children.map(childrenTemp, (child) => child);
  };
  /** 获取组件key */
  const makeSceneKey = (tab: string, idx: number) => {
    return `${tab}_${idx}`;
  };

  const shouldRenderSceneKey = (idx: number, currentPageKey: number) => {
    let numOfSibling = preRenderingSiblingsNumber;
    return (
      idx < currentPageKey + numOfSibling + 1 &&
      idx > currentPageKey - numOfSibling - 1
    );
  };
  const newSceneKeys = ({ previousKeys = [] as string[], curPage = 0 }) => {
    if (!tabs) throw Error('no Tabs');
    const newKeys = tabs
      .map((tab, idx) => {
        let key = makeSceneKey(tab, idx);
        if (
          keyExists(previousKeys, key) ||
          shouldRenderSceneKey(idx, curPage)
        ) {
          return key;
        }
        return undefined;
      })
      .filter((v) => v) as string[];
    return newKeys;
  };

  const updateSceneKeys = ({
    curPage,
    callback,
  }: {
    curPage: number;
    callback?: () => void;
  }) => {
    const newKeys = newSceneKeys({
      previousKeys: sceneKeys,
      curPage: curPage,
    });
    setCurrentPage(curPage);
    setSceneKeys(newKeys);
    setCurrentPage(curPage);
    if (callback && typeof callback === 'function') callback();
  };
  /** 移动到目标View */
  const goToPage = (curPage: number) => {
    const offset = curPage * containerWidth;

    scrollView.current?.scrollTo({
      x: offset,
      y: 0,
      animated: !scrollWithoutAnimation,
    });

    updateSceneKeys({
      curPage,
      callback: () => _onChangeTab(currentPage, curPage),
    });
  };
  const keyExists = (sceneKeysArgs: string[], key: string) => {
    return sceneKeysArgs.find((sceneKey) => key === sceneKey);
  };

  /**
   * onLayout处理
   * @date 2023/8/17 - 15:48:24
   *
   * @param {LayoutChangeEvent} e
   */
  const _handleLayout = (e: LayoutChangeEvent) => {
    const { width: layoutWidth } = e.nativeEvent.layout;

    if (
      !layoutWidth ||
      layoutWidth <= 0 ||
      Math.round(layoutWidth) === Math.round(containerWidth)
    ) {
      return;
    }
    const containerWidthAnimatedValue = new Animated.Value(width);
    setScrollValue(Animated.divide(scrollX, containerWidthAnimatedValue));

    setContainerWidth(layoutWidth);
    requestAnimationFrame(() => {
      goToPage(currentPage);
    });
  };
  /** tabChange回调 */
  const _onChangeTab = (prevPage: number, curPage: number) => {
    if (onChangeTab && typeof onChangeTab === 'function') {
      onChangeTab({
        i: curPage,
        from: prevPage,
      });
    }
  };

  /** 更新选择的页面 */
  const updateSelectedPage = (nextPage: number) => {
    updateSceneKeys({
      curPage: nextPage,
      callback: () => _onChangeTab(currentPage, nextPage),
    });
  };

  /** 手势结束后处理 */
  const onMomentumScrollBeginAndEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newPage = Math.round(offsetX / containerWidth);
    if (currentPage !== newPage) {
      updateSelectedPage(newPage);
    }
  };
  /** 重置分割宽度 */
  useEffect(() => {
    const containerWidthAnimatedValue = new Animated.Value(containerWidth);
    setScrollValue(Animated.divide(scrollX, containerWidthAnimatedValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth]);

  /** 初始化场景key */
  useEffect(() => {
    if (children) {
      updateSceneKeys({ curPage: currentPage });
    }

    if (page >= 0 && page !== currentPage) {
      goToPage(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const composeScenes = () => {
    const childList = _children();
    return tabs.map((tab, idx) => {
      let key = makeSceneKey(tab, idx);

      return (
        <View key={key} style={{ width: containerWidth }}>
          {keyExists(sceneKeys, key) ? (
            childList[idx]
          ) : (
            //@ts-ignore
            <View key={key} />
          )}
        </View>
      );
    });
  };

  const _onScroll = (e: NativeSyntheticEvent<any>) => {
    const offsetX = e.nativeEvent.contentOffset.x;

    /** 排除首次动画 */
    if (offsetX === 0 && !scrollOnMountCalled) {
      scrollOnMountCalled = true;
    } else {
      onScroll(offsetX / containerWidth);
    }
  };

  const renderScrollableContent = () => {
    const scenes = composeScenes();
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        automaticallyAdjustContentInsets={false}
        contentOffset={{
          x: initialPage * containerWidth,
          y: 0,
        }}
        ref={scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true,
            listener: _onScroll,
          }
        )}
        onMomentumScrollBegin={onMomentumScrollBeginAndEnd}
        onMomentumScrollEnd={onMomentumScrollBeginAndEnd}
        scrollEventThrottle={16}
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={!locked}
        directionalLockEnabled
        alwaysBounceVertical={false}
        keyboardDismissMode="on-drag"
        {...contentProps}
      >
        {scenes}
      </Animated.ScrollView>
    );
  };

  const renderTabBarHandle = () => {
    const TabProps = {
      goToPage,
      tabs: tabs ?? [],
      activeTab: currentPage,
      scrollValue: scrollValue,
      containerWidth: containerWidth,
    } as DefaultTabBarProps;

    if (tabBarBackgroundColor) {
      TabProps.backgroundColor = tabBarBackgroundColor;
    }
    if (tabBarActiveTextColor) {
      TabProps.activeTextColor = tabBarActiveTextColor;
    }
    if (tabBarInactiveTextColor) {
      TabProps.inactiveTextColor = tabBarInactiveTextColor;
    }
    if (tabBarTextStyle) {
      TabProps.textStyle = tabBarTextStyle;
    }
    if (tabBarUnderlineStyle) {
      TabProps.tabBarUnderlineStyle = tabBarUnderlineStyle;
    }
    if (style) {
      TabProps.style = style;
    }
    if (renderTabBar === false) {
      return null;
    } else if (renderTabBar) {
      return React.cloneElement(renderTabBar(TabProps), TabProps);
    } else {
      return <DefaultTabBar {...TabProps} />;
    }
  };

  return (
    <View style={[styles.container, style]} onLayout={_handleLayout}>
      {renderTabBarHandle()}
      {renderScrollableContent()}
    </View>
  );
};

export default ScrollableTabView;
