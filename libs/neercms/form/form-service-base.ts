import { inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormReady, FormReadyWrapper } from 'neercms/form/types';
import { ModalsService, ToasterService } from 'neercms/services/viewport';

export abstract class FormServiceBase {
  public readonly form: FormGroup;
  public readonly router: Router = inject(Router);
  public readonly modals: ModalsService = inject(ModalsService);
  public readonly toaster: ToasterService = inject(ToasterService);
  private readonly formBuilder = inject(FormBuilder);
  private readyWrap: FormReadyWrapper = new FormReadyWrapper();

  protected constructor(controls: object) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.form = this.formBuilder.group(controls) as any;
  }

  init(isCreating: boolean): void {
    if (isCreating) {
      this.setReady('ready');
    }
  }

  get ready(): FormReadyWrapper {
    if (!this.readyWrap) {
      throw new Error('Form ready contains an invalid value');
    }
    return this.readyWrap;
  }

  get isReady(): boolean {
    return this.readyWrap.valueOf();
  }

  get isLoading(): boolean {
    return this.readyWrap.state === 'loading';
  }

  setReady(value: FormReady) {
    this.readyWrap.state = value;
  }
}
