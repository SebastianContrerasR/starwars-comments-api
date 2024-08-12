import { Comment, ResourceType } from "../domain/comment";
import { StarWarsApi } from "../infrastructure/apis/star-wars.api";
import { CommentRepository } from "../infrastructure/repositories/comment.repository";

export class CommentService {
    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly starWarsApi: StarWarsApi,
    ) { }

    async search(resourceId: string, resource: ResourceType, limit?: number, lastEvaluatedKey?: any): Promise<{ comments: Comment[], lastEvaluatedKey?: any }> {

        const { comments, lastEvaluatedKey: newLastEvaluatedKey } = await this.commentRepository.search(resourceId, resource, limit, lastEvaluatedKey);

        return {
            comments,
            lastEvaluatedKey: newLastEvaluatedKey,
        };
    }

    async save(comment: Comment): Promise<void> {
        const resourceExists = await this.starWarsApi.getResourceById(comment.recurso.toLowerCase(), comment.recursoId);

        if (!resourceExists) {
            throw new Error(`Recurso ${comment.recurso} con id ${comment.recursoId} no encontrado en la API de Star Wars`);
        }

        await this.commentRepository.save(comment);
    }
}
