import { CommentService } from "../src/application/comment.service";
import { Comment, ResourceType } from "../src/domain/comment";
import { mockCommentRepository } from "./__mocks__/comment-repository.mock";
import { mockStarWarsApiRepository } from "./__mocks__/star-wars-api-repository.mock";

describe('Comment Service when', () => {
    let commentService: CommentService;

    beforeEach(() => {
        commentService = new CommentService(mockCommentRepository, mockStarWarsApiRepository);
    });

    describe('search', () => {
        it('should return comments and pagination info', async () => {
            const resourceId = '123';
            const resource = ResourceType.PEOPLE;
            const limit = 10;
            const lastEvaluatedKey = 'key';

            const comments = [{ id: '1', recurso: resource, recursoId: '1', comentario: 'Great!', calificacion: 5, fechaCreacion: '2024-09-05' }];
            mockCommentRepository.search.mockResolvedValue({ comments, lastEvaluatedKey: null });

            const result = await commentService.search(resourceId, resource, limit, lastEvaluatedKey);

            expect(result.comments).toEqual(comments);
            expect(result.lastEvaluatedKey).toBeNull();
        });

        it('should return empty comments and no pagination info when no comments are found', async () => {
            const resourceId = '123';
            const resource = ResourceType.PEOPLE;
            const limit = 10;
            const lastEvaluatedKey = null;

            mockCommentRepository.search.mockResolvedValue({ comments: [], lastEvaluatedKey: null });

            const result = await commentService.search(resourceId, resource, limit, lastEvaluatedKey);

            expect(result.comments).toEqual([]);
            expect(result.lastEvaluatedKey).toBeNull();
        });
    });

    describe('save', () => {
        it('should save a comment if resource exists', async () => {
            const comment: Comment = { id: '1', recurso: ResourceType.PEOPLE, recursoId: '1', comentario: 'Great!', calificacion: 5, fechaCreacion: '2024-09-05' };
            mockStarWarsApiRepository.getResourceById.mockResolvedValue(true);
            mockCommentRepository.save.mockResolvedValue(undefined);

            await commentService.save(comment);

            expect(mockStarWarsApiRepository.getResourceById).toHaveBeenCalledWith(comment.recurso, comment.recursoId);
            expect(mockCommentRepository.save).toHaveBeenCalledWith(comment);
        });

        it('should throw an error if resource does not exist', async () => {
            const comment: Comment = { id: '1', recurso: ResourceType.PEOPLE, recursoId: '1', comentario: 'Great!', calificacion: 5, fechaCreacion: '2024-09-05' };
            mockStarWarsApiRepository.getResourceById.mockResolvedValue(false);

            await expect(commentService.save(comment)).rejects.toThrow(`Recurso ${comment.recurso} con id ${comment.recursoId} no encontrado en la API de Star Wars`);
        });
    });
});
