import type { Book } from "../types/book.js";

export interface BookRepository {
  findAll(): Book[];
  findById(id: number): Book | undefined;
  create(bookData: Omit<Book, "id">): Book;
  update(
    id: number,
    changes: Partial<Omit<Book, "id">>
  ): Book | undefined;
  remove(id: number): boolean;
}

const books: Book[] = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
  },
  {
    id: 2,
    title: "Design Patterns",
    author: "Erich Gamma",
    year: 1994,
  },
];

export const bookRepository: BookRepository = {
  findAll() {
    return books;
  },

  findById(id: number) {
    return books.find((book) => book.id === id);
  },

  create(bookData: Omit<Book, "id">) {
    const newId =
      books.length > 0
        ? Math.max(...books.map((book) => book.id)) + 1
        : 1;

    const newBook: Book = {
      id: newId,
      ...bookData,
    };

    books.push(newBook);
    return newBook;
  },

  update(id: number, changes: Partial<Omit<Book, "id">>) {
    const book = books.find((book) => book.id === id);

    if (!book) {
      return undefined;
    }

    Object.assign(book, changes);
    return book;
  },

  remove(id: number) {
    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
      return false;
    }

    books.splice(index, 1);
    return true;
  },
};