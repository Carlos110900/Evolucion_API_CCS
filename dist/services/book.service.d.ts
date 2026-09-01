import type { Book } from "../types/book.js";
export declare function getBooks(author?: string): Book[];
export declare function getBookById(id: number): Book;
export declare function createBook(bookData: Omit<Book, "id">): Book;
export declare function deleteBook(id: number): void;
export declare function updateBook(id: number, changes: Partial<Omit<Book, "id">>): Book;
//# sourceMappingURL=book.service.d.ts.map