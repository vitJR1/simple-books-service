export default (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw Error(`Env "${name}" not found`);
  }
  return value;
};
