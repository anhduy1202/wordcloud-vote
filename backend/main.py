from typing import Union
from fastapi import FastAPI
from matplotlib import pyplot
import matplotlib.pyplot as plt
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import numpy as np
from fastapi.responses import StreamingResponse
import uvicorn
import base64
import threading

app = FastAPI()
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/graph")
async def create_graph():
    image = BytesIO()
    x = np.linspace(0, 10)
    y = np.sin(x)
    pyplot.plot(x, y)
    pyplot.savefig(image, format='png')
    image.seek(0)
    return StreamingResponse(image, media_type="image/png")

@app.get("/")
def read_root():
    return {"hi":"hlelo"}
  
if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)


