import React from 'react';
import StackNavigation from './routes/StackNavigation';
import {store} from './store/store';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <StackNavigation />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
