import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Comment, ResourceType } from '../../domain/comment';
import { CommentRepository } from '../../domain/comment.repository';

const dynamoDb = new DynamoDB.DocumentClient();

export class DynamoDBCommentRepository implements CommentRepository {
    private readonly tableName = process.env.COMMENT_TABLE_NAME || 'CommentsTable';

    async save(comment: Comment): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: comment,
        };
        await dynamoDb.put(params).promise();
    }

    async search(resourceId: string, resource: ResourceType, limit?: number, lastEvaluatedKey?: DocumentClient.Key): Promise<{ comments: Comment[], lastEvaluatedKey?: DocumentClient.Key }> {
        const params: DocumentClient.QueryInput = {
            TableName: this.tableName,
            IndexName: 'recurso-recursoId-index',
            KeyConditionExpression: 'recurso = :resourceType AND recursoId = :resourceId',
            ExpressionAttributeValues: {
                ':resourceType': resource,
                ':resourceId': resourceId,
            },
            Limit: limit || 10,
            ExclusiveStartKey: lastEvaluatedKey,
        };
        const result = await dynamoDb.query(params).promise();
        return {
            comments: result.Items as Comment[],
            lastEvaluatedKey: result.LastEvaluatedKey,
        };
    }
}
