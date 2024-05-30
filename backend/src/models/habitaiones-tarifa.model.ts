import {Entity, model, property, belongsTo} from '@loopback/repository';
import {HabitaionesType} from './habitaiones-type.model';
import {SedeHotel} from './sede-hotel.model';

@model({settings: {strict: false}})
export class HabitaionesTarifa extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  temporada: string;

  @property({
    type: 'number',
    required: true,
  })
  tarifa: number;

 

  @belongsTo(() => HabitaionesType)
  habitaionesTypeId: string;

  @belongsTo(() => SedeHotel)
  sedeHotelId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<HabitaionesTarifa>) {
    super(data);
  }
}

export interface HabitaionesTarifaRelations {
  // describe navigational properties here
}

export type HabitaionesTarifaWithRelations = HabitaionesTarifa & HabitaionesTarifaRelations;
