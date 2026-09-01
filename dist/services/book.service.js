import { bookRepository } from "../repositories/book.repository.js";
import { AppError } from "../errors/app.error.js";
export function getBooks(author) {
    const books = bookRepository.findAll();
    if (!author) {
        return books;
    }
    return books.filter((book) => book.author.toLowerCase().includes(author.toLowerCase()));
}
export function getBookById(id) {
    const book = bookRepository.findById(id);
    if (!book) {
        throw new AppError(404, "Libro no encontrado");
    }
    return book;
}
export function createBook(bookData) {
    if (typeof bookData.title !== "string" ||
        bookData.title.trim() === "") {
        throw new AppError(400, "El título es obligatorio");
    }
    if (typeof bookData.author !== "string" ||
        bookData.author.trim() === "") {
        throw new AppError(400, "El autor es obligatorio");
    }
    if (typeof bookData.year !== "number" ||
        !Number.isFinite(bookData.year)) {
        throw new AppError(400, "El año debe ser un número válido");
    }
    return bookRepository.create(bookData);
}
export function deleteBook(id) {
    const deleted = bookRepository.remove(id);
    if (!deleted) {
        throw new AppError(404, "Libro no encontrado");
    }
}
export function updateBook(id, changes) {
    const book = bookRepository.update(id, changes);
    if (!book) {
        throw new AppError(404, "Libro no encontrado");
    }
    return book;
}
//# sourceMappingURL=book.service.js.map