import { routes } from 'shared/config';

type Join<Prefix extends string, Key extends string> = Prefix extends '' ? Key : `${Prefix}.${Key}`;

type RouteKeyOf<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends (...args: never[]) => unknown
    ? Join<Prefix, Extract<K, string>>
    : T[K] extends Record<string, unknown>
      ? RouteKeyOf<T[K], Join<Prefix, Extract<K, string>>>
      : never;
}[keyof T];

export type RouteKey = RouteKeyOf<typeof routes>;

export type RouteDefinition = readonly [
  routeKey: RouteKey,
  matcher: (pathname: string) => boolean,
  header: string,
];
