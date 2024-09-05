import { ResourceType } from "./comment";

export interface StarWarsApiRepository {

    getResourceById(resourceType: ResourceType, resourceId: string): Promise<any>;
}
