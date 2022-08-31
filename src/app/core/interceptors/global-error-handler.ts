import { ErrorHandler, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  public handleError(error: { message: string, stack: string }): void {
    if (error.message === `Cannot read properties of undefined (reading 'input')` && error.stack.includes('MdbFormControlComponent.ngAfterContentInit')) {
      return undefined;
    }
    console.error(error);
  }

}
