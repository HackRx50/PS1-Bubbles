import os

def get_prompts(filename):
    with open("prompts/" + filename , 'r') as f:
        return f.read()