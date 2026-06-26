export type WithSubjectType<T, S extends string = string> = T & {
  readonly __caslSubjectType__: S;
};
