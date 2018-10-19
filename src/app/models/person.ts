import * as t from 'io-ts';

import DateType from 'app/models/validators/date-validator';

export const PersonValidator = t.type({
    name: t.string,
    birth_year: t.string,
    eye_color: t.string,
    gender: t.string,
    hair_color: t.string,
    height: t.string,
    mass: t.string,
    skin_color: t.string,
    created: DateType,
    edited: DateType,
    url: t.string,
    id: t.union([t.number, t.undefined])
});

export const PersonStrictValidator = t.exact(PersonValidator);

export interface Person extends t.TypeOf<typeof PersonValidator> {}
