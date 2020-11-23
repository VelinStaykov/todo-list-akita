/** Utility data structure for managing the event manager's listeners. */
export default class ListenerMap {

    _listeners = {};

    addListener(eventType, listener) {

        if (!(eventType in this._listeners)) {
            this._listeners[eventType] = [];
        }

        this._listeners[eventType].push(listener);

        return () => this.removeListener(eventType, listener);
    }

    removeListener(eventType, listener) {

        this._listeners[eventType] = this._listeners[eventType].filter((existingListener) => {
            return existingListener !== listener;
        })
    }

    getListenersFor(eventType) {
        if (!(eventType in this._listeners)) {
            return [];
        }

        return this._listeners[eventType];
    }
}
