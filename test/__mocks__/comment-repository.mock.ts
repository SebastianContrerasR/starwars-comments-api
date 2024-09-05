import { CommentRepository } from "../../src/domain/comment.repository";

export const mockCommentRepository: jest.Mocked<CommentRepository> = {
    save: jest.fn(),
    search: jest.fn(),
};