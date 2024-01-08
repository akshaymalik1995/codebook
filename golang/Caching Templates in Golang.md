

```go
package render

import (
    "html/template"
    "log"
    "net/http"
)

  

var tc = make(map[string]*template.Template)

func RenderTemplate(w http.ResponseWriter, t string) {
    var templ *template.Template
    var err error
    // Check to see if we already have the template in our cache
    _, inMap := tc[t]
    if !inMap {
        // need to create the template
        log.Println("creating template and adding to cache")
        err = createTemplateCache(t)
        if err != nil {
            log.Println(err)
        }
    } else {
        // We have the template in the cache
        log.Println("using cached template")
    }

    templ = tc[t]
    err = templ.Execute(w, nil)
    if err != nil {
        log.Println(err)
    }
}

  

func createTemplateCache(t string) error {
    templates := []string{
        "./templates/" + t,
        "./templates/base.html",
    }
    // parse the template
    templ, err := template.ParseFiles(templates...)
    if err != nil {
        return err
    }
    // add template to cache
    tc[t] = templ
    return nil
}
```