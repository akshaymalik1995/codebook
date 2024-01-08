
```python
import logging

logging.basicConfig(filename="image_scraper.log", format="%(asctime)s - %(name)s  - %(levelname)s - %(message)s", level=logging.INFO)

logger = logging.getLogger("app")
```



Logging is a crucial aspect of software development that helps you track the behavior of your application, diagnose issues, and monitor its operation. In Python, you can perform logging using the built-in `logging` module. Here's a basic guide on how to do logging in Python:

1. **Import the logging module:**

   You need to import the `logging` module at the beginning of your Python script:

   ```python
   import logging
   ```

2. **Configure the logging system (optional):**

   Before you start logging, you can configure the logging system to customize its behavior, such as setting the log level, specifying a log file, or defining a logging format. This step is optional, but it's useful for fine-tuning the logging process.

   ```python
   # Configure logging to write logs to a file
   logging.basicConfig(filename='myapp.log', level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
   ```

   In this example, logs will be written to a file called `myapp.log`, and the log level is set to `DEBUG`. The log format includes a timestamp, logger name, log level, and the log message.

3. **Create a logger object:**

   To log messages in your application, you need to create a logger object. You can create multiple logger instances, each with its name to distinguish different parts of your application.

   ```python
   logger = logging.getLogger('my_app_name')
   ```

4. **Log messages:**

   You can use the logger to log messages at different log levels. Common log levels, from least severe to most severe, are `DEBUG`, `INFO`, `WARNING`, `ERROR`, and `CRITICAL`.

   ```python
   logger.debug('This is a debug message')
   logger.info('This is an informational message')
   logger.warning('This is a warning message')
   logger.error('This is an error message')
   logger.critical('This is a critical message')
   ```

5. **Logging Exceptions:**

   You can also log exceptions using the `exception` method, which automatically logs the exception traceback:

   ```python
   try:
       # Some code that may raise an exception
   except Exception as e:
       logger.exception('An error occurred:')
   ```

6. **Using Log Handlers (optional):**

   You can configure log handlers to control where log messages go. By default, the `basicConfig` function configures a `StreamHandler` to log to the console. You can add additional handlers for more advanced logging scenarios, like writing to a file, sending logs to remote servers, or integrating with third-party log aggregation services.

   ```python
   file_handler = logging.FileHandler('app.log')
   formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
   file_handler.setFormatter(formatter)
   logger.addHandler(file_handler)
   ```

   This code adds a `FileHandler` to the logger and specifies a custom format.

7. **Changing Log Levels Dynamically (optional):**

   You can change the log level for a logger dynamically. For example, if you want to increase the log level while debugging, you can do so using the following code:

   ```python
   logger.setLevel(logging.DEBUG)
   ```

Now your Python application is set up to log messages. You can adjust the log level and handler configurations to suit your specific needs.