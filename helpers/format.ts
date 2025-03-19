export const formatTime = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0).padStart(2, '0');
  return `${minutes}:${seconds}`;
};
