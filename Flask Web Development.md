## Chapter 1 - Installation

- Flask is a small "microframework" that provides a solid core with basic services while extensions provide the rest, allowing you to pick and choose what you need for a lean stack with no bloat.
- Flask has three main dependencies: `Werkzeug` for routing, debugging, WSGI subsystems, `Jinja2` for template support, and `Click` for command-line integration.
- Flask has no native support for high-level tasks like accessing databases, validating web forms, or authenticating users, but extensions are available for these tasks.
- Developers can choose the extensions that work best for their project or write their own.
- Installing Flask only requires a computer with `Python` installed.

### Application Directory

Create an application directory with the following commands:

```cmd
$ mkdir flasky
$ cd flasky
```

### Virual Environments

- It is recommended to use a virtual environment to install Flask.
- A virtual environment is a copy of the Python interpretor that allows you to install packages privately, without affecting the global Python interpretor installed on your systems.
- Creating a virtual environment for each project ensures that applications have access only to the packages they use, while the global interpreter remains neat and clean.

### Creating a Virtual Environment

- Python3 supports virtual environments natively through the `venv` package in the standard library.
- The command to create a virtual environment has the structure: `$ python -m venv virtual-environment-name`
- Run the command:

```
$ python -m venv venv
```

- After running the command, the virtual environment will be created inside the `flasky` directory, and will be named `venv`, containing a brand-new virtual environment with a Python interpreter for exclusive use by this project.

### Activating the Virtual Environment

Activating a virtual environment is a crucial step in using it because it ensures that any Python packages you install or commands you run are executed within the virtual environment and do not affect the system-wide Python installation or other virtual environments you might have created.

1.  Open a command prompt or terminal window and navigate to the project directory that contains the virtual environment.
2.  Activate the virtual environment by running the appropriate activation command for your operating system (either `source venv/bin/activate` for Linux/macOS or `venv\Scripts\activate` for Windows). This will modify the PATH environment variable to include the location of the virtual environment's Python interpreter.
3.  Verify that the virtual environment has been activated by checking that the command prompt displays the name of the virtual environment in parentheses.
4.  Install any necessary Python packages or run any commands within the virtual environment.
5.  When you are finished working with the virtual environment, type `deactivate` at the command prompt to deactivate it and restore the original PATH environment variable.

### Installing Python Packages with pip

-   Python packages are installed with the `pip` package manager.
-   Pip is included in all virtual environments and can be invoked using the `pip` command in the command prompt.
-   To install Flask into the virtual environment, make sure the virtual environment is activated, and then run the command `pip install flask`.
-   Pip installs all of Flask's dependencies along with Flask itself.
-   The command `pip freeze` can be used to check what packages are installed in the virtual environment.
-   To verify that Flask was correctly installed, start the Python interpreter and try to import it using the command `import flask`. If no errors appear, Flask is correctly installed.
-   When you are done working with the virtual environment, type `deactivate` at the command prompt to restore the PATH environment variable for your terminal session and the command prompt to their original states.


## Chapter 2 - Basic Application Structure

### Initialization

-   All Flask applications require an application instance
-   The web server sends client requests to this instance using WSGI protocol
-   The instance is created as an object of Flask class:

```py
from flask import Flask
app = Flask(__name__)
```

-   The only required argument for the constructor is the name of the main module/package of the app, usually passed as Python's `__name__` variable
-   The `__name__` argument helps Flask locate the application and other files like templates and images

### Routes and View Functions

-   A Flask application needs to map URLs to Python functions to handle client requests.
-   This association between a URL and a function is called a route.
-   Flask provides a decorator called `app.route` to easily define routes.
-   The `app.route` decorator takes a URL as an argument and associates it with the decorated function.
-   The function that handles the URL is called a view function.
-   The view function returns a response, which is typically an HTML string.

```py
@app.route("/")
def index():
	return "<h1>Hello World!</h1>"
```
-   Flask also provides the `app.add_url_rule()` method to set up application routes in a more traditional way.
-   The `app.add_url_rule()` method takes the URL, endpoint name, and view function as arguments.
-   The endpoint is a unique name for the view function, which can be used to generate URLs.

```py
def index():
	return "<h1>Hello World</h1>"
app.add_url_rule("/", "index", index)
```

-   View functions can return more complex responses than simple HTML strings.

### Dynamic Routes

-   Flask supports dynamic URLs using special syntax in the `app.route` decorator. 
-   Dynamic components in routes are enclosed in angle brackets and can be of different types, such as string, integer, float, and path.
-   The view function associated with a dynamic route takes the dynamic component as an argument, and can generate a personalized response based on that component.

```py
@app.route("/user/<name>")
def view(name):
	return f"Hello, {name}"
```

### Development Server

- Flask applications include a development web server that can be started with the `flask run` command.
- The command looks for the name of the Python script that contains the application instance in the `FLASK_APP` environment variable.
- To start the `hello.py` application, activate the virtual environment and run the command `export FLASK_APP=hello.py` (Linux, macOS) or `set FLASK_APP=hello.py` (Windows), then `flask run`
- The development web server accepts requests and services them in a loop until the application is stopped.
- The Flask development web server is intended to be used only for development and testing purposes. 
- The `app.run()` method can be used to start the Flask development web server programmatically.

```py
if __name__ == "__main__":
	app.run()
```

- While the `flask run` command makes the practice of running the server through the main script unnecessary, the `app.run()` method can still be useful for unit testing purposes.

### Debug Mode

- Flask applications can run in debug mode.
- Debug mode enables two modules called the `reloader` and the `debugger`
- The `reloader` watches source code files and restarts the server automatically when changes are made.
- The `debugger` is a web-based tool that appears in the browser when the application raises an unhandled exception.
- The `debugger` allows users to inspect source code and evaluate expressions in the call stack.
- Debug mode is disabled by default in Flask.
- To enable debug mode, set the `FLASK_DEBUG=1` environment variable before invoking `flask run`
- If you start your server with the `app.run()` method, you can enable debug mode programmatically using `app.run(debug=True)`
- Never enable debug mode on a production server, as it makes your server vulnerbale to attacks.
- The debugger needs to be activated with a PIN, which is printed to the console by the `flask run` command

### Command Line Options

-   The `flask` command can be used to run utility scripts for Flask applications.
-   Run `flask --help` or `flask` without any arguments to see available options and commands.
-   The most commonly used commands are "run" and "shell".
-   The "run" command starts a development server.
-   The "shell" command starts a Python shell session in the context of the application.
-   The `flask shell` command can be used to run maintenance tasks or tests, or to debug issues.
- The `flask run` command runs a local development server for the Flask application.
- The default configuration does not support any sort of concurrency.
- The `--host` argument specifies the network interface to listen to for connections from clients.
- The default `flask` development web server listens for connections on `localhost`.
- The `flask run` command can be used to listen to connections on the public network interface by specifying `--host 0.0.0.0`.
- The `--reload`, `--no-reload`, `--debugger`, and `--no-debugger` options provide greater control on top of the debug mode setting.
- `--reload` is used to enable the reloader, while `--no-reload` is used to disable it.
- `--debugger` is used to enable the debugger, while `--no-debugger` is used to disable it.
- `--eager-loading` is used to enable eager loading, while `--lazy-loading` is used to disable it.
- `--with-threads` is used to enable multithreading, while `--without-threads` is used to disable it.

