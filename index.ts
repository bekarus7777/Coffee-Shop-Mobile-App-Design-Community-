import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent вызывает AppRegistry.registerComponent('main', () => App);
// и настраивает окружение как для Expo Go, так и для нативной сборки.
registerRootComponent(App);
