

Here is an example of a simple "Hello World" web application in Go using the `net/http` package.

```go
package main
import (
	"fmt"
	"net/http"
)

func main(){
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request ) {
		n, err := fmt.Fprintf(w, "Hello World!")
		if err != nil {
			panic(err)
		}
		fmt.Println("Bytes written:", n)
		
	})
	fmt.Println("Starting server on the port 8000...")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		panic(err)
	}
}
```

The `http.HandleFunc` function is used to map incoming requests to the root `("/")` to a function that writes the "Hello, World!" response to the client using the `fmt.Fprintf` function.