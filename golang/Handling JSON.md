
## Reading JSON
In Go, reading JSON data involves decoding a JSON string or stream into a Go data structure using the `encoding/json` package.

Here's an example of how to read a JSON string into a Go data structure:

```go
package main

import (
	"encoding/json"
	"fmt"
)

type Person struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

func main() {
	jsonStr := `{"name":"Alice","age":30}`

	var person Person
	err := json.Unmarshal([]byte(jsonStr), &person)
	if err != nil {
		fmt.Println("error:", err)
	}

	fmt.Println(person.Name)
	fmt.Println(person.Age)
}

```

In the example above, we first define a Go struct `Person` that matches the JSON data format. The struct has two fields: `Name` and `Age`.


Then, we use the `json.Unmarshal` function to decode the JSON string `jsonStr` into a `Person` struct instance. The `&person` argument passed to `json.Unmarshal` specifies that the decoded data should be stored in the `person` variable, which is a pointer to a `Person` struct.

If the JSON string is valid and can be decoded into a `Person` struct, the decoded values will be stored in the `person` variable. We can then access the `Name` and `Age` fields of the `person` variable to print their values.

Note that if the JSON string does not match the `Person` struct format or contains invalid data, the `json.Unmarshal` function will return an error. It is important to handle these errors properly in your code.


## Writing JSON 

In Go, writing JSON data involves encoding a Go data structure into a JSON string or stream using the `encoding/json` package.

Here's an example of how to write a Go data structure as a JSON string:

```go
package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type Person struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

func main() {
	person := Person{Name: "Alice", Age: 30}

	jsonData, err := json.Marshal(person)
	if err != nil {
		fmt.Println("error:", err)
		os.Exit(1)
	}

	fmt.Println(string(jsonData))
}

```

In the example above, we first define a Go struct `Person` that matches the JSON data format. The struct has two fields: `Name` and `Age`.

Then, we create an instance of the `Person` struct and populate it with data. In this example, we set the `Name` field to "Alice" and the `Age` field to 30.

Next, we use the `json.Marshal` function to encode the `Person` struct instance into a JSON string. The resulting `jsonData` variable will contain a byte slice representing the JSON data.

Finally, we convert the byte slice to a string using `string(jsonData)` and print it to the console.

Note that if the `Person` struct contains fields that are not compatible with JSON (e.g. a private field), you can use struct tags to customize the JSON encoding behavior. In this example, we use the `json` struct tag to map the struct field names to the corresponding JSON field names.