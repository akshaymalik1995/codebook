
In Go, serving HTML templates involves using the `html/template` package to parse and execute template files, and the `net/http` package to serve the generated HTML to clients.

Here's an example of how to serve an HTML template in Go:

1.  Create an HTML template file (e.g. `template.html`) with placeholders for dynamic data. For example:

```html
<!DOCTYPE html>
<html>
<head>
  <title>{{.Title}}</title>
</head>
<body>
  <h1>{{.Heading}}</h1>
  <p>{{.Message}}</p>
</body>
</html>
```
    
    
2.  Define a Go struct that holds the data to be displayed in the template. For example:

```go
type TemplateData struct {
    Title   string
    Heading string
    Message string
}
```

3.  Parse the template file using the `template.ParseFiles` function. For example:

```go
tmpl, err := template.ParseFiles("template.html")
if err != nil {
    panic(err)
}

```

4.  Define a handler function that executes the template and writes the generated HTML to the HTTP response. For example:

```go
func handleTemplate(w http.ResponseWriter, r *http.Request) {
    data := TemplateData{
        Title:   "My Page",
        Heading: "Welcome to my page",
        Message: "This is a test message",
    }
    err := tmpl.Execute(w, data)
    if err != nil {
        panic(err)
    }
}

```

5.  Register the handler function with the HTTP server using the `http.HandleFunc` function. For example:

```go
http.HandleFunc("/", handleTemplate)
```

6.  Start the HTTP server using the `http.ListenAndServe` function. For example:

```go
err := http.ListenAndServe(":8080", nil)
if err != nil {
    panic(err)
}
```

When a client makes a request to the root URL ("/"), the `handleTemplate` function will be called. This function creates a `TemplateData` struct with some example data, executes the `tmpl` template with this data using the `tmpl.Execute` function, and writes the generated HTML to the HTTP response using the `http.ResponseWriter` interface.

To run the web application, save the code to a file (e.g. `main.go`) and run the following command in a terminal:

`$ go run main.go`

This will start the web server and output a message indicating that it's listening on port 8080. You can then open a web browser and navigate to `http://localhost:8080` to see the rendered HTML template.