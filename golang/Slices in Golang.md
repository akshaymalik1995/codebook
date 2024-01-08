

Slices are a variable-length array. They are useful when you do not know how many values you need to store or when the number changes over time.

### Defining a Slice

```go
names := make([]string, 3)
```

The `make` function accepts arguments that specify the type and length of the slice.

### Using the Literal Syntax

```go
names := []string{"a", "b", "c"}
```

The slice is a data structure that contains three values: a pointer to the array, the length of the slice, and the capacity of the slice. 

### Appending elements to a Slice

```go
names := []string{"a", "b", "c"}
names := append(names, "d")
```

The built-in `append` function accepts a slice and one or more elements to add to the slice, separated by commas and returns a new slice.

### Allocating Additional Slice Capacity

Creating and copying arrays can be inefficient. If you expect that you will need to append items to a slice, you can specify additional capacity when using the `make` function.

```go
names := make([]string, 3, 6)
```

Slices have a *length* and a *capacity*. The length of a slice is how many values it can currently contain, while the number of elements that can be stored in the underlying array before the slice must be resized and a new created.

```go
names := make([]string, 3, 6)
names[0] = "a"
newNames := append(names, "b")
newNames[0] = "A"
fmt.Println(names, newNames) // => [A  ] [A   b]

```

The underlying array is not replaced when the `append` function is called on a slice with enough capacity to accommodate the new elements.

The built-in `len` and `cap` functions returns the length and capacity of a slice.

If you define a Slice but do not initialize it, then the result is a slice that has a length of zero and a capacity of zero, and this will cause an error when an element is appended to it.

### Appending One Slice to Another

The `append` function can be used to append one slice to another.

```go
names := make([]string, 3, 6)
names[0] = "Kayak"
names[1] = "Lifejacket"
names[2] = "Paddle"
moreNames := []string { "Hat Gloves"}
appendedNames := append(names, moreNames...)
```


### Creatting Slices from Existing Arrays

```go
products := [4]string { "Kayak", "Lifejacket", "Paddle", "Hat"}
fewNames := products[1:3]
allNames := products[:]
```

The `products` variable is assigned a standard, fixed-length array containing `string` values. The array is used to create slices using a range.

The two slices are backed by the same array. The `fewNames`  has a partial view of the array, while the `allNames` slice is a view of the entire array.

### Appending Elements When using Arrays for Slices

The relationship between the slice and the existing array can create different results when appending elements.

**Displaying Slice Length and Capacity**
```go
products := [4]string { "Kayak", "Lifejacket", "Paddle", "Hat"}
someNames := products[1:3]
allNames := products[:]

fmt.Println(len(someNames), cap(someNames)) // => 2 , 3
fmt.Println(len(allNames), cap(allNames)) // => 4, 4
```

**Appending an Element to a Slice**

```go
products := [4]string{"Kayak", "Lifejacket", "Paddle", "Hat"}
someNames := products[1:3]
allNames := products[:]
someNames = append(someNames, "New")
fmt.Println(someNames, allNames) // => [Lifejacket Paddle New] [Kayak Lifejacket Paddle New]
```

The slice `someNames` had the capacity to accommodate the new element without resizing, but the array location that will be used to store the element is already included in the `allNames` slice, which means that the `append` operation expands the `someNames` slice and changes one of the values that can be accessed through the `allNames` slice.

### Making Slices Predicable

The way that slices can share an array causes confusion. Some developers expect slices to be independent and get unexpected results when a value is stored in an array used by multiple slices. Other developers write code that expects shared arrays and get unexpected results when a resize separates slices.

Slices can appear unpredictable but only if you treat them inconsistently. My advice is to divide slices into two categories, decide which of them a slice belongs to when it is created, and not change that category.

The first category is as a fixed-length view into a fixed-length array. This is more useful than it sounds because slices can be mapped onto a specific region of an array, which can be selected programmatically. In this category, you can change the elements in the slice but not append new elements, meaning that all slices mapped into that array will use the modified elements.

The second category is as a variable-length data collection. I make sure each slice in this category has its own backing array, which is not shared by any other slice. This approach allows me to freely add new elements to the slice without having to worry about the impact on other slices.

If you get bogged down with slices and don’t get the results you expect, then ask yourself which category each of your slices falls into and whether you are treating a slice inconsistently or creating slices from different categories from the same source array

If you use a slice as a fixed view onto an array, then you can expect multiple slices to give you a consistent view of that array, and any new values you assign will be reflected by all of the slices that map into the modified element.

### Specifying Capacity When Creating a Slice from an Array

Ranges can include a maximum capacity, which provides some degree of control over when arrays will be duplicated.

```go
products := [4]string { "Kayak", "Lifejacket", "Paddle", "Hat"}
someNames := products[1:3:3]
```

The additional value, known as the max value, is specified after the high value, and must be within the bounds of the array that is being sliced.

The max value doesn’t specify the maximum capacity directly. Instead, the maximum capacity is determined by subtracting the low value from the max value. In the case of the example, the max value is 3, and the low value is 1, which means that the capacity will be limited to 2. The result is that the append operation causes the slice to be resized and allocated its own array, rather than expanding in the existing array.

### Creating Slices from Other Slices

Slices can also be created from other slices, although the relationship between slices isn’t preserved if they are resized.

```go
products := [4]string { "Kayak", "Lifejacket", "Paddle", "Hat"}
allNames := products[1:]
// The range creates a slice that is mapped onto all but the first element of the source array.
someNames := allNames[1:3]
// This range creates a slice that maps onto the second and third elements in the allNames slice.

allNames = append(allNames, "Gloves")
allNames[1] = "Canoe
```

Using one slice to create another is an effective way of carrying over offset start locations. But remember that slices are essentially pointers to sections of arrays, which means they can’t point at another slice. In reality, the ranges are used to determine the mappings for slices that are backed by the same array.


![](https://i.imgur.com/8UUxZmN.png)

![](https://i.imgur.com/F4ILGi1.png)

The slices behave consistently and will be resized if elements are appended when there is no available capacity, at which point they will no longer share a common array.

### Using the copy Function

The copy function is used to copy elements between slices. This function can be used to ensure that slices have separate arrays and to create slices that combine elements from different sources.

The copy function accepts two arguments, which are the destination slice and the source slice.

![](https://i.imgur.com/4hNn3Kb.png)

The function copies elements to the target slice. The slices don’t need to have the same length because the copy function will copy elements only until the end of the destination or source slice is reached. The destination slice is not resized, even when there is capacity available in the existing backing array, which means that you must ensure there is sufficient length to accommodate the number of elements you want to copy.