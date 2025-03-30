from fastapi import FastAPI
from suggestions import suggest

app = FastAPI()

@app.post("/suggest")
async def root(medicamentos: str, sintomas: str):
    suggest(medicamentos, sintomas)