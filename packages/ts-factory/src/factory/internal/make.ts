export const make = (kind: string, props: object = {}): any => ({
  kind,
  ...props,
});
