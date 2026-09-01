const books = [
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
export const bookRepository = {
    findAll() {
        return books;
    },
    findById(id) {
        return books.find((book) => book.id === id);
    },
    create(bookData) {
        const newId = books.length > 0
            ? Math.max(...books.map((book) => book.id)) + 1
            : 1;
        const newBook = {
            id: newId,
            ...bookData,
        };
        books.push(newBook);
        return newBook;
    },
    update(id, changes) {
        const book = books.find((book) => book.id === id);
        if (!book) {
            return undefined;
        }
        Object.assign(book, changes);
        return book;
    },
    remove(id) {
        const index = books.findIndex((book) => book.id === id);
        if (index === -1) {
            return false;
        }
        books.splice(index, 1);
        return true;
    },
};
//# sourceMappingURL=book.repository.js.map