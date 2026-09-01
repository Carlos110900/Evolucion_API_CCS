import type { Request, Response } from "express";
import {
  getBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
} from "../services/book.service.js";

export function getAllBooks(req: Request, res: Response) {
  const author =
    typeof req.query.author === "string"
      ? req.query.author
      : undefined;

  const books = getBooks(author);

  res.status(200).json(books);
}

export function getBook(req: Request, res: Response) {
  const id = Number(req.params.id);

  const book = getBookById(id);

  res.status(200).json(book);
}

export function addBook(req: Request, res: Response) {
  const book = createBook(req.body);

  res.status(201).json(book);
}

export function removeBook(req: Request, res: Response) {
  const id = Number(req.params.id);

  deleteBook(id);

  res.status(204).send();
}

export function patchBook(req: Request, res: Response) {
  const id = Number(req.params.id);

  const book = updateBook(id, req.body);

  res.status(200).json(book);
}