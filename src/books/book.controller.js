const Book = require("./book.model");

const postABook = async(req, res) =>{
  try {
    const  newBook = await Book({...req.body});
    await newBook.save();
    res.status(200).send({message: "Book posted successfully",  book:newBook} )
  } catch (error) {
    console.error("Error in creating book",error);
    res.status(500).send({message : "Faiiled to create book" , error})
  }
}


//get all  books
const getAllBooks =async(req,res)=>{
  try {
    const books = await Book.find().sort({createdAt:-1});
    // -1 means descending order and 1 means ascending order.
    res.status(200).send(books)
  }catch (error){
    console.log("Error fetching books",error);
    res.status(500).send({message:"failed to fetch books"})
  }
}

//get a single book
const getSingleBook = async(req,res)=>{
  try{
    const {id} = req.params;
    const book = await Book.findById(id);
    if(!book){
      return res.status(404).send({message:"Book not found"})
    }
    res.status(200).send(book)
  }catch (error){
    console.log("Error fetching book",error);
    res.status(500).send({message:"failed to fetch book"})
  }
}

//update a book
const UpdateBook = async(req,res)=>{
    try {
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id ,req.body,{new:true});
        if(!updatedBook){
          return res.status(404).send({message:"Book not found"})
        }
        res.status(200).send({message:"Book updated successfully", book:updatedBook})
    } catch (error) {
      console.log("Error updating book",error);
      res.status(500).send({message:"failed to update book"})
    }
}

// delete a book
const deleteABook = async (req,res)=>{
  try {
    const {id} = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if(!deletedBook){
      return res.status(404).send({message:"Book not found"})
    }
    res.status(200).send({message:"Book deleted successfully", book:deletedBook})
  } catch (error) {
      console.log("Error deleting book",error);
      res.status(500).send({message:"failed to delete book"})
  }
}


module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  UpdateBook,
  deleteABook
}