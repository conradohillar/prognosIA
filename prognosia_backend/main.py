from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import users, predictions
from prognosia_backend.suggestions import suggestions

app = FastAPI()

app.include_router(users.router)

@app.post("/")
async def root(medicamentos: str, sintomas: str):
    suggestions(medicamentos, sintomas)