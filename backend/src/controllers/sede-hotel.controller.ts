import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  RestBindings,
  Response,
} from '@loopback/rest';
import {SedeHotel} from '../models';
import {SedeHotelRepository} from '../repositories';
import { inject } from '@loopback/core';
import { SedeHotelService } from '../services';

export class SedeHotelController {
  constructor(
    @repository(SedeHotelRepository)
    public sedeHotelRepository : SedeHotelRepository,
    @inject('service.SedeHotelService') public sedeHotel: SedeHotelService,
  ) {}

  @post('/sede-hotels')
  @response(200, {
    description: 'SedeHotel model instance',
    content: {'application/json': {schema: getModelSchemaRef(SedeHotel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SedeHotel, {
            title: 'NewSedeHotel',
            exclude: ['id'],
          }),
        },
      },
    })
    sedeHotel: Omit<SedeHotel, 'id'>,
  ): Promise<SedeHotel> {
    return this.sedeHotelRepository.create(sedeHotel);
  }

  @get('/sede-hotels/count')
  @response(200, {
    description: 'SedeHotel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SedeHotel) where?: Where<SedeHotel>,
  ): Promise<Count> {
    return this.sedeHotelRepository.count(where);
  }

  @get('/sede-hotels')
  @response(200, {
    description: 'Array of SedeHotel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SedeHotel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SedeHotel) filter?: Filter<SedeHotel>,
  ): Promise<SedeHotel[]> {
    return this.sedeHotelRepository.find(filter);
  }

  @patch('/sede-hotels')
  @response(200, {
    description: 'SedeHotel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SedeHotel, {partial: true}),
        },
      },
    })
    sedeHotel: SedeHotel,
    @param.where(SedeHotel) where?: Where<SedeHotel>,
  ): Promise<Count> {
    return this.sedeHotelRepository.updateAll(sedeHotel, where);
  }

  @get('/sede-hotels/{id}')
  @response(200, {
    description: 'SedeHotel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SedeHotel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SedeHotel, {exclude: 'where'}) filter?: FilterExcludingWhere<SedeHotel>
  ): Promise<SedeHotel> {
    return this.sedeHotelRepository.findById(id, filter);
  }

  @patch('/sede-hotels/{id}')
  @response(204, {
    description: 'SedeHotel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SedeHotel, {partial: true}),
        },
      },
    })
    sedeHotel: SedeHotel,
  ): Promise<void> {
    await this.sedeHotelRepository.updateById(id, sedeHotel);
  }

  @put('/sede-hotels/{id}')
  @response(204, {
    description: 'SedeHotel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sedeHotel: SedeHotel,
  ): Promise<void> {
    await this.sedeHotelRepository.replaceById(id, sedeHotel);
  }

  @del('/sede-hotels/{id}')
  @response(204, {
    description: 'SedeHotel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sedeHotelRepository.deleteById(id);
  }

  @post('/disponibilidad', {
    responses: {
      '200': {
        description: 'disponibilidad',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {},
            },
          },
        },
      },
    },
  })
  async disponibilidad(
    @requestBody({
      description: 'disponibilidad',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: [],
            properties: {
              sedeHotel: {
                type: 'string',
              },
              fecha: {
                type: 'string',
              },
              temporada: {
                type: 'string',
              },
            },
          },
        },
      },
    })
    body: {
      sedeHotel: string;
      fecha: string;
      temporada: number;
    },
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    try {
      const result = await this.sedeHotel.calcularDisponibilidad(body);
      return result;
    } catch (error) {
      throw new Error(`Error al procesar la solicitud, ${error}`);
    }
  }
}
