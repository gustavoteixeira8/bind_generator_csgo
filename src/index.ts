import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'jquery';
import 'bootstrap';
import './assets/css/style.css';
import { BindGenerator } from './modules/BindGenerator';
import { addText } from './modules/addText';
import './modules/addSectionsToDOM';
import { convertKeys } from './modules/convertKeys';
import { downloadTXT } from './modules/download';
import { Dropdown } from 'bootstrap';
import { TYPEOF_BIND_BUY, TYPEOF_BIND_COMMANDS, TYPEOF_CLEAR_BLOOD, TYPEOF_DROP_BOMB, TYPEOF_DROP_PISTOL, TYPEOF_FAKE_FLASH, TYPEOF_JUMP_SCROLL, TYPEOF_JUMP_THROW } from './modules/constants';

let currentTypeofBind = TYPEOF_BIND_BUY;
const bind = new BindGenerator();
const dropdownButton = document.querySelector(".dropdown-toggle") as HTMLButtonElement;
const sectionGuns = document.querySelector('#section-guns') as HTMLDivElement;
const sectionCommands = document.querySelector('#section-commands') as HTMLDivElement;
const typeofBind = document.querySelectorAll('.typeof-bind') as NodeListOf<HTMLAnchorElement>;
const pageUpOrDown = document.querySelector('#page-up-or-down') as HTMLDivElement;
const selectKeyButton = document.querySelector('#select-key') as HTMLButtonElement;
const keySelected = document.querySelector('#key-selected') as HTMLParagraphElement;
const inputGuns = document.querySelectorAll('.input-guns') as NodeListOf<HTMLInputElement>;
const inputCommands = document.querySelectorAll('.input-commands') as NodeListOf<HTMLInputElement>;
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

export function commandsChecked(): string[] {
  const commands: string[] = [];

  inputCommands.forEach((input) => {
    const isChecked = input.checked;

    const typeofCmd = input.getAttribute('typeof-command');

    if (isChecked && typeofCmd) commands.push(typeofCmd);
  })

  return commands;
}

export function bindCommands() {
  const commandsToBind = commandsChecked();

  const commandCompleted = commandsToBind.map((cmd) => {
    if (cmd === TYPEOF_JUMP_THROW) {
      return '+jump;-attack;-attack2;-jump';
    }
    if (cmd === TYPEOF_CLEAR_BLOOD) {
      return 'r_cleardecals';
    }
    if (cmd === TYPEOF_JUMP_SCROLL) {
      return 'mwheelup +jump;bind mwheeldown +jump;bind space +jump';
    }
    if (cmd === TYPEOF_DROP_BOMB) {
      return 'use weapon_knife; use weapon_c4; drop; say_team I HAVE DROPPED THE BOMB';
    }
    if (cmd === TYPEOF_DROP_PISTOL) {
      return 'slot2; drop;';
    }
    if (cmd === TYPEOF_FAKE_FLASH) {
      return 'use weapon_knife; use weapon_flashbang; drop; slot1';
    }
  });

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
    if (currentTypeofBind === TYPEOF_BIND_BUY) {
      bindGuns();
    } else if (currentTypeofBind === TYPEOF_BIND_COMMANDS) {
      bindCommands();
    }

    uncheckGunsCheckbox();
    resetKeySelectedText();
    addKeypressListener();

    const bindsCreated = document.querySelectorAll('.bind-created') as NodeListOf<HTMLElement>;
    bindsCreated.forEach((el: HTMLElement) => {
      el.addEventListener('click', () => {
        const data = el.textContent as string;
        copyToClipboard(data.trim());
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
  const outputData = outputBind;

  if (!outputData) {
    return;
  }

  let outputFinal = "";

  const outputChildren = outputBind.querySelectorAll("p.bind-created");

  for (const child in outputChildren) {
    const childText = outputChildren[child].textContent;
    if (childText) {
      outputFinal += `${childText.trim()}\n`;
    }
  }


  downloadTXT('bind_csgo', outputFinal);
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

dropdownButton.addEventListener('click', () => {
  const dropdownClass = new Dropdown(dropdownButton);
  dropdownClass.toggle();
});

typeofBind.forEach((element: HTMLAnchorElement) => {
  element.addEventListener('click', (event: Event) => {
    const attrTypeof = element.getAttribute('typeof-bind');

    if (!attrTypeof) return;

    if (attrTypeof === TYPEOF_BIND_BUY) {
      sectionGuns.style.display = 'block';
      sectionCommands.style.display = 'none';
      currentTypeofBind = TYPEOF_BIND_BUY;
      return;
    }

    if (attrTypeof === TYPEOF_BIND_COMMANDS) {
      sectionGuns.style.display = 'none';
      sectionCommands.style.display = 'block';
      currentTypeofBind = TYPEOF_BIND_COMMANDS;
      return;
    }
  });
});
