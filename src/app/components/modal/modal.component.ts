import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ title }}</h4>
    </div>
    <div class="modal-body">
      {{ message }}
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="modal.close('confirm')">Confirm</button>
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel')">Cancel</button>
    </div>
  `
})
export class ConfirmationModalComponent {
  @Input() title: string = "";
  @Input() message: string = "";

  constructor(public modal: NgbActiveModal) {}
}
