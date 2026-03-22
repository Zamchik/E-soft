function deepCopyObj(obj) {
  function copy(value, valueCopy) {
    // Проверка Примитивов, null, undefined, функции, символы
    if (value === null || typeof value !== 'object') {
      return value;
    }

    // Проверка циклических ссылок
    if (valueCopy.has(value)) {
      return valueCopy.get(value);
    }

    // Провека на объект
    const proto = Object.getPrototypeOf(value);
    const objCopy = Object.create(proto);
    valueCopy.set(value, objCopy);

    // Проверка на Array
    if (Array.isArray(value)) {
      const arrayCopy = [];
      valueCopy.set(value, arrayCopy);
      for (let i = 0; i < value.length; i++) {
        arrayCopy[i] = copy(value[i], valueCopy);
      }
      return arrayCopy;
    }

    //Проверка Date
    if (value instanceof Date) {
      const dateCopy = new Date(value);
      valueCopy.set(value, dateCopy);
      return dateCopy;
    }

    //Проверка Set
    if (value instanceof Set) {
      const setCopy = new Set();
      valueCopy.set(value, setCopy);
      for (const val of value) {
        setCopy.add(copy(val, valueCopy));
      }
      return setCopy;
    }

    //Проверка Map
    if (value instanceof Map) {
      const mapCopy = new Map();
      valueCopy.set(value, mapCopy);
      for (const [key, val] of value) {
        mapCopy.set(copy(key, valueCopy), copy(val, valueCopy));
      }
      return mapCopy;
    }

    const allProps = [
      ...Object.getOwnPropertyNames(value),
      ...Object.getOwnPropertySymbols(value)
    ];

    for (const key of allProps) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (descriptor) {
        if (descriptor.value !== undefined &&
          (typeof descriptor.value === 'object' || typeof descriptor.value === 'function')) {
          descriptor.value = copy(descriptor.value, valueCopy);
        }
        Object.defineProperty(objCopy, key, descriptor);
      }
    }
    return objCopy;
  }
  return copy(obj, new WeakMap());
}