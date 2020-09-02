const ObsyPlugin = require('./ObsyPlugin');
//import ObsyPlugin from './ObsyPlugin';

class Test extends ObsyPlugin {
    constructor() {
        super({
            debug: true
        });

        this.initialize({
            name: 'Demo plugin',
            description: 'Demo obsy plugin example',
            placements: ['modal_tab'],
            events: [{
                name: 'create_object',
                type: 'after'
            }],
            debug: true
        });
    }

    onMount() {
        console.log('mounted success');
    }

    onDestroy() {
        console.log('destroyed success');
    }
}

const test = new Test();

if (test.isInitialized()) {

    /**
     * Emulate 'mount' lifecycle from obsy
     */
    test.onAction({}, {}, 'mount');

    /**
     * Emit messages
     */
    test.addEventListener((type, msg) => {
        console.log('type', type);
        console.log('msg', msg);
    });
    test.emit('call', { lol: 1 });

    /**
     * Immutability tests
     */
    test.props.placements = 666;
    console.log(test.getProps());
    test._securedContext().props.placements = 666;
    console.log(test._securedContext().props.placements);
    console.log(test.getProps().placements);
    console.log(test.getEventListener());

    /**
     * Emulate 'destroy' lifecycle from obsy
     */
    test.onAction({}, {}, 'destroy');
} else {
    console.error('Error with initialization...')
}

console.log(test.isInitialized());

/**
 * Generated test output
 */
// node test.js
// Trying to execute: onMount
// mounted success
// type call
// msg { lol: 1 }
// { placements: [ 'modal_tab' ],
//     events: [ { name: 'create_object', type: 'after' } ],
//     debug: true,
//     name: 'Demo plugin',
//     description: 'Demo obsy plugin example' }
// [ 'modal_tab' ]
//     [ 'modal_tab' ]
// Trying to execute: onDestroy
// destroying
// destroyed success
// false


