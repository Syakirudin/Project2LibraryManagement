//CRUD

const {Book} = require("../models")

const createNewBook = (body) => {
    return Book.create({...body});
}

const findManyBooks = (searchParam) => {
    return Book.findAll({ where: { ...searchParam } });
}

const findBookById = async (id) => {
    const book = await Book.findByPk(id);
    if (!book) throw new Error('Book not found');
    return book;

}

const findOneBook = (searchParam) => {
    return Book.findOne({ where: { ...searchParam } });
}

const findBookByIdAndUpdate = async (id,body) => {
    const book = await findBookById(id);
    if (!book) throw new Error('Book not found');

    for (const key of Object.keys(body)) {
        book[key] = body[key] ?? book[key];
    }
    await book.save();
    return book;
}

const deleteBookById = async (id) => {
    const book = await findBookById(id);
    if (!book) throw new Error('Book not found');
    await book.destroy();
    return book;
}

module.exports = {
    createNewBook,
    findManyBooks,
    findBookById,
    findOneBook,
    findBookByIdAndUpdate,
    deleteBookById
}