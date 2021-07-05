export function mockEvent(target: Element): Event {
  return {
    preventDefault: () => {},
    target: target,
  } as unknown as Event;
}

export function mockTouchEvent(position: number): TouchEvent {
  return {
    changedTouches: [
      {
        pageX: position,
      },
    ],
  } as unknown as TouchEvent;
}
