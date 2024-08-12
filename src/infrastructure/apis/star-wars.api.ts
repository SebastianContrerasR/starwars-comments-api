import { ResourceType } from 'aws-sdk/clients/batch';
import fetch from 'node-fetch';
import { StarWarsApiTranslationService } from '../services/star-wars-api-translation/star-wars-api-translation.service';
import { PeopleTranslation } from '../services/star-wars-api-translation/interfaces/people-translation.interface';
import { FilmsTranslation } from '../services/star-wars-api-translation/interfaces/films-translation.interface';
import { StarshipsTranslation } from '../services/star-wars-api-translation/interfaces/starship-translation.interface';
import { VehiclesTranslation } from '../services/star-wars-api-translation/interfaces/vehicles-translation.interface';
import { SpeciesTranslation } from '../services/star-wars-api-translation/interfaces/species-translation.interface';
import { PlanetsTranslation } from '../services/star-wars-api-translation/interfaces/planets-translation.interface';

export class StarWarsApi {
    private readonly baseUrl: string = 'https://swapi.py4e.com/api';

    async getResourceById(resourceType: ResourceType, resourceId: string): Promise<PeopleTranslation | FilmsTranslation | StarshipsTranslation | VehiclesTranslation | SpeciesTranslation | PlanetsTranslation> {
        const response = await fetch(`${this.baseUrl}/${resourceType}/${resourceId}`);


        if (!response.ok) {
            throw new Error(`Error fetching ${resourceType} with id ${resourceId}`);
        }

        const data = await response.json();

        let translatedData;
        switch (resourceType) {
            case 'people':
                translatedData = StarWarsApiTranslationService.translatePeople(data);
                break;
            case 'films':
                translatedData = StarWarsApiTranslationService.translateFilms(data);
                break;
            case 'starships':
                translatedData = StarWarsApiTranslationService.translateStarships(data);
                break;
            case 'vehicles':
                translatedData = StarWarsApiTranslationService.translateVehicles(data);
                break;
            case 'species':
                translatedData = StarWarsApiTranslationService.translateSpecies(data);
                break;
            case 'planets':
                translatedData = StarWarsApiTranslationService.translatePlanets(data);
                break;
            default:
                translatedData = data;
                break;
        }

        return translatedData;
    }
}
