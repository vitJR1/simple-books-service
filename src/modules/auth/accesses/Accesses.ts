export enum Accesses {
  READ = '00001',
  CREATE = '00010',
  UPDATE = '00100',
  DELETE = '01000',
  CHANGE_USER_ROLE = '10000',
  FULL = '11111',
  NONE = '00000',
}
