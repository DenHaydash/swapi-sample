import * as t from 'io-ts';
import DateType from './shared/date-validator';

export const PlanetValidator = t.type({
    name: t.string,
    diameter: t.string,
    rotation_period: t.string,
    orbital_period: t.string,
    gravity: t.string,
    population: t.string,
    climate: t.string,
    terrain: t.string,
    surface_water: t.string,
    created: DateType,
    edited: DateType,
    url: t.string,
    id: t.union([t.number, t.undefined])
})

export const PlanetStrictValidator = t.exact(PlanetValidator);

export interface Planet extends t.TypeOf<typeof PlanetValidator> {}