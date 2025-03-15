from pydantic import BaseModel, Field, ConfigDict


class Theory(BaseModel):
    title: str = Field(...)
    description: str = Field(...)
    content: str = Field(...)

    model_config = ConfigDict(from_attributes=True)

