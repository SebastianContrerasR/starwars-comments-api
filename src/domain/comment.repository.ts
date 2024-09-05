import { Comment, ResourceType } from "./comment";

export interface CommentRepository {
    save(comment: Comment): Promise<void>;
    search(resourceId: string, resource: ResourceType, limit?: number, lastEvaluatedKey?: any): Promise<{ comments: Comment[], lastEvaluatedKey?: any }>;
}
