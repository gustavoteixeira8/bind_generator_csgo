import { addText } from "../utils";
import { guns } from "./guns";

export function addGunsToDOM() {
  const gunsContainer = document.querySelector('#guns-container') as HTMLDivElement;

  guns.forEach((gun) => {
    const text = `
      <div class="col-auto my-2">
        <input type="checkbox" class="btn-check input-guns" guncode="${gun.code}" id="${gun.code}" autocomplete="off">
        <label class="btn btn-outline-dark border-warning text-warning label-guns" for="${gun.code}">
          ${gun.name}
        </label>
      </div>
    `
    addText(gunsContainer, text, '+');
  })
}
addGunsToDOM();
