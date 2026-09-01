import type { Book } from "../types/book.js";
export interface BookRepository {
    findAll(): Book[];
    findById(id: number): Book | undefined;
    create(bookData: Omit<Book, "id">): Book;
    update(id: number, changes: Partial<Omit<Book, "id">>): Book | undefined;
    remove(id: number): boolean;
}
export declare const bookRepository: BookRepository;
//# sourceMappingURL=book.repository.d.ts.map