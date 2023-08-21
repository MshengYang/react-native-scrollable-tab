import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  return (
    <View style={styles.container}>
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
          <Text>asf</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>12</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>12</Text>
        </View>
      </ScrollableTabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
