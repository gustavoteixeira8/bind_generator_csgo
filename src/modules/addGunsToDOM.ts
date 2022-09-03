import { addText } from "./addText";
import { guns } from "./guns";

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
