export const numpadKeys: Record<string, string> = {
  Numpad1: 'kp_end',
  Numpad2: 'kp_downarrow',
  Numpad3: 'kp_pgdn',
  Numpad4: 'kp_leftarrow',
  Numpad5: 'kp_5',
  Numpad6: 'kp_rightarrow',
  Numpad7: 'kp_home',
  Numpad8: 'kp_uparrow',
  Numpad9: 'kp_pgup',
  Numpad0: 'kp_ins',
  NumpadMultiply: 'kp_multiply',
  NumpadDivide: 'kp_slash',
  NumpadSubtract: 'kp_minus',
  NumpadAdd: 'kp_plus',
  NumpadComma: '.',
  NumpadDecimal: 'kp_del',
  NumpadEnter: 'kp_enter'
};

export function convertKeys(keyCode: string, key: string): string {
  const hasNumpad = keyCode.toLowerCase().search(/numpad/);

  if (hasNumpad !== -1) {
    key = numpadKeys[keyCode];
  }

  return key.toUpperCase();
}
