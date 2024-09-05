import { Comment, ResourceType } from "../domain/comment";
import { CommentRepository } from "../domain/comment.repository";
import { StarWarsApiRepository } from "../domain/star-wars.api.repository";

export class CommentService {
    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly starWarsApiRepository: StarWarsApiRepository,
    ) { }

    async search(resourceId: string, resource: ResourceType, limit?: number, lastEvaluatedKey?: any): Promise<{ comments: Comment[], lastEvaluatedKey?: any }> {

        const { comments, lastEvaluatedKey: newLastEvaluatedKey } = await this.commentRepository.search(resourceId, resource, limit, lastEvaluatedKey);

        return {
            comments,
            lastEvaluatedKey: newLastEvaluatedKey,
        };
    }

    async save(comment: Comment): Promise<void> {
        const resourceExists = await this.starWarsApiRepository.getResourceById(comment.recurso, comment.recursoId);

        if (!resourceExists) {
            throw new Error(`Recurso ${comment.recurso} con id ${comment.recursoId} no encontrado en la API de Star Wars`);
        }

        await this.commentRepository.save(comment);
    }
}
