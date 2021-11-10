export type PlusOrMinus = '+' | '-';

export function addText(element: Element, text: string, add: PlusOrMinus = '-'): void {
  add === '-' ? element.innerHTML = text : element.innerHTML += text;
}
