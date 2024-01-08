
## Sort the File Structure

Suppose you have the following python dictionary. Sort the file structure. *However, we might not need to sort this structure as it could be already sorted.*

```
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

### Subproblem - How to sort a list of dictionaries in python

To sort a list of dictionaries in Python, you can use the built-in `sort()` function or the `sorted()` function. These functions require a key parameter to determine the sorting criteria. In your case, you want to sort the dictionaries based on the 'name' key. 

One of the most powerful components is the keyword argument called `key`. This argument expects a function to be passed to it, and that function will be used on each value in the list being sorted to determine the resulting order.

Using `sort()` function:

```python
folders = [
	{"name" : "Module 2"},
	{"name" : "Module 1"}
]

folders.sort(key=lambda item: item.get("name"))
```

Using `sorted()` function:

```python
folders = [
	{"name" : "Module 2"},
	{"name" : "Module 1"}
]

sorted_folders = sorted(folders, key=lambda item: item.get("name"))
```

**In both cases, the `key` parameter is set to a lambda function that retrieves the value of the 'name' key from each dictionary.** **This is necessary because dictionaries cannot be naturally sorted, and the `key` parameter allows you to define a custom sorting criterion** [Source 2](https://therenegadecoder.com/code/how-to-sort-a-list-of-dictionaries-in-python/).







