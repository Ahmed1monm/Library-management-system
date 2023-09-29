import Book from "../models/Book.js";
import User from "../models/User.js";

/**
 * @async
 * @description get books
 * @param  {int} offset - pagination offset
 * @param  {int} count - pagination limit
 */
export const getBooks = async (offset, count)=>{
    const books = await Book.findAll({
      include: [
        {
          model: User,
          attributes: ["id", ["name", "author"]],
        },
      ],
      limit: count,
      offset: offset,
    });
    return books;
}

/**
 * @async
 * @description count books records
 */
export const countBooks = async ()=>{
    const count = await Book.count({});
    return count;
}

/**
 * @async
 * @description get book
 * @param  {int} id - book ID
 */
export const findBookById = async (id)=>{
    const book = await Book.findOne({ where: { id } });
    return book;
}

/**
 * @async
 * @description get books
 * @param  {Object} data - book data
 */
export const createOneBook = async (data)=>{
    const book = await Book.create(data);
    return book;
}

/**
 * @async
 * @description get books
 * @param  {int} id - book id
 * @param  {Object} data - book data
 */
export const updateOneBook = async (id, data)=>{
    const book = await Book.update( data, { where: { id } } );
    return book;
}

/**
 * @async
 * @description get books
 * @param  {int} id - book id
 */
export const deleteOneBook = async (id)=>{
    const book = await Book.destroy({ where: { id } });
    return book;
}
