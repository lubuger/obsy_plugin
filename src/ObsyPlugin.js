/**
 * ObsyPlugin class component
 */
class ObsyPlugin {
    /**
     * ObsyPlugin init params
     * @param props {object}
     * @param props.debug {boolean} - Enable debug
     */
    constructor(props) {
        this.debug = typeof props === 'object' && props.debug ? props.debug : false;
        this._securedContext = null;

        /**
         * Can be one of the following: ['modal_tab', 'modal', 'popover'], false.
         * @typedef {array<string>|boolean} ObsyPlugin._placements
         */
        this._placements = [];

        /**
         * Array of events
         * @typedef {array<ObsyPlugin._eventTemplate>|boolean} ObsyPlugin._events
         */
        this._events = [];

        /**
         * Event template
         * @typedef {object} ObsyPlugin._eventTemplate
         * @property {string} name
         * Can be one, or many of the following: [
         * 'create_object',
         * 'update_object',
         * 'delete_object',
         * 'import_object',
         * 'edit_object',
         * 'click_object',
         * 'popup_object'
         * ], false.
         * @property {string} type
         * Can be one, or many of the following: ['before', 'after']
         */
        this._eventTemplate = {
            name: 'create_object',
            type: 'after'
        };


        /**
         * Data of event (geoJSON object and e.g.)
         * @typedef {Object} ObsyPlugin.eventData
         */

        /**
         * Data of event (geoJSON object and e.g.)
         * @typedef {Object} ObsyPlugin.eventProps
         */
    }

    /**
     * Allocates memory for secured usage for: props. Returns false if props check failed.
     * @param props {ObsyPlugin.props}
     * @returns {boolean}
     */
    checkProps(props) {
        const events = [
            'create_object',
            'update_object',
            'delete_object',
            'import_object',
            'edit_object',
            'click_object',
            'popup_object'
        ];
        const eventTypes = ['before', 'after'];

        if (typeof props !== 'object') {
            if (this.debug === true) {
                console.log('"props" object is not a object');
            }

            return false;
        }

        if (typeof props.elementId !== 'string') {
            if (this.debug === true) {
                console.log('"props.elementId" is not a string');
            }

            return false;
        }

        if (typeof props.name !== 'string') {
            if (this.debug === true) {
                console.log('"props.name" is not a string');
            }

            return false;
        }
        if (props.name.trim().length < 3) {
            if (this.debug === true) {
                console.log('"props.name" length should be more than 3 chars');
            }

            return false;
        }
        if (props.name.trim().length > 150) {
            if (this.debug === true) {
                console.log('"props.name" length should be less than 150 chars');
            }

            return false;
        }

        if (typeof props.description === 'string') {
            if (props.description.trim().length > 500) {
                if (this.debug === true) {
                    console.log('"props.description" length should be less than 500 chars');
                }

                return false;
            }
        }

        if (typeof props.placements === 'undefined') {
            if (this.debug === true) {
                console.log('"props.placements" is undefined');
            }

            return false;
        }
        if (Array.isArray(props.placements)) {
            if (props.placements.length === 0 ) {
                if (this.debug === true) {
                    console.log('"props.placements.length" is 0');
                }

                return false;
            }
        } else if (props.placements !== false) {
            if (this.debug === true) {
                console.log('"props.placements" is not false, invalid prop value');
            }

            return false;
        } else {
            if (this.debug === true) {
                console.log('"props.placements" is not array');
            }

            return false;
        }

        if (typeof props.events === 'undefined') {
            if (this.debug === true) {
                console.log('"props.events" is not undefined');
            }

            return false;
        }
        if (Array.isArray(props.events)) {
            if (props.events.length === 0 ) {
                if (this.debug === true) {
                    console.log('"props.events.length" is 0');
                }

                return false;
            } else {
                for (let index in props.events) {
                    if (props.events.hasOwnProperty(index)) {
                        if (!events.includes(props.events[index].name) || !eventTypes.includes(props.events[index].type) ) {
                            if (this.debug === true) {
                                console.log(`name OR type in ${props.events[index]} is invalid`);
                            }

                            return false;
                        }
                    }
                }
            }
        } else if (props.events !== false) {
            if (this.debug === true) {
                console.log('"props.events" is not false, invalid prop value');
            }

            return false;
        } else {
            if (this.debug === true) {
                console.log('"props.events" is not array');
            }

            return false;
        }

        return true;
    }

    /**
     * Allocates memory for secured usage for: props. Returns false if props check failed.
     * @param props {ObsyPlugin.props}
     * @returns {boolean}
     */
    initialize(props) {
        if (!this.checkProps(props)) {
            if (this.debug === true) {
                console.log('plugin init => false');
            }

            return false;
        }

        const memAlloc = () => {
            return () => {
                return {
                    props: {
                        name: props.name,
                        description: props.description ? props.description : null,
                        elementId: props.elementId,
                        placements: props.placements,
                        events: props.events,
                    }
                };
            };
        };

        this._securedContext = memAlloc();

        /**
         * Obsy plugin event props
         * @typedef {Object} ObsyPlugin.props
         * @property {string} name - Plugin name (from 3 to 150 chars)
         * @property {string} description - Plugin description (from null to 500 chars)
         * @property {string} elementId - Plugin (html id) elementId
         * @property {ObsyPlugin._placements} placements - Array of html ids
         * @property {ObsyPlugin._events} events - Array of events
         * @property {boolean} debug - Should be debug enabled
         */
        this.props = {...this._securedContext().props};

        if (this.debug === true) {
            console.log('plugin init => true');
        }

        return true;
    }

    /**
     * Check if plugin initialized successfully
     * @returns {boolean}
     */
    isInitialized() {
        return Object.keys(this.getProps()).length !== 0;
    }

    /**
     * Returns saved in secured context plugin props
     * @returns {ObsyPlugin.props|{}}
     */
    getProps() {
        try {
            return {
                ...this._securedContext().props,
                debug: this.debug,
            };
        } catch (e) {
            return {};
        }
    }

    /**
     * Emits message to obsy for interaction between plugins and app
     * @param name {string} - name (type) of event
     * @param data {object} - data to capture for event
     * @returns {boolean}
     */
    emit(name, data) {
        const eventTypes = [
            'call',
        ];

        if (eventTypes.includes(name)) {
            if (typeof this['_listener'] === 'function') {
                this._listener(name, data);

                return true;
            } else {
                if (this.debug === true) {
                    console.log(`Trying to emit a message but no active listener available... skipping...`);
                }
            }
        }

        if (this.debug === true) {
            console.log(`Trying to emit a message but provided invalid type... skipping...`);
        }

        return false;
    }

    /**
     * Adds listener for plugin events
     * @param callback {function}
     * @returns {boolean}
     */
    addEventListener(callback) {
        if (typeof callback === 'function') {
            this._listener = callback;

            return true;
        }

        return false;
    }

    /**
     * Returns plugin event listener
     * @returns {function}
     */
    getEventListener() {
        return this._listener
            ? this._listener
            : null;
    }

    /**
     * Listener for lifecycle methods and plugin events
     * @param data  {ObsyPlugin.eventData}
     * @param props {ObsyPlugin.eventProps}
     * @param type {ObsyPlugin.actionEvents}
     */
    onAction(data, props, type) {
        /**
         * Lifecycle events of plugin
         * @typedef {string} ObsyPlugin.actionEvents
         */
        const actionEvents = [
            'mount',
            'destroy',
        ];
        const pluginsEvents = [

        ];
        const eventTypes = [
            ...actionEvents,
            ...pluginsEvents
        ];

        if (eventTypes.includes(type)) {
            const name = `on${type[0].toUpperCase()}${type.substr(1)}`;

            if (this.debug === true) {
                console.log(`Executing: ${name}`);
            }

            if (typeof this[name] === 'function') {
                if (type === 'mount') {
                    if (this.__onMount() && this[name](data, props)) {
                        if (this.debug === true) {
                            console.log(`Executing: ${name} - success`);
                        }

                        return true;
                    }
                } else if (type === 'destroy') {
                    if (this.__onDestroy() && this[name](data, props)) {
                        if (this.debug === true) {
                            console.log(`Executing: ${name} - success`);
                        }

                        return true;
                    }
                }

                if (this.debug === true) {
                    console.log(`Executing: ${name} - failed, invalid type provided`);
                }

                return false;
            } else {
                if (this.debug === true) {
                    console.log(`Invalid type received: '${type}'`);
                }
            }

            return false;
        }
    }

    /**
     * Enables debug
     * @returns {boolean}
     */
    enableDebug() {
        console.log('Debug enabled');

        return this.debug = true;
    }

    /**
     * Disables debug
     * @returns {boolean}
     */
    disableDebug() {
        console.log('Debug disabled');

        return this.debug = false;
    }

    /**
     * wrapper before calling onMount
     * @returns {boolean}
     * @private
     */
    __onMount() {
        if (this.isInitialized()) {
            const wrapper = document.getElementById(this.getProps().elementId);

            if (wrapper) {
                return true;
            }
        }

        if (this.debug === true) {
            console.log(`No element found with ${this.getProps().elementId}`);
        }

        return false;
    }

    /**
     * wrapper before calling onDestroy
     * @returns {boolean}
     * @private
     */
    __onDestroy() {
        this._securedContext = null;

        if (this.debug === true) {
            console.log('destroying');
        }
    }
}

module.exports = ObsyPlugin;
