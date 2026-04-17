type EventHandler = (event: Event) => void;
type EventListenersMap = { [event: string]: EventHandler };

const eventListeners = new WeakMap<Element, EventListenersMap>();
const observers = new WeakMap<Element, MutationObserver>();
const registeredNames = new WeakMap<Element, Set<string>>();

export function addTrackedEventListener(
  element: Element,
  event: string,
  handler: EventHandler
): void {
  const existing = eventListeners.get(element) ?? {};
  eventListeners.set(element, { ...existing, [event]: handler });
  element.addEventListener(event, handler);
}

export function hasEventListener(element: Element, event: string): boolean {
  return eventListeners.has(element) && !!eventListeners.get(element)?.[event];
}

export function registerFieldName(form: Element, name: string): void {
  if (!registeredNames.has(form)) registeredNames.set(form, new Set());
  registeredNames.get(form)?.add(name);
}

export function getRegisteredNames(form: Element): Set<string> {
  return registeredNames.get(form) ?? new Set();
}

export function setObserver(
  element: Element,
  observer: MutationObserver
): void {
  observers.set(element, observer);
}

export function getObserver(element: Element): MutationObserver | undefined {
  return observers.get(element);
}

export function disconnectObserver(element: Element): void {
  observers.get(element)?.disconnect();
  observers.delete(element);
}
