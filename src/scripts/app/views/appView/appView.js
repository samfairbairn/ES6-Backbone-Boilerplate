'use strict';

// app
import ExampleComponent from '../exampleComponent/exampleComponentView'

//template
import template from './appView.ejs';

// styles
import "suitcss-base";
import "./appView.scss";

class AppView extends Marionette.LayoutView {

    el() { return '#app' }

    template(){ return template }

    regions() { return {
        mainRegion: '[data-region="main"]'
    }}

    initialize() {

        this.render();

    }

    onRender() {

        this.mainRegion.show(new ExampleComponent());

    }
}

export default AppView;