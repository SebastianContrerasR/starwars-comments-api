import { StarWarsApiRepository } from "../../src/domain/star-wars.api.repository";

export const mockStarWarsApiRepository: jest.Mocked<StarWarsApiRepository> = {
    getResourceById: jest.fn(),
};