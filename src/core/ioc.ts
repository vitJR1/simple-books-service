import { Container } from 'typedi';
import { IocContainer } from 'tsoa';

export const iocContainer: IocContainer = {
  get<T>(controllerClass: new () => T): T {
    return Container.get<T>(controllerClass);
  },
};
