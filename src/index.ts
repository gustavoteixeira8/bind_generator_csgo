import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'bootstrap'
import './assets/css/style.css'
import { BindGenerator } from './modules/BindGenerator';
import { addText } from './modules/addText';
import './modules/addGunsToDOM';
import { convertKeys } from './modules/convertKeys';
import { downloadTXT } from './modules/download';

const bind = new BindGenerator();
const pageUpOrDown = document.querySelector('#page-up-or-down') as HTMLDivElement;
const selectKeyButton = document.querySelector('#select-key') as HTMLButtonElement;
const keySelected = document.querySelector('#key-selected') as HTMLParagraphElement;
const inputGuns = document.querySelectorAll('.input-guns') as NodeListOf<HTMLInputElement>;
const outputBind = document.querySelector('#output-bind') as HTMLDivElement;
const makeBindButton = document.querySelector('#make-bind-button') as HTMLButtonElement;
const resetOutput = document.querySelector('#reset-output') as HTMLButtonElement;
const copyOutput = document.querySelector('#copy-output') as HTMLButtonElement;
const downloadOutput = document.querySelector('#download-output') as HTMLButtonElement;

function keypressListener(event: KeyboardEvent): void {
  const keyCaptured = convertKeys(event.code, event.key);
  bind.setKey(keyCaptured);
  addText(keySelected, keyCaptured);
  removeKeypressListener();
}

selectKeyButton.addEventListener('click', () => {
  selectKeyButton.blur();
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

  addText(outputBind, `
    <p class='bind-created' title='Click to copy'>
      ${bindCreated}\n
    </p>`,
    '+'
  );

  bind.reset();
}

export function uncheckGunsCheckbox(): void {
  inputGuns.forEach((input) => input.checked = false);
}

export function resetKeySelectedText(): void {
  addText(keySelected, 'Waiting a new key...');
}

export function copyToClipboard(data: string): void {
  if (!data) {
    return;
  }

  navigator.clipboard.writeText(data);
}

makeBindButton.addEventListener('click', () => {
  try {
    bindGuns();
    uncheckGunsCheckbox();
    resetKeySelectedText();
    addKeypressListener();

    const bindsCreated = document.querySelectorAll('.bind-created') as NodeListOf<HTMLElement>;
    bindsCreated.forEach((el: HTMLElement) => {
      el.addEventListener('click', () => {
        const data = el.textContent as string;
        copyToClipboard(data);
        alert('Copied!');
      });
    });
  } catch (error) {
    addKeypressListener();
    if (error instanceof Error) alert(error.message);
  }
});

resetOutput.addEventListener('click', () => {
  addText(outputBind, '');
});

copyOutput.addEventListener('click', () => {
  const allData = outputBind.textContent as string;
  copyToClipboard(allData);
  alert('Copied!');
});

downloadOutput.addEventListener('click', () => {
  const outputData = outputBind.textContent as string;

  if (!outputData) {
    return;
  }

  downloadTXT('bind_csgo', outputData);
});

pageUpOrDown.addEventListener('click', () => {
  if (window.scrollY > 0) {
    window.scrollTo({ top: 0 });
    return;
  }
});

document.addEventListener('scroll', () => {
  if (window.scrollY >= 250) {
    pageUpOrDown.style.display = 'flex';
    return;
  }
  pageUpOrDown.style.display = 'none';
});
