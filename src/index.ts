import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'bootstrap'
import './assets/css/style.css'
import { BindGenerator } from './modules/BindGenerator';
import { addText } from './utils';
import './modules/addGunsToDOM';
import { convertKeys } from './utils/convertKeys';

const bind = new BindGenerator();
const selectKeyButton = document.querySelector('#select-key') as HTMLButtonElement;
const keySelected = document.querySelector('#key-selected') as HTMLParagraphElement;
const inputGuns = document.querySelectorAll('.input-guns') as NodeListOf<HTMLInputElement>;
const outputBind = document.querySelector('#output-bind') as HTMLDivElement;
const makeBindButton = document.querySelector('#make-bind-button') as HTMLButtonElement;
const resetOutput = document.querySelector('#reset-output') as HTMLButtonElement;
const copyOutput = document.querySelector('#copy-output') as HTMLButtonElement;

function keypressListener(event: KeyboardEvent): void {
  console.log(event);

  const keyCaptured = convertKeys(event.code, event.key);
  console.log(keyCaptured);

  bind.setKey(keyCaptured);
  addText(keySelected, keyCaptured);
  removeKeypressListener();
}

selectKeyButton.addEventListener('click', () => {
  resetKeySelectedText();
  addKeypressListener();
});

export function addKeypressListener(): void {
  document.addEventListener('keydown', keypressListener);
}

export function removeKeypressListener(): void {
  document.removeEventListener('keydown', keypressListener);
}

export function gunsChecked(): string[] {
  const guns: string[] = [];

  inputGuns.forEach((input) => {
    const isChecked = input.checked;

    const gunCode = input.getAttribute('guncode');

    if (isChecked && gunCode) guns.push(gunCode);
  })

  return guns;
}

export function bindGuns(): void {
  const gunsToBind = gunsChecked();

  const commandCompleted = gunsToBind.map((gun) => `buy ${gun};`);

  bind.setCommand(commandCompleted.join(''));

  const bindCreated = bind.makeBind();

  addText(outputBind, `<p>${bindCreated}</p>`, '+');

  bind.reset();
}

export function uncheckGunsCheckbox(): void {
  inputGuns.forEach((input) => input.checked = false);
}

export function resetKeySelectedText(): void {
  addText(keySelected, 'Waiting a new key...');
}

makeBindButton.addEventListener('click', () => {
  try {
    bindGuns();
    uncheckGunsCheckbox();
    resetKeySelectedText();
    addKeypressListener();
  } catch (error) {
    addKeypressListener();
    if (error instanceof Error) alert(error.message);
  }
});

resetOutput.addEventListener('click', () => {
  addText(outputBind, '');
});

copyOutput.addEventListener('click', () => {
  const outputData = outputBind.textContent as string;
  navigator.clipboard.writeText(outputData);
});
