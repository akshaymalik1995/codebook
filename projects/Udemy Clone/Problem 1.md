
#### Create a File Structure

Suppose we have the following file system:

```
course 1
	Module 1
		Lecture 1.mp4
		Lecture 2.mp4
		Submodule 1
			Lecture 1.mp4
			Lecture 2.mp4
	Module 2
		Lecture 1.mp4
		Lecture 2.mp4
```

Write a python function to return : 

```
{
	"name" : "Course 1",
	"files" : [],
	"submodules" : [
		{
			"name" : "Module 1",
			"files" : ["Lecture 1.mp4", "Lecture 2.mp4"],
			"submodules" : [
				{
					"name" : "Submodule 1",
					"files" : ["Lecture 1.mp4", "Lecture 2.mp4"]
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


#### Solution

###### `os.path.basename()`

The `os.path.basename()` function in Python is used to get the base name (i.e., the last part) of a specified path. This function is part of the `os.path` module, which is a sub-module of the `os` module in Python.

Here is an example of how to use the `os.path.basename() function`:

```python
import os
path = '/home/User/Documents'
basename = os.path.basename(path)
print(path) # Documents
path = '/home/User/Documents/file.txt'
basename = os.path.basename(path)
print(path) # file.txt
```

##### `os.listdir`

The `os.listdir()` function in Python is used to get a **list** of all files and directories in a specified directory. If no directory is specified, it will return a list of files and directories in the current working directory.

The `os.listdir()` function does not differentiate between files and directories. However, you can use it in conjunction with other functions from the `os` module to distinguish between them.

For instance, you can use the `os.path.isdir()` function to check if a given path is a directory.

```python
import os
path = "/"
all_entries = os.listdir(path)
files = []
directorties = []
for entry in all_entries:
	item_path = os.path.join(path, entry)
	if os.path.isdir(item_path):
		directorties.append(entry)
	elif os.path.isfile(item_path):
		files.append(entry)
```

##### `os.path.join`

The `os.path.join()` function in Python is a method that combines one or more path components into a single path.

```python
import os
path = "/home"

final_path = os.path.join(path, "User/Desktop", "file.txt")
```

##### Final Code

```python
import os

def get_file_structure(folder_path, file_type):
    """
    Returns a dictionary representing the file structure of the given folder,
    including files of the specified file type and any nested subfolders.

    Args:
        folder_path (str): The absolute path to the folder.
        file_type (str): The file extension to include (e.g., "mp4").

    Returns:
        dict: A dictionary representing the file structure.
    """

    def _get_structure(path, parent_name):
        """Recursively builds the file structure dictionary."""
        structure = {
            "name": os.path.basename(path) if not parent_name else parent_name,
            "files": [],
            "submodules": []
        }
        for item in os.listdir(path):
            item_path = os.path.join(path, item)
            if os.path.isfile(item_path) and item_path.endswith(file_type):
                structure["files"].append(item)
            elif os.path.isdir(item_path):
                structure["submodules"].append(_get_structure(item_path, item))
        return structure

    return _get_structure(folder_path, "")
	
```