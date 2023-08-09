import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonTaskService {

  constructor(private _toaster: ToastrService) { }

  returnToastrMessages(messages: any) {
    for (let index = 0; index < messages.length; index++) {
      const element = messages[index];
      this._toaster.error(element, "Error")
    }
  }
}
