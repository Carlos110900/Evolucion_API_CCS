import express from "express";
import bookRoutes from "./routes/book.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
const app = express();
app.use(express.json());
app.use("/api/books", bookRoutes);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map