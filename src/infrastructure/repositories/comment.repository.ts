import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Comment } from '../../domain/comment';

const dynamoDb = new DynamoDB.DocumentClient();

export class CommentRepository {
    private readonly tableName = process.env.COMMENT_TABLE_NAME || 'CommentsTable';

    async save(comment: Comment): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: comment,
        };
        await dynamoDb.put(params).promise();
    }

    async getByResourceId(recursoId: string): Promise<Comment[]> {
        const params: DocumentClient.QueryInput = {
            TableName: this.tableName,
            IndexName: 'recursoId-index',
            KeyConditionExpression: 'recursoId = :recursoId',
            ExpressionAttributeValues: {
                ':recursoId': recursoId,
            },
        };
        const result = await dynamoDb.query(params).promise();
        return result.Items as Comment[];
    }
}
