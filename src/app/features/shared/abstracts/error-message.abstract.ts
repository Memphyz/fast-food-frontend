import { AbstractControl } from '@angular/forms';
import { values } from 'lodash';

export abstract class ErrorMessage {
  /**
   * @description Permite informar mensagens de erros customizadas para retorno
   *
   * @type {{ [key: string]: string }}
   * @memberof ErrorMessage
   */
  public customErrors: { [x: string]: string } = {};

  /**
   * @description Retorna a mensagem de erro de acordo com o tipo de erro
   *
   * @param {object} error
   * @param {string} [nome='']
   * @return {*}  {string}
   * @memberof ErrorMessage
   */
  public getErrorMessage(error: AbstractControl | object, nome = ''): string {
    if (error instanceof AbstractControl) {
      return error.invalid && error.touched
        ? this.getMessage(error.errors, nome)
        : '';
    }
    return this.getMessage(error, nome);
  }

  private getMessage(errorType: any, nome: string): string {
    if (!errorType) {
      return '';
    }

    const errors = {
      horas: 'Hora inválida',
      date: 'A data está inválida',
      minlength: `O ${nome || 'campo'} não possui a quantidade mínima de ${(errorType.minlength || {}).requiredLength
        } caracteres`,
      maxlength: `Limite de ${(errorType.maxlength || {}).requiredLength
        } caracteres atingidos`,
      cpfvalidator: `O CPF está inválido`,
      cnpjvalidator: `O CNPJ está inválido`,
      espaco: `${nome || 'Campo'} Inválido`,
      pattern: `${nome || 'Campo'} Inválido`,
      email: `Email Inválido`,
      minMaxDate: `Data inválida`,
      minMaxDateTime: `Data/Hora Inválida`,
      mask: `O ${nome || 'campo'} está inválido`,
      required: 'Este campo é obrigatório',
      specialCharacters: `Não são permitidos a utilização de caracteres especiais`,
      cpf: 'O CPF está inválido',
      denyNumbers: 'Não são permitidos números',
      phone: 'Numero de celular inválido',
      telefone: 'Numero de telefone inválido',
      phonePattern: 'Telefone inválido',
      duplicated: 'O item selecionado já foi adicionado',
      noNumber: `O ${nome || 'campo'} está inválido`,
      denySpaceOnly: `Este campo é obrigatório`,
      cnpj: 'CNPJ inválido',
      select: `Este campo é obrigatório`,
      cpfcnpj: 'CPF/CNPJ inválido',
      dataInvalida: 'Data inválida',
      repeat: 'Não é permitido o uso de números repetidos',
      notblanktext: `Este campo é obrigatório`,
      notUnefinedNull: `Este campo é obrigatório`,
      ...this.customErrors,
    };

    const key = Object.keys(errorType)[0];
    const message: string =
      errors[key] ||
      (typeof values(errorType)[0] === 'string' && values(errorType)[0]);
    return message || errors.required;
  }
}
