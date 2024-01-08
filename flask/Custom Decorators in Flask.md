
A decorator modifies the behavior of a function or a route by wrapping it in another function that adds some extra functionality.

The decorator is a Python function that takes a view function as an argument and returns a new function that wraps the original view function. When the Flask app receives a request for the route associated with the decorated view function, Flask calls the wrapper function instead of the original view function. The wrapper function then performs some extra work before or after calling the original view function.



```python
from flask import Flask, request, jsonify
app = Flask(__name__)

def require_api_key(view_function)
	def decorated_function(*args, **kwargs):
		if request.headers.get("X-API-KEY") and request.headers.get("X-API-KEY") == "my-secret-key":
			return view_function(*args, **kwargs)
		else:
			return jsonify({"error" : "API Key is missing or invalid"}), 401
	return decorated_function

@app.route("/protected")
@require_api_key
def protected():
	return jsonify({"message" : "This is a protected route"})
		
```

```python
def my_decorator(view_function):
	def wrapper_function(*args, **kwargs):
	print("Args", args)
	print("Kwargs" : kwargs)
		return view_function(*args, **kwargs)
	return wrapper_function

@app.route("/<arg1>/<arg2>")
@my_decorator
def my_view_function(arg1, arg2):
	# View function logic here
```



```python
def decoartor(view_function)
	def wrapper_function():
		# Perform some extra work here
		response = view_function()
		# Perform some extra work here
		return response
	return wrapper_function    
```

```python
from functools import wraps

def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("Before the function is called.")
        result = func(*args, **kwargs)
        print("After the function is called.")
        return result
    return wrapper

@my_decorator
def my_function():
    """This is the docstring for my_function."""
    print("Hello, world!")

my_function()

```

The `@wraps(func)` is used to presever the original function's metadata, including its docstring. Without the `wraps` decorator, the docstring of the original function would be replaced with the docstring of the `wrapper` function.