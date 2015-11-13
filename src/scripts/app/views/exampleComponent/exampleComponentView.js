'use strict';

//template
import template from './exampleComponent.ejs';

// styles
import "./exampleComponent.scss";

class ExampleComponentView extends Marionette.LayoutView {

    template(){ return template }

    events() { return {
        'click': 'onClick'
    }}

    initialize() {
        this.render();
    }

    onClick() {
        alert('events working!');
    }

}

export default ExampleComponentView;