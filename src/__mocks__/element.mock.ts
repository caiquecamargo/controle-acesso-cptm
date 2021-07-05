export function createElementMock(content?: string) {
  const elementMock = document.createElement("div");

  if (content) elementMock.innerHTML = content;

  return elementMock;
}
