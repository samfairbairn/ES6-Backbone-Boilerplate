'use strict';

// dependencies
// Marionette, Backbone, 4, _ already supplied with webpack.ProvidePlugin

// app
import AppView from './views/appView/appView';

class App extends Marionette.Application {

    initialize() {

        const appView = new AppView();

    }
}

// Export
export default App;
