import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { HabitaionesTarifaRepository, HabitaionesTypeRepository, SedeHotelRepository } from '../repositories';
import { repository } from '@loopback/repository';

@injectable({ scope: BindingScope.TRANSIENT })
export class SedeHotelService {
  constructor(/* Add @inject to inject parameters */
    @repository(SedeHotelRepository) public sedeHotelRepository: SedeHotelRepository,
    @repository(HabitaionesTypeRepository) public habitaionesTypeRepository: HabitaionesTypeRepository,
    @repository(HabitaionesTarifaRepository) public habitaionesTarifaRepository: HabitaionesTarifaRepository,
  ) { }

  /*
   * Add service methods here
   */
  async calcularDisponibilidad(body: any) {
    console.log('Entre a la funcion calcularDisponibilidad');

    let finSedeHotel = await this.finSedeHotel(body);

    if (finSedeHotel[0].cupoMaxPersonas === finSedeHotel[0].huspedesTotales) {
      return {
        success: true,
        message: "Habitacion no disponibles",
        habitacionList: []
      };
    } else {
      let findHabitaciones = await this.findHabitaciones(finSedeHotel, body);
      return findHabitaciones;
    }
  }

  async finSedeHotel(body: any) {
    let sedeHotel = await this.sedeHotelRepository.find({
      where: {
        sede: body.sedeHotel
      }
    });

    return sedeHotel;
  }

  async findHabitaciones(sedeHotel: any, body: any) {
    console.log('Entre a la funcion findHabitaciones');
    let habitaciones = await this.habitaionesTypeRepository.find({
      where: {
        sedeHotelId: sedeHotel[0].id
      }
    });

    let habitacionIds = habitaciones.map(habitacion => habitacion.id);
    let tarifasHabitaciones = await this.findTarifas(habitacionIds, body);

    return tarifasHabitaciones;
  }

  async findTarifas(habitacionIds: any, body: any) {
    let tarifas = await this.habitaionesTarifaRepository.find({
      where: {
        habitaionesTypeId: {
          inq: habitacionIds
        },
        temporada: body.temporada
      },
      include: [
        { relation: 'habitaionesType' }
      ]
    });

    const fecha = new Date(body.fecha);


    tarifas = tarifas.filter(tarifa => {
      const { fechaReserva, fechaFinReserva } = tarifa.habitaionesType;
      const fechaInicio = new Date(fechaReserva);
      const fechaFin = new Date(fechaFinReserva);

      return !(fecha >= fechaInicio && fecha <= fechaFin);
    });

    if (tarifas.length > 0) {
      return {
        succes: true,
        mesage: "Habitaciones disponibles",
        habitacionList: tarifas
      }
    } else { return {
      succes: true,
      mesage: "Habitaciones no Disponibles",
      habitacionList: tarifas
    }}

  }
}
