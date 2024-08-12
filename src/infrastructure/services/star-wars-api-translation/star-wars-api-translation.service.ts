import { PlanetsTranslation } from './interfaces/planets-translation.interface';
import { PeopleTranslation } from './interfaces/people-translation.interface'
import { FilmsTranslation } from './interfaces/films-translation.interface'
import { StarshipsTranslation } from './interfaces/starship-translation.interface';
import { VehiclesTranslation } from './interfaces/vehicles-translation.interface';
import { SpeciesTranslation } from './interfaces/species-translation.interface';
export class StarWarsApiTranslationService {

    static translateSpecies(data: any): SpeciesTranslation {
        return {
            nombre: data.name,
            clasificacion: data.classification,
            designacion: data.designation,
            altura_promedio: data.average_height,
            esperanza_vida_promedio: data.average_lifespan,
            colores_cabello: data.hair_colors,
            colores_piel: data.skin_colors,
            colores_ojos: data.eye_colors,
            mundo_natal: data.homeworld,
            lenguaje: data.language,
            personas: data.people,
            peliculas: data.films,
            url: data.url,
            creado: data.created,
            editado: data.edited,
        };
    }

    static translateVehicles(data: any): VehiclesTranslation {
        return {
            nombre: data.name,
            modelo: data.model,
            fabricante: data.manufacturer,
            costo_en_creditos: data.cost_in_credits,
            longitud: data.length,
            velocidad_maxima_atmosferica: data.max_atmosphering_speed,
            tripulacion: data.crew,
            pasajeros: data.passengers,
            capacidad_carga: data.cargo_capacity,
            consumibles: data.consumables,
            clase_vehiculo: data.vehicle_class,
            pilotos: data.pilots,
            peliculas: data.films,
            creado: data.created,
            editado: data.edited,
            url: data.url,
        };
    }
    static translateStarships(data: any): StarshipsTranslation {
        return {
            nombre: data.name,
            modelo: data.model,
            fabricante: data.manufacturer,
            costo_en_creditos: data.cost_in_credits,
            longitud: data.length,
            velocidad_maxima_atmosferica: data.max_atmosphering_speed,
            tripulacion: data.crew,
            pasajeros: data.passengers,
            capacidad_carga: data.cargo_capacity,
            consumibles: data.consumables,
            calificacion_hiperimpulsor: data.hyperdrive_rating,
            MGLT: data.MGLT,
            clase_nave: data.starship_class,
            pilotos: data.pilots,
            peliculas: data.films,
            creado: data.created,
            editado: data.edited,
            url: data.url,
        };
    }
    static translateFilms(data: any): FilmsTranslation {
        return {
            titulo: data.title,
            episodio_id: data.episode_id,
            rastreo_inicial: data.opening_crawl,
            director: data.director,
            productor: data.producer,
            fecha_estreno: data.release_date,
            personajes: data.characters,
            planetas: data.planets,
            naves: data.starships,
            vehiculos: data.vehicles,
            especies: data.species,
            url: data.url,
            creado: data.created,
            editado: data.edited,
        };
    }
    static translatePeople(data: any): PeopleTranslation {
        return {
            nombre: data.name,
            altura: data.height,
            peso: data.mass,
            color_cabello: data.hair_color,
            color_piel: data.skin_color,
            color_ojos: data.eye_color,
            año_nacimiento: data.birth_year,
            genero: data.gender,
            mundo_natal: data.homeworld,
            peliculas: data.films,
            especies: data.species,
            vehiculos: data.vehicles,
            naves: data.starships,
            url: data.url,
            creado: data.created,
            editado: data.edited
        };
    }
    static translatePlanets(data: any): PlanetsTranslation {
        return {
            nombre: data.name,
            periodo_rotacion: data.rotation_period,
            periodo_orbital: data.orbital_period,
            diametro: data.diameter,
            clima: data.climate,
            gravedad: data.gravity,
            terreno: data.terrain,
            agua_superficial: data.surface_water,
            poblacion: data.population,
            residentes: data.residents,
            peliculas: data.films,
            url: data.url,
            creado: data.created,
            editado: data.edited,
        };
    }
}
