export const getRandomNumber = (maxNumber) => Math.floor(Math.random() * maxNumber);

export const getNextRoundRobin = (total, current) => Math.floor(current % total);
