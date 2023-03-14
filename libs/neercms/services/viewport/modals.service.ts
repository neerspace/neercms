import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IModalHandlers, IModalInfo } from './types';

@Injectable({ providedIn: 'root' })
export class ModalsService {
  current: BehaviorSubject<IModalInfo> = new BehaviorSubject({} as IModalInfo);

  showConfirmDelete(handlers: IModalHandlers): void {
    this.showModal(this.deleteModal(), handlers);
  }

  showConfirmBan(modelName: string, handlers: IModalHandlers): void {
    this.showModal(this.banModal(modelName), handlers);
  }

  showConfirmLiftBan(modelName: string, handlers: IModalHandlers): void {
    this.showModal(this.liftBanModal(modelName), handlers);
  }

  showConfirmPublish(modelName: string, handlers: IModalHandlers): void {
    this.showModal(this.publishModal(modelName), handlers);
  }

  private showModal(modal: IModalInfo, handlers: IModalHandlers): void {
    modal.confirmed = handlers.confirmed;
    modal.closed = handlers.closed;
    this.current.next(modal);
  }

  private deleteModal(): IModalInfo {
    return {
      title: 'Confirm Delete',
      text: 'Are you sure that you want to delete this?',
      confirmVariant: 'danger',
    };
  }

  private banModal(modelName: string): IModalInfo {
    return {
      title: `Confirm ${modelName} BAN`,
      text: `Are you sure that you want to BAN this ${modelName.toLowerCase()}?`,
      confirmVariant: 'danger',
      confirmText: 'BAN THIS SHIT!',
      showTextArea: true,
    };
  }

  private liftBanModal(modelName: string): IModalInfo {
    return {
      title: `Confirm ${modelName} Lift the BAN`,
      text: `Are you sure that you want to lift the BAN from this ${modelName.toLowerCase()}?`,
      confirmVariant: 'warning',
      confirmText: 'Lift the BAN',
    };
  }

  private publishModal(modelName: string): IModalInfo {
    return {
      title: `Confirm ${modelName} Publish`,
      text: `Are you sure that you want to publish this ${modelName.toLowerCase()}?`,
      confirmVariant: 'success',
      confirmText: 'Confirm and Publish',
    };
  }
}
