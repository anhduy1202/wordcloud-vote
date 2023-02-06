from typing import Union
from fastapi import FastAPI, Request
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import numpy as np
from fastapi.responses import StreamingResponse
import uvicorn


app = FastAPI()
origins = [
    "http://localhost:3000",
]

wordsLists = ["react", "react", "vue", "svelte"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/cloud")
async def create_cloud(words: Request):
    req_words = await words.json()
    words = " ".join(word for word in req_words['responses'])
    print(words)
    image = BytesIO()
    wordcloud = WordCloud(max_font_size=40).generate(words)
    plt.figure()
    plt.imshow(wordcloud, interpolation="bilinear")
    plt.axis("off")
    img = wordcloud.to_image()
    img.save(image, 'png')
    image.seek(0)
    return StreamingResponse(image, media_type="image/png")


@app.get("/graph")
async def create_graph():
    words = " ".join(word for word in wordsLists)
    print(words)
    image = BytesIO()
    wordcloud = WordCloud(max_font_size=40).generate(words)
    plt.figure()
    plt.imshow(wordcloud, interpolation="bilinear")
    plt.axis("off")
    img = wordcloud.to_image()
    img.save(image, 'png')
    image.seek(0)
    return StreamingResponse(image, media_type="image/png")


@app.get("/")
def read_root():
    return {"hi": "hlelo"}


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
