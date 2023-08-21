# @mshengyang/react-native-scrollable-tab


## Installation

```sh
npm install @mshengyang/react-native-scrollable-tab
//or
yarn add @mshengyang/react-native-scrollable-tab
```

## Usage

```js
import ScrollableTabView from '@mshengyang/react-native-scrollable-tab';

// ...

<ScrollableTabView
        initialPage={1}
        tabBarUnderlineStyle={{
          backgroundColor: '#0BC2D2',
        }}
        onChangeTab={(page) => {
          console.log('17=>', page);
        }}
        tabBarActiveTextColor={'#0BC2D2'}
        style={{
          borderWidth: 0,
          marginTop: 8,
        }}
        tabs={['tab1', 'tab2', 'tab3']}
        contentProps={{ style: { borderWidth: 0 } }}
      >
        <View style={{ flex: 1 }}>
          <Text>1</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>2</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>3</Text>
        </View>
      </ScrollableTabView>
```
## API

| props                          | desc             | type                                                    |
| :----------------------------- | :--------------- | :------------------------------------------------------ |
| **initialPage**                |  初始页面            | number                                                  |
| **page**                       | 页面               | number                                                  |
| **onChangeTab**                | tab变化的回调         | (param: { i: number; from: number }): void;             |
| **onScroll**                   | 滚动的回调            | onChangeTab?(param: { i: number; from: number }): void; |
| **renderTabBar**               | 自定义Tabbar        | false \| ((props: DefaultTabBarProps) => any);          |
| **tabBarUnderlineStyle**       | Bar下划线样式         | ViewStyle                                               |
| **tabBarBackgroundColor**      | Bar 背景色          | string                                                  |
| **tabBarActiveTextColor**      | Bar激活时的text颜色    | string                                                  |
| **tabBarInactiveTextColor**    | 未激活的text颜色       | string                                                  |
| **tabBarTextStyle**            | text style       | TextStyle                                               |
| **style**                      | bar container 样式 | ViewStyle                                               |
| **contentProps**               | 内容区Props         | ScrollViewProps                                         |
| **scrollWithoutAnimation**     | 是否启用滚动动画         | boolean                                                 |
| **locked**                     | 禁止滚动             | boolean                                                 |
| **preRenderingSiblingsNumber** | 预渲染页面数量          | number                                                  |
| **tabs**                       | tab列表            | string\[]                                               |
 

* ****

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
