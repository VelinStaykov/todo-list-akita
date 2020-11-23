import ListenerMap from "./listenerMap";

class EventManager {

    _listenerMap = new ListenerMap();

    /** Sends the event to all interested listeners. */
    dispatch(type, payload) {

        const listenersForEvent = this._listenerMap.getListenersFor(type);

        listenersForEvent.forEach((listenerCallback) => {
            listenerCallback(payload);
        })
    }

    /** Subscribes a listener for the specific event. Returns a callback for unsubscribing. */
    addListener(eventType, listenerCallback) {

        return this._listenerMap.addListener(eventType, listenerCallback);
    }

    /** Unsubscribes a listener from the specified event. */
    removeListener(eventType, listenerCallback) {

        this._listenerMap.removeListener(eventType.name, listenerCallback);
    }
}

const eventManager = new EventManager();

export default eventManager;
