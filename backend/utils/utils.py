import os

def get_prompts(filename):
    """
    Reads a file in the prompts directory and returns the contents as a string

    Parameters
    ----------
    filename : str
        name of the file to read

    Returns
    -------
    str
        contents of the file
    """
    with open("prompts/" + filename , 'r') as f:
        return f.read()