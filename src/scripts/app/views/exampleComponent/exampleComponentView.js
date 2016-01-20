'use strict';

//template
import template from './exampleComponent.ejs';

// styles
import "./exampleComponent.scss";

// images
import imgPlaceholder from './assets/placeholder.jpg';

class ExampleComponentView extends Marionette.LayoutView {

    template(){ return template({
        img_placeholder: imgPlaceholder
        })
    }

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