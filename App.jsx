import React, {useEffect, useState} from 'react';
import RNRestart from 'react-native-restart';

import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NativeModules} from 'react-native';
const {CustomMethods} = NativeModules;

export default function App() {
  const [data, setData] = useState('');
  const [currentOption, setCurrentOption] = useState(0);

  useEffect(() => {
    const val = NativeModules.LoaderModule.fetchData();
    console.log(val);
  });

  useEffect(() => {
    NativeModules.LoaderModule.fetchStickerData(data => {
      if (data) {
        console.log(data);
      }
    });
  });

  useEffect(() => {
    if (data) {
      Alert.alert('Result', data);
    }
  }, [data]);

  function reloadNativeModule(moduleName) {
    NativeModules.DevSettings.reloadWithReason(`Reload: ${moduleName}`);

    if (currentOption === 0) {
      const val = NativeModules.LoaderModule.fetchData();
      if (val != 0) {
        setData(val + 'm');
      }
    } else {
      NativeModules.LoaderModule.fetchStickerData(d => {
        if (d) {
          setData(d);
        }
      });
    }
  }

  const nativeopenAugmentedView = async () => {
    const result = await CustomMethods.openAugmentedView();
    console.log(result);
  };

  const nativeAndroidActivity = () => {
    console.log(NativeModules.LoaderModule.launchARSession());
  };

  function decideLauncher() {
    if (Platform.OS === 'android') {
      setCurrentOption(0);
      nativeAndroidActivity();
    } else {
      nativeopenAugmentedView();
    }
  }

  return (
    <View
      style={{
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <TouchableOpacity
        style={{
          width: 300,
          height: 60,
          backgroundColor: 'teal',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
        }}
        onPress={decideLauncher}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          {' '}
          Point Measurments{' '}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: 20,
          width: 300,
          height: 60,
          backgroundColor: 'grey',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
        }}
        onPress={() => {
          reloadNativeModule('LoaderModule');
        }}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          {' '}
          Show Result{' '}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: 20,
          width: 300,
          height: 60,
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
        }}
        onPress={() => {
          setCurrentOption(1);
          NativeModules.LoaderModule.launchStickerSession();
        }}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          {' '}
          Image{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
