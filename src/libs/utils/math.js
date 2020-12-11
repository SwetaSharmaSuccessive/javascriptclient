export function getRandomNumber(maxNumber) {
  return Math.floor(Math.random() * maxNumber);
}

export function getNextRoundRobin(total, current) {
  return Math.floor(current % total);
}
