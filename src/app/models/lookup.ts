import * as t from 'io-ts';

export const LookupValidator = t.type({
    title: t.string,
    meta: t.union([t.any, t.undefined]),
    url: t.string,
    id: t.union([t.number, t.undefined])
});

export const LookupStrictValidator = t.exact(LookupValidator);

export interface Lookup extends t.TypeOf<typeof LookupValidator> {}
