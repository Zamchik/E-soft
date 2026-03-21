function deepCopyObj(source, hash = new WeakMap()) {
  // Проверяет примитивы и null/undefined
  if (source === null || typeof source !== 'object') {
    return source;
  }

  // Проверка на циклические ссылки
  if (hash.has(source)) {
    return hash.get(source);
  }

  // Проверка на Date
  if (source instanceof Date) {
    const clonedDate = new Date(source.getTime());
    hash.set(source, clonedDate);
    return clonedDate;
  }

  // Проверка на Map
  if (source instanceof Map) {
    const clonedMap = new Map();
    hash.set(source, clonedMap);
    
    for (const [key, value] of source) {
      clonedMap.set(deepClone(key, hash), deepClone(value, hash));
    }
    
    return clonedMap;
  }

  // Проверка на Set
  if (source instanceof Set) {
    const clonedSet = new Set();
    hash.set(source, clonedSet);
    
    for (const value of source) {
      clonedSet.add(deepClone(value, hash));
    }
    
    return clonedSet;
  }

  // Проверка массива
  if (Array.isArray(source)) {
    const clonedArray = [];
    hash.set(source, clonedArray);
    
    for (let i = 0; i < source.length; i++) {
      clonedArray[i] = deepClone(source[i], hash);
    }
    
    return clonedArray;
  }

  // Проверка обычных объектов
  // Сохранtение прототипа исходного объекта
  const clonedObject = Object.create(Object.getPrototypeOf(source));
  hash.set(source, clonedObject);
  
  // Копируем все собственные свойства, включая неперечислимые и символы
  const allProperties = [
    ...Object.getOwnPropertyNames(source),
    ...Object.getOwnPropertySymbols(source)
  ];
  
  for (const key of allProperties) {
    const descriptor = Object.getOwnPropertyDescriptor(source, key);
    
    if (descriptor) {
      if (descriptor.value !== undefined) {
        // Обычное свойство со значением
        descriptor.value = deepClone(descriptor.value, hash);
      }
      // Свойства с геттером/сеттером оставляем как есть
      
      Object.defineProperty(clonedObject, key, descriptor);
    }
  }
  
  return clonedObject;
}