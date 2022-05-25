
export const random = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const randomFloat = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.random() * (max - min)) + min;
}
