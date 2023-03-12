export type Variant =
  | 'primary'
  | 'secondary'
  | 'light'
  | 'dark'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

export interface IModalResult {
  text?: string;
}

export interface IModalHandlers {
  confirmed?: (result: IModalResult) => void;
  closed?: () => void;
}

export interface IModalInfo extends IModalHandlers {
  title: string;
  text: string;
  closeText?: string;
  closeVariant?: Variant;
  confirmText?: string;
  confirmVariant?: Variant;
  showTextArea?: boolean;
}
