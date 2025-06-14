// To find Fiction books from the collection
db.books.find({genre:'Fiction'});

//To select all fiction books but only display the title of the books and the author
db.books.find({genre:'Fiction'}, {title:true, author:true});

//To Find books published after a certain 1949
db.books.find({published_year:1949});

//To find books published in 1932
db.books.find({published_year:1932});

//Find books by a specific author (George Orwell)
db.books.find({author:'George Orwell'});
db.books.find({author: 'Herman Melville'});

//Update the price of a specific book and show the result
db.books.updateOne({title:'Moby Dick'}, {$set:{price:19.8}});
db.books.find({title:'Moby Dick'});


//updating all of the books to have "rating" of 5 stars
db.books.updateMany({}, {$set:{rating:'⭐⭐⭐⭐⭐'}});

//Delete a book by its title
db.books.deleteOne({title:'Moby Dick'});

//Write a query to find books that are both in stock and published after 2010
db.books.find({$and:[{in_stock:true}, {published_year:{$gt:2010}}]});


//Use projection to return only the title, author, and price fields in your queries
db.books.find({}, {title:true, author:true, price:true});

//to remove the Id from the find
db.books.find({}, {_id:false, title:true, author:true, price:true});


//Implement sorting to display books by price (both ascending and descending)
db.books.find().sort({price:1});// ascending Order
db.books.find().sort({price:-1}); //Descending order


//Use the `limit` and `skip` methods to implement pagination (5 books per page)
db.books.find().limit(5)

//Create an index on the `title` field for faster searches
db.books.createIndex({title:1})

//Create a compound index on `author` and `published_year`
//Use the `explain()` method to demonstrate the performance improvement with your indexes
db.books.find({title:"Moby Dick"}).explain("executionStats");

//Create an aggregation pipeline to calculate the average price of books by genre

//Create an aggregation pipeline to find the author with the most books in the collection
//Implement a pipeline that groups books by publication decade and counts the
// MongoDB One-Line Aggregation Pipelines for Book Collection

// 1. Average price by genre
db.books.aggregate([{$group:{_id:"$genre",avgPrice:{$avg:"$price"},count:{$sum:1}}},{$sort:{avgPrice:-1}}]);

// 2. Author with most books
db.books.aggregate([{$group:{_id:"$author",count:{$sum:1}}},{$sort:{count:-1}},{$limit:1}]);

// 3. Books by publication decade
db.books.aggregate([{$addFields:{decade:{$multiply:[{$floor:{$divide:["$publicationYear",10]}},10]}}},{$group:{_id:"$decade",count:{$sum:1}}},{$sort:{_id:1}}]);
