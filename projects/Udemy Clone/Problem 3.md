
## Create the File Structure UI

Given the following JSON data, create a UI :

```json
{
	"name" : "Course 1",
	"files" : [],
	"submodules" : [
		{
			"name" : "Module 1",
			"files" : ["Lecture 2.mp4", "Lecture 1.mp4"],
			"submodules" : [
				{
					"name" : "Submodule 1",
					"files" : ["Lecture 1.mp4", "Lecture 2.mp4"],
					"submodules" : []
				}
			]
			
		}, 
		{
			"name" : "Module 2",
			"files" : ["Lecture 1.mp4", "Lecture 2.mp4"],
			"submodules" : []
		},
	]
}
```

```js
function createFileStructureUI(root , data){
    /*
      data = [
        {
          "name" : "Chapter 1",
          "files" : ["Lecture 1.mp4", "Lecture2.mp4"]
          "subfolders" : [
          ]
        }
      ]
    */
  
  function _atomicUI(root, data, level = 1){
    if (data["files"].length === 0 && data["subfolders"].length === 0){return}
    // Create the parent details tag
    const parent = document.createElement("details")
    parent.style.marginLeft = (8 * level) + "px"
    const name = document.createElement("summary")
    name.innerHTML = data.name
    parent.append(name)
    // Add files to the details
    data.files.forEach(file => {
      const child = document.createElement("div")
      child.innerHTML = file
      parent.append(child)
    })
    // Recursively add other nested levels
    if (data['subfolders'].length > 0){
        level = level + 1
        data['subfolders'].forEach(module => {
        _atomicUI(parent, module, level = level )
      })
    }
    root.append(parent)
  }
  
  _atomicUI(root, data)
}

const root = document.querySelector("#root")
createFileStructureUI(root, json)
```

