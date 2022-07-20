export class ObjectUtils {
  public static findValueEntryObject(object: any, campo: string): string | number | Date {
    const buscarItem = (acumulador: any, valor: string): string | number | Date => {
      if (acumulador) {
        return acumulador[valor];
      }
      return undefined;
    };
    return campo?.split('.').reduce(buscarItem, object);
  }
}
