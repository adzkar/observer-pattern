function randomString() {
  return Math.random().toString(36).slice(2);
}

export function getRandomId() {
  return `${new Date().getTime()}#${randomString()}`;
}
