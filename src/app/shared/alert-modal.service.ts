import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
}

@Injectable({
  providedIn: 'root',
})
export class AlertModalService {
  constructor(private modalService: BsModalService) {}

  private showAlert(
    message: string,
    type: AlertTypes,
    dismissTimeout?: number
  ) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  showAlertDanger(message: string, dismissTimeout?: number) {
    this.showAlert(message, AlertTypes.DANGER, dismissTimeout);
  }

  showAlertSuccess(message: string, dismissTimeout?: number) {
    this.showAlert(message, AlertTypes.SUCCESS, dismissTimeout);
  }

  showConfirm(
    title: string,
    message: string,
    buttonConfirmText?: string,
    buttonCancelText?: string
  ): Subject<boolean> {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.message = message;

    if (buttonConfirmText) {
      bsModalRef.content.buttonConfirmText = buttonConfirmText;
    }

    if (buttonCancelText) {
      bsModalRef.content.buttonCancelText = buttonCancelText;
    }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }
}
