import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class SedeHotel extends Entity {
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
  sede: string;

  @property({
    type: 'number',
    required: true,
  })
  cupoMaxPersonas: number;

  @property({
    type: 'number',
    required: true,
  })
  habitacionesDisponibles: number;

  @property({
    type: 'number',
    required: true,
  })
  huspedesTotales: number;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedAt: string;

  @property({
    type: 'date',
  })
  deletedAt?: string;


  constructor(data?: Partial<SedeHotel>) {
    super(data);
  }
}

export interface SedeHotelRelations {
  // describe navigational properties here
}

export type SedeHotelWithRelations = SedeHotel & SedeHotelRelations;
