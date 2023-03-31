import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormError } from 'neercms/form/types';
import { BoolInput } from 'neercms/shared/types';
import { FieldBaseComponent } from '../field-base.component';

export type LinkTarget = '' | '_self' | '_blank';

@Component({
  selector: 'nc-link-field',
  templateUrl: './link-field.component.html',
  styleUrls: ['./link-field.component.scss', '../field-shared.scss'],
})
export class LinkFieldComponent extends FieldBaseComponent {
  @Input() linkControlName!: string;
  @Input() target: LinkTarget = '_blank';
  @Input() external: BoolInput = false;

  linkControl!: FormControl;

  constructor(private readonly router: Router) {
    super();
  }

  override afterInit() {
    this.disabled = true;

    if (!this.linkControlName) {
      throw new FormError(
        "A correct form control mast be linked to the field using 'controlName' property",
      );
    }

    this.linkControl ??= this.formGroup.form.get(this.linkControlName) as FormControl;
    if (!this.linkControl) {
      throw new FormError(`Form control for '${this.linkControlName}' not exists in FormGroup`);
    }
  }

  onRedirect() {
    const dest = this.linkControl.value;
    if (typeof dest !== 'string') {
      throw new FormError('Link url mast be a non-empty string');
    }

    if (this.external) {
      window.open(dest, this.target);
    } else {
      this.router.navigate([dest]).catch(() => {
        console.error(
          `If '${dest}' is an external url, you must to explicitly specify 'external=true' on link field.`,
        );
      });
    }
  }
}
