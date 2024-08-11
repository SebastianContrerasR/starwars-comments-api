import { Comment } from "../domain/comment";
import { CommentRepository } from "../infrastructure/repositories/comment.repository";

export class CommentService {
    private readonly commentRepository: CommentRepository;

    constructor(commentRepository: CommentRepository) {
        this.commentRepository = commentRepository;
    }

    async save(comment: Comment): Promise<void> {
        await this.commentRepository.save(comment);
    }

    async getByResourceId(recursoId: string): Promise<Comment[]> {
        return await this.commentRepository.getByResourceId(recursoId);
    }
}
