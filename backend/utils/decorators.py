import time
import os
import logging
from datetime import datetime
from functools import wraps
import inspect


# Ensure the log directory exists
log_directory = 'log'
if not os.path.exists(log_directory):
    os.makedirs(log_directory)

# Configure logging settings
logging.basicConfig(
    filename=os.path.join(log_directory, 'execution_log.log'),
    level=logging.INFO,
    format='%(asctime)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

def time_it(func):
    """
    A decorator that prints the execution time of a function.

    Args:
        func (function): The function to be timed.

    Returns:
        function: The decorated function with the additional logging functionality.
    """
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        execution_time = end_time - start_time

        # Log the details to the log file
        log_message = (
            f"Function: {func.__name__}\n"
            f"Execution Time: {execution_time:.6f} seconds\n"
            f"Arguments: {args} {kwargs}\n"
            f"Output: {result}\n"
            "-------------------------------------"
        )
        logging.info(log_message)

        # Print the execution time to the console
        print(f"{func.__name__} took {execution_time:.6f} seconds to execute.")

        return result
    return wrapper



def log_api_runtime(func):
    """
    A decorator to calculate the runtime of a Flask API route, log request details, execution time, and response.
    
    Args:
        func (function): The Flask route function to be decorated.
        
    Returns:
        function: The decorated route function with logging functionality.
    """
    @wraps(func)  # Preserves the original function's metadata (like __name__)
    async def async_wrapper(*args, **kwargs):
        start_time = time.time()

        # Try to retrieve the request if available (for routes)
        try:
            from flask import request
            request_data = {
                "method": request.method,
                "url": request.url,
                "data": request.data.decode('utf-8') if request.data else None,
                "args": request.args.to_dict(),
                "form": request.form.to_dict(),
            }
        except RuntimeError:
            request_data = "No request context available"

        # Run the actual route function and capture the response
        result = await func(*args, **kwargs) if inspect.iscoroutinefunction(func) else func(*args, **kwargs)

        end_time = time.time()
        execution_time = end_time - start_time

        # Log details to the log file
        log_message = (
            f"Function: {func.__name__}\n"
            f"Execution Time: {execution_time:.6f} seconds\n"
            f"Request: {request_data}\n"
            f"Response: {result}\n"
            "-------------------------------------"
        )
        logging.info(log_message)

        # Optionally, print to console
        print(f"{func.__name__} took {execution_time:.6f} seconds to execute.")

        return result

    return async_wrapper if inspect.iscoroutinefunction(func) else wraps(func)(async_wrapper)
