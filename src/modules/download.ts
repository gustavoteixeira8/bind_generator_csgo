function createLinkElement(): HTMLAnchorElement {
  const a = document.createElement('a');
  return a;
}

export function downloadTXT(filename: string, data: string | number | boolean) {
  const outputToFile = 'data:text/plain;charset=utf-8,' + encodeURIComponent(data);
  const link = createLinkElement();
  const element = document.querySelector('body') as HTMLBodyElement;

  element.appendChild(link);

  link.setAttribute("href", outputToFile)
  link.setAttribute('download', filename);
  link.click();

  element.removeChild(link);
}
