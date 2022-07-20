import { ObjectUtils } from './object-utils';

export const equals = (
  object: { [x: string]: any },
  compare: { [x: string]: any },
  options?: { convertEmptyStringsToNull?: boolean, uniqueField?: string }
) => {
  if (JSON.stringify(object) === JSON.stringify(compare)) {
    return true;
  }
  const valueUnique = ObjectUtils.findValueEntryObject(object, options?.uniqueField);
  const compareValue = ObjectUtils.findValueEntryObject(compare, options?.uniqueField);
  if (options?.uniqueField && valueUnique && valueUnique === compareValue) {
    return true;
  }

  if (Object.entries(object).length !== Object.entries(compare).length) {
    return false;
  }
  return compareKeyValueObjects(object, compare, options);
};

const compareKeyValueObjects = (
  object: { [x: string]: any },
  compare: { [x: string]: any },
  options: { convertEmptyStringsToNull?: boolean, uniqueField?: string }
): boolean => {
  let equal = undefined;

  Object.entries(object || {}).forEach(([key, value]) => {
    if (equal === false) {
      return;
    }

    const [fieldKey, fieldValue] =
      Object.entries(compare || {}).find(
        ([keyComp, _valueComp]) => key === keyComp
      ) || [];
    if (Array.isArray(fieldValue)) {
      if (!value.lenth && !fieldValue.length) {
        equal = true;
        return;
      }

      equal = fieldValue.every((everyFieldValue): boolean =>
        value.some((everyValue): boolean => equals(everyFieldValue, everyValue))
      );
      return;
    }
    if (fieldValue instanceof Object) {
      equal = equals(value, fieldValue);
      return;
    }
    equal =
      convertNullableValuesToUndefined(
        fieldValue,
        options?.convertEmptyStringsToNull
      ) ===
      convertNullableValuesToUndefined(
        value,
        options?.convertEmptyStringsToNull
      ) && fieldKey === key;
  });
  return equal;
};

export const convertNullableValuesToUndefined = (
  value: any,
  convertEmptyStrings?: boolean
) => {
  const condition = convertEmptyStrings ? !value : !value && value !== '';
  if (condition) {
    return undefined;
  }
  return value;
};
