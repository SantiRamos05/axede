import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class HabitaionesType extends Entity {
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
  sedeHotelId: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'boolean',
    required: true,
  })
  disponibilidad: boolean;

  @property({
    type: 'number',
    required: true,
  })
  maxPersonHabitacion: number;

  @property({
    type: 'number',
    required: true,
  })
  huespedesTipoHabitacion: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaReserva: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaFinReserva: string;

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

  constructor(data?: Partial<HabitaionesType>) {
    super(data);
  }
}

export interface HabitaionesTypeRelations {
  // describe navigational properties here
}

export type HabitaionesTypeWithRelations = HabitaionesType & HabitaionesTypeRelations;
