import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() buttonCancelText: string = "Cancelar";
  @Input() buttonConfirmText: string = "Confirmar";

  confirmResult: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

  onConfirm(): void {
    this.confirmAndCancel(true);
  }

  onClose(): void {
    this.confirmAndCancel(false);
  }

  private confirmAndCancel(value: boolean): void {
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }
}
