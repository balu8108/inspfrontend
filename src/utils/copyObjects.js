// The below function will copy enumerabe and non enumerble properties of an object
export default function copyObject(originalConsumer) {
  // Create a new object with all properties
  const copiedConsumer = Object.create(Object.getPrototypeOf(originalConsumer));
  const allPropertyNames = [
    ...Object.getOwnPropertyNames(originalConsumer),
    ...Object.getOwnPropertySymbols(originalConsumer),
  ];

  for (const propName of allPropertyNames) {
    const propDesc = Object.getOwnPropertyDescriptor(
      originalConsumer,
      propName
    );
    Object.defineProperty(copiedConsumer, propName, propDesc);
  }
  return copiedConsumer;
}
