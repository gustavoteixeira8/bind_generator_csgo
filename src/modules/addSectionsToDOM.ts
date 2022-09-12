import { addText } from "./addText";
import { guns } from "./guns";
import { bindCommands } from "./bindCommands";

export function addGunsToDOM() {
  const gunsContainer = document.querySelector('#guns-container') as HTMLDivElement;

  guns.forEach((gun) => {
    const text = `
      <div class="col-auto my-2">
        <input type="checkbox" class="btn-check input-guns" guncode="${gun.code}" id="${gun.code}" autocomplete="off">
        <label class="btn btn-outline-dark text-warning label-guns" for="${gun.code}" title="${gun.name}">
          <img src="${gun.image}" alt="${gun.name}" class="img-thumbnail">
        </label>
      </div>
    `
    addText(gunsContainer, text, '+');
  })
}
addGunsToDOM();

export function addCommandsToDOM() {
  const commandsContainer = document.querySelector('#command-container') as HTMLDivElement;

  bindCommands.forEach((command) => {
    const text = `
      <div class="col-6 my-2">
        <input type="checkbox" class="btn-check input-commands" id="${command.typeofCommand}" typeof-command="${command.typeofCommand}" autocomplete="off">
        <label class="btn btn-outline-warning text-white label-commands" for="${command.typeofCommand}" title="${command.title}">
          ${command.title}
        </label>
      </div>
    `
    addText(commandsContainer, text, '+');
  })
}
addCommandsToDOM();
