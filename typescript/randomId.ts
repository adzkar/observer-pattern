function randomString(): string {
  return Math.random().toString(36).slice(2);
}

export function getRandomId(): string {
  return `${new Date().getTime()}#${randomString()}`;
}
