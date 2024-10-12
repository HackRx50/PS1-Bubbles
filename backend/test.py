from groq import Groq
import base64
from utils.utils import get_prompts

# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

# Path to your image
image_path = "./sample/demo.png"

# Getting the base64 string
base64_image = encode_image(image_path)

client = Groq(api_key="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")

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": get_prompts("ee.txt")},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/png;base64,{base64_image}",
                    },
                },
            ],
        }
    ],
    model="llava-v1.5-7b-4096-preview",
)

print(chat_completion.choices[0].message.content)