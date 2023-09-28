import Book from "../models/Book.js"
import User from "../models/User.js";

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

export const countBooks = async ()=>{
    const count = await Book.count({});
    return count;
}

export const findBookById = async (id)=>{
    const book = await Book.count({ where: { id } });
    return book;
}

export const createOneBook = async (data)=>{
    const book = await Book.create(data);
    return book;
}

export const updateOneBook = async (id, data)=>{
    const book = await Book.update( data, { where: { id } } );
    return book;
}

export const deleteOneBook = async (id)=>{
    const book = await Book.destroy({ where: { id } });
    return book;
}