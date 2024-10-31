from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from pydantic import BaseModel
import mysql.connector
from datetime import datetime
from typing import List, Optional

app = FastAPI()


def get_db_connection():
    conn = mysql.connector.connect(host="localhost",user="root",password="",database="server")
    return conn

class User(BaseModel):
    id: Optional[int]
    name: str

class Chore(BaseModel):
    id: Optional[int]
    description: str

class Assignment(BaseModel):
    id: Optional[int]
    user_id: int
    chore_id: int
    start_time: datetime
    end_time: datetime


@app.post("/users/")
async def create_user(user: User):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (name) VALUES (%s)", (user.name,))
    conn.commit()
    user_id = cursor.lastrowid
    conn.close()
    return {"id": user_id, "name": user.name}

@app.get("/users/{user_id}")
async def read_user(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    conn.close()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.put("/users/{user_id}")
async def update_user(user_id: int, user: User):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET name = %s WHERE id = %s", (user.name, user_id))
    conn.commit()
    conn.close()
    return {"id": user_id, "name": user.name}

@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
    conn.commit()
    conn.close()
    return {"message": "User deleted"}

@app.get("/users/")
async def get_all_users():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    conn.close()
    return users

@app.post("/chores/")
async def create_chore(chore: Chore):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO chores (description) VALUES (%s)", (chore.description,))
    conn.commit()
    chore_id = cursor.lastrowid
    conn.close()
    return {"id": chore_id, "description": chore.description}

@app.get("/chores/{chore_id}")
async def read_chore(chore_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM chores WHERE id = %s", (chore_id,))
    chore = cursor.fetchone()
    conn.close()
    if not chore:
        raise HTTPException(status_code=404, detail="Chore not found")
    return chore

@app.put("/chores/{chore_id}")
async def update_chore(chore_id: int, chore: Chore):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE chores SET description = %s WHERE id = %s", (chore.description, chore_id))
    conn.commit()
    conn.close()
    return {"id": chore_id, "description": chore.description}

@app.delete("/chores/{chore_id}")
async def delete_chore(chore_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM chores WHERE id = %s", (chore_id,))
    conn.commit()
    conn.close()
    return {"message": "Chore deleted"}

@app.get("/chores/")
async def get_all_chores():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM chores")
    chores = cursor.fetchall()
    conn.close()
    return chores

@app.post("/assignments/")
async def assign_chore(assignment: Assignment):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO assignments (user_id, chore_id, start_time, end_time) VALUES (%s, %s, %s, %s)",
        (assignment.user_id, assignment.chore_id, assignment.start_time, assignment.end_time)
    )
    conn.commit()
    assignment_id = cursor.lastrowid
    conn.close()
    return {"id": assignment_id}

@app.get("/assignments/{assignment_id}")
async def read_assignment(assignment_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM assignments WHERE id = %s", (assignment_id,))
    assignment = cursor.fetchone()
    conn.close()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return assignment

@app.put("/assignments/{assignment_id}")
async def update_assignment(assignment_id: int, assignment: Assignment):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE assignments SET user_id = %s, chore_id = %s, start_time = %s, end_time = %s WHERE id = %s",
        (assignment.user_id, assignment.chore_id, assignment.start_time, assignment.end_time, assignment_id)
    )
    conn.commit()
    conn.close()
    return {"id": assignment_id}

@app.delete("/assignments/{assignment_id}")
async def delete_assignment(assignment_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM assignments WHERE id = %s", (assignment_id,))
    conn.commit()
    conn.close()
    return {"message": "Assignment deleted"}

@app.get("/assignments/")
async def get_all_assignments():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM assignments")
    assignments = cursor.fetchall()
    conn.close()
    return assignments

@app.get("/assignments/upcoming")
async def get_upcoming_assignments():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM assignments WHERE start_time > %s", (datetime.now(),))
    assignments = cursor.fetchall()
    conn.close()
    return assignments

@app.get("/chores/count")
async def count_chores():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM chores")
    count = cursor.fetchone()[0]
    conn.close()
    return {"total_chores": count}

@app.get("/users/{user_id}/chores")
async def get_user_chores(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM assignments WHERE user_id = %s", (user_id,))
    chores = cursor.fetchall()
    conn.close()
    return chores
