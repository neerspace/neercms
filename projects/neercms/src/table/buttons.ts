import { IButtonInfo } from './types';

export function editButton(text?: string): IButtonInfo {
  return {
    class: 'edit',
    text: text,
    icon: 'la-edit',
  };
}

export function deleteButton(text?: string): IButtonInfo {
  return {
    class: 'delete',
    text: text,
    icon: 'la-backspace',
  };
}
