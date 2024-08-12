import express, { NextFunction, Request, Response } from "express";
import serverless from "serverless-http";
import { v4 as uuidv4 } from "uuid";
import { CommentService } from "./application/comment.service";
import { StarWarsApi } from "./infrastructure/apis/star-wars.api";
import { CommentRepository } from "./infrastructure/repositories/comment.repository";
import { ResourceType } from "./domain/comment";

const app = express();
app.use(express.json());

const starWarsApi = new StarWarsApi();
const commentRepository = new CommentRepository();
const commentService = new CommentService(commentRepository, starWarsApi);

/**
 * @openapi
 * /comments:
 *   post:
 *     summary: Crear un nuevo comentario para un recurso de Star Wars.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comentario creado exitosamente.
 *       400:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
app.post("/comments", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { recurso, recursoId, comentario, calificacion } = req.body;

    const comment = {
      id: uuidv4(),
      recurso,
      recursoId,
      comentario,
      calificacion,
      fechaCreacion: new Date().toISOString(),
    };

    await commentService.save(comment);

    return res.status(201).json({
      message: "Comentario creado exitosamente.",
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /{resourceType}/{resourceId}/comments:
 *   get:
 *     summary: Obtener comentarios por recurso.
 *     parameters:
 *       - name: resourceType
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: resourceId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *       - name: lastEvaluatedKey
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentarios obtenidos exitosamente.
 *       400:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
app.get("/:resourceType/:resourceId/comments", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { resourceId, resourceType } = req.params;
    const { limit, lastEvaluatedKey } = req.query;

    const result = await commentService.search(
      resourceId as string,
      resourceType as ResourceType,
      limit ? parseInt(limit as string) : undefined,
      lastEvaluatedKey ? JSON.parse(lastEvaluatedKey as string) : undefined
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /{resourceType}/{resourceId}:
 *   get:
 *     summary: Obtener un recurso específico por su tipo e ID.
 *     parameters:
 *       - name: resourceType
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: resourceId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recurso obtenido exitosamente.
 *       400:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
app.get("/:resourceType/:resourceId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { resourceType, resourceId } = req.params;

    const result = await starWarsApi.getResourceById(resourceType as ResourceType, resourceId as string);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});


app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "Hello to star wars comments api!",
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    error: "Not Found",
    req: req.path,
  });
});

export const handler = serverless(app);
