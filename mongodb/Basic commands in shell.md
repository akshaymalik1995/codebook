
```js
// To show all the databases
show dbs
```

```js
// To use a database
use shop
```

```js
// To insert one document
db.products.insertOne({
	"name" : "A book",
	"price" : 12.99, 
	"stock" : 2
})
```

```js
// To retrieve all the documents
db.products.find()
```

```js
// To delete one document
db.products.deleteOne({"name" : "A book"})
```

```js
// To delete all documents
db.products.deleteMany({})
```

```js
// To update one document
db.products.updateOne({"name" : "Book 1"}, {$set : {"stock" : 3, "price" : 235}})
```

```js
// To update many documents
db.products.updateMany({}, {$set : {stock : 0}})
```

```js
// Insert many documents
db.products.insertMany([ 
	{ 
		_id: ObjectId('65965559e73605688ddacf3a'),
		name: 'Book 1',
		price: 235,
		description: 'This is a book about love',
		stock: 0
	}, 
	{ 
		_id: ObjectId('65965714e73605688ddacf3b'),
		name: 'Book 2',
		price: 230,
		description: 'This is a book about joy',
		stock: 0
	}
])
```

```js
// Filter Queries
db.products.find({stock : 2})

db.products.find({stock : {$gt : 0}})

db.products.find({stock : {$lt : 4}})

db.products.find({name : {$regex : /^Book/}})

db.products.findOne({"name" : "Book 1"})
```


```js
// Replacing the document
db.products.replaceOne({name : "Book 1"}, {"name" : "Book"})
```

```js
// Get all the results
db.passengers.find().toArray()


```

> Remember that the `db.passengers.find()`  method returns us a cursor and not the results.

```js
db.passengers.find().forEach(passenger => {printjson(passenger)})
```

**Projections**

In projections, we specify the fields we want in the query results.

```js
// 1 means we want that key
db.passengers.find({}, {name : 1})
// 0 means we do not want that key
db.passengers.find({}, {_id : 0})
```

**Deleting database**

To get rid of your data, you can simply load the database you want to get rid of (`use databaseName`) and then execute `db.dropDatabase()`.

Similarly, you could get rid of a single collection in a database via `db.myCollection.drop()`.


