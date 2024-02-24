import { RequestHandler } from 'express';
import { Route, RequestMethod } from '../interfaces/route';

/* eslint-disable @typescript-eslint/no-explicit-any */
// have to use any here because of the way decorators work

const fixPath = (path: string): string => {
  // remove leading and trailing slashes
  path = path.replace(/^\/|\/$/, '');
  // add leading slash if the path is not empty
  path = path !== '' ? '/' + path : path;
  return path;
};

const routes: { [key: string]: Route[] } = {};

export const Controller =
  (path = '') =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  <T extends { new (...args: any[]): {} }>(constructor: T) => {
    path = fixPath(path);
    return class extends constructor {
      _name = constructor.name;
      _routes = routes[this._name];
      _path = path;
      constructor(...args: any[]) {
        super(...args);
        (this as any).mapRoutes();
      }
    };
  };

export const Handler = (
  method: RequestMethod,
  path: string,
  ...middleware: RequestHandler[]
) => {
  path = fixPath(path);
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (routes[target.constructor.name]) {
      routes[target.constructor.name].push({
        method,
        path,
        callback: descriptor.value,
        middleware,
        name: propertyKey,
      });
    } else {
      routes[target.constructor.name] = [
        {
          method,
          path,
          callback: descriptor.value,
          middleware,
          name: propertyKey,
        },
      ];
    }
  };
};
