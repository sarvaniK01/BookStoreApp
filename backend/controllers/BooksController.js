const Book = require('../model/Book.js')

const getAllBooks = async(req, res, next) => {
    let books;
    try{
        books = await Book.find();
    }
    catch(err){
        console.log(err);
    }

    if(!books){
        return res.status(404).json({message:"No books found"})
    }
    else{
        return res.status(200).json({books});
    }
}

const getById = async(req, res, next) => {
    const id = req.params.id;
    let book;
    try{
        book = await Book.findById(id);
    }
    catch(err){
        console.log(err)
    }
    if(!book){
        return res.status(404).json({message:"No book found"})
    }
    else{
        return res.status(201).json({book})
    }

}

const addBook = async(req,res,next) => {
    const {name, author, description, price,available, image} = req.body;
    let book;

    try{
        book = new Book({
            name,
            author,
            description,
            price,
            available,
            image,
        });

        await book.save();
    }
    catch(err){
        console.log(err);
    }

    if(!book){
        return res.status(500).json({message:'Unable to add'})
    }
    else{
        return res.status(201).json({book})
    }
}

const updateBook = async(req,res,next) => {
    const id = req.params.id;
    const {name, author, description, price,available, image} = req.body
    let book;
    try{
        book = await Book.findByIdAndUpdate(id, {
            name, 
            author,
            description,
            price,
            available, 
            image,
        });
        book = await book.save();
    }
    catch(err){
        console.log(err);
    }
    if(!book){
        return res.status(404).json({message: "Book cannot be updated by Id"})
    }
    else{
        return res.status(201).json({book})
    }

}

const deleteBook = async(req,res,next) => {
    const id = req.params.id;
    let book;

    try{
        book = await Book.findByIdAndDelete(id);
    }
    catch(err){
        console.log(err);
    }
    if(!book){
        return res.status(404).json({message:"The book with given id cannot be deleted"})
    }
    else{
        return res.status(200).json({message: "Book successfully deleted"});
    }
}

exports.getAllBooks = getAllBooks;

exports.getById = getById;

exports.addBook = addBook;

exports.updateBook = updateBook;

exports.deleteBook = deleteBook;