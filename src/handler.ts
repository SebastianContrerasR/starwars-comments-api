import serverless from "serverless-http";
import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { CommentRepository } from "./infrastructure/repositories/comment.repository";
import { CommentService } from "./application/comment.service";


const app = express();
app.use(express.json());

const commentRepository = new CommentRepository();
const commentService = new CommentService(commentRepository);

app.post("/comments", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { recurso, recursoId, comentario, calificacion } = req.body;

    const comment = {
      id: uuidv4(),
      recurso,
      recursoId,
      comentario,
      calificacion,
      fechaCreacion: (new Date()).toISOString(),
    };

    await commentService.save(comment);

    return res.status(201).json({
      message: "Opinión creada exitosamente.",
    });
  } catch (error) {
    next(error);
  }
});


app.get("/comments/:recursoId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { recursoId } = req.params;
    const comments = await commentService.getByResourceId(recursoId);

    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

// Endpoint raíz
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "Hello from root!",
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
