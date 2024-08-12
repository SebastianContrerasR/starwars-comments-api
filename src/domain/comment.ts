export enum ResourceType {
    PEOPLE = 'people',
    FILMS = 'films',
    STARSHIPS = 'starships',
    VEHICLES = 'vehicles',
    SPECIES = 'species',
    PLANETS = 'planets',
}

export class Comment {
    id: string;
    recurso: ResourceType;
    recursoId: string;
    comentario: string;
    calificacion: number;
    fechaCreacion: string;

}
