# react-native-scrollable-tab

base

## Installation

```sh
npm install react-native-scrollable-tab
```

## Usage

```js
import ScrollableTabView from 'react-native-scrollable-tab';

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
        tabs={['定位(1)', '定位(1)', '定位(1)']}
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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
