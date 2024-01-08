

**Defining and Using Arrays**

```go
var names [3]string
names[0] = "akshay"
names[1] = "anubhav"
names[2] = "shubham"
```

**Using the Array Literal Syntax**

```go
names := [3]string{"akshay", "anubhav", "shubham"}
```

**Creating Multidimensional Arrays**

```go
var coords [3][3]int
// This statement creates an array whose capacity is 3 and whose underlying type is an int array also with a capacity of 3, producing a 3x3 array of int values.
coords[1][2] = 10
```

**Assigning an Array to a New Variable**

```go
names := [3]string{"akshay", "anubhav", "shubham"}
otherArray := names
names[0] = "Rahul"
fmt.Println(names, otherArray)
// Go works with values, rather than references, by default.
// This behavior extends to arrays, which means that assigning an array to a new variable copies the array and copies the values it contains.
```

**Using a Pointer to an Array**

```go
names := [3]string{"akshay", "anubhav", "shubham"}
otherArray := &names
names[0] = "Rahul"
fmt.Println(names, *otherArray)
```

**Comparing Arrays**

```go
names := [3]string{"akshay", "anubhav", "shubham"}
otherNames := [3]string{"akshay", "anubhav", "shubham"}
same := names == otherNames
// Arrays are equal if they are of the same type and contain equal elements in the same order.
```

**Enumerating an Array**

```go
names := [3]string{"akshay", "anubhav", "shubham"}
for index, value := range names {
	fmt.Println("Index:", index, "Value:", value)
}
```

**Discarding the Current Index**

```go
names := [3]string{"akshay", "anubhav", "shubham"}
for _, value := range names {
	fmt.Println("Value:", value)
}
// The underscore is known as the blank identifier and is used when a feature returns values that are not subsequently used and for which a name should not be assigned
```



