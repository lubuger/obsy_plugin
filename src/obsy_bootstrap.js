import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';
import ObsyPlugin from './ObsyPlugin';

class Demo extends ObsyPlugin {
    constructor() {
        super({
            debug: true
        });

        this.initialize({
            name: 'Demo plugin',
            description: 'Demo obsy plugin example',
            elementId: 'container',
            placements: ['modal_tab'],
            events: [{
                name: 'create_object',
                type: 'after'
            }]
        });
    }

    onMount() {
        if (this.isInitialized()) {
            const wrapper = document.getElementById(this.getProps().elementId);

            this.disableDebug();

            wrapper
                ? ReactDOM.render(<App />, wrapper)
                : false;

            return true;
        }

        return true;
    }

    onDestroy() {

    }
}

export default Demo;