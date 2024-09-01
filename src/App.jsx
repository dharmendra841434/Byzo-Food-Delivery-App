import React, {useEffect, useState} from 'react';
import StackNavigation from './routes/StackNavigation';
import {store} from './store/store';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import NoInternetConnection from './screens/NoInternetConnection';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const checkInternetAndNavigate = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });
  };

  useEffect(() => {
    checkInternetAndNavigate();
  }, []);

  return (
    <>
      {isConnected ? (
        <GestureHandlerRootView style={{flex: 1}}>
          <Provider store={store}>
            <StackNavigation />
          </Provider>
        </GestureHandlerRootView>
      ) : (
        <NoInternetConnection
          handleCheck={vl => {
            setIsConnected(true);
          }}
        />
      )}
    </>
  );
};

export default App;
