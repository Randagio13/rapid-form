type EventHandler = (event: Event) => void;
type EventListenersMap = { [event: string]: EventHandler };

const eventListeners = new WeakMap<Element, EventListenersMap>();

export function addTrackedEventListener(
  element: Element,
  event: string,
  handler: EventHandler
): void {
  if (!eventListeners.has(element)) {
    eventListeners.set(element, {});
  }
  const listeners = eventListeners.get(element)!;
  listeners[event] = handler;
  element.addEventListener(event, handler);
}

export function hasEventListener(element: Element, event: string): boolean {
  return eventListeners.has(element) && !!eventListeners.get(element)?.[event];
}