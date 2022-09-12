export interface CommandProtocol {
  typeofCommand: string;
  title: string;
}

export const bindCommands: CommandProtocol[] = [
  {
    title: 'Jump Throw',
    typeofCommand: 'JUMP_THROW'
  },
  {
    title: 'Jump Scroll',
    typeofCommand: 'JUMP_SCROLL'
  },
  {
    title: 'Drop Bomb',
    typeofCommand: 'DROP_BOMB'
  },
  {
    title: 'Drop Pistol',
    typeofCommand: 'DROP_PISTOL'
  },
  {
    title: 'Fake Flash',
    typeofCommand: 'FAKE_FLASH'
  },
  {
    title: 'Clear Blood',
    typeofCommand: 'CLEAR_BLOOD'
  },
]
