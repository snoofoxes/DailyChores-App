from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from pydantic import BaseModel, Field
import mysql.connector
from datetime import datetime
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

def get_db_connection():
    conn = mysql.connector.connect(host="localhost", user="root", password="", database="serv")
    return conn

class User(BaseModel):
    id: Optional[int] = None 
    name: str

class UserRegister(BaseModel):
    name: str
    password: str

class UserUpdate(BaseModel):
    name: str
    password: str


class Manager(BaseModel):
    username: str
    password: str

class Chore(BaseModel):
    id: Optional[int]
    name: str

class AddChore(BaseModel):
    name: str
    description: str

class UpdateChore(BaseModel):
    id: int
    name: str
    description: str

class Assignment(BaseModel):
    user_id: int
    chore_id: int
    start_time: datetime
    end_time: datetime
    status: str

    class Config:
        orm_mode = True

class ManagerUpdate(BaseModel):
    id: int
    username: str
    password: str

@app.post("/register/manager/")
async def register_manager(manager: Manager):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM managers WHERE username = %s", (manager.username,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Username already taken")

    try:
        cursor.execute(
            "INSERT INTO managers (username, password) VALUES (%s, %s)",
            (manager.username, manager.password),
        )
        conn.commit()
        conn.close()
    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

    return {"message": "Manager registration successful"}

@app.post("/login/manager/")
async def login_manager(manager: Manager):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM managers WHERE username = %s AND password = %s",
        (manager.username, manager.password),
    )
    db_manager = cursor.fetchone()
    conn.close()

    if not db_manager:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    return {"message": "Manager login successful"}



@app.post("/login/user/")
async def login_user(user: UserRegister):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM users WHERE name = %s AND password = %s",
        (user.name, user.password),
    )
    db_user = cursor.fetchone()
    conn.close()

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    return {"message": "User login successful"}

@app.post("/users/")
async def create_user(user: UserRegister):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (name, password) VALUES (%s, %s)", (user.name, user.password,))
        conn.commit()
        user_id = cursor.lastrowid
    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()
    
    return {"id": user_id, "name": user.name, "password": user.password}

@app.get("/users/{user_id}")
async def read_user(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

@app.put("/users/{user_id}")
async def update_user(user_id: int, user: UserUpdate):
    print(user)
    if not user.name or not user.password:
        raise HTTPException(status_code=400, detail="Name and password must not be empty")

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "UPDATE users SET name = %s, password = %s WHERE id = %s",
            (user.name, user.password, user_id),
        )
        conn.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="User not found")

    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()
    return {"id": user_id, "name": user.name, "password": user.password}

@app.delete("/users/{user_id}")
async def delete_chore(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
        conn.commit()
        return {"message": "Users deleted"}
    except mysql.connector.Error as e:
        conn.rollback() 
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()

@app.get("/users/")
async def get_all_users():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()

    return users

@app.post("/chores/")
async def create_chore(chore: AddChore):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO chores (name, description) VALUES (%s, %s)", (chore.name, chore.description,))
        conn.commit()
        chore_id = cursor.lastrowid
    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()
    
    return {"id": chore_id, "name": chore.name, "description": chore.description}

@app.get("/chores/{chore_id}")
async def read_chore(chore_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM chores WHERE id = %s", (chore_id,))
        chore = cursor.fetchone()
    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()

    if not chore:
        raise HTTPException(status_code=404, detail="Chore not found")
    
    return chore

@app.put("/chores/{chore_id}")
async def update_chore(chore_id: int, chore: UpdateChore):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "UPDATE chores SET name = %s, description = %s WHERE id = %s",
            (chore.name, chore.description, chore_id),
        )
        conn.commit()
    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()

    return {"id": chore_id, "name": chore.name, "description": chore.description}


@app.delete("/chores/{chore_id}")
async def delete_chore(chore_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM chores WHERE id = %s", (chore_id,))
        conn.commit()
        return {"message": "Chore deleted"}
    except mysql.connector.Error as e:
        conn.rollback()  
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()


@app.get("/chores/")
async def get_all_chores():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM chores")
        chores = cursor.fetchall()
    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()

    return chores

@app.post("/assignments/")
async def assign_chore(assignment: Assignment):
    print("Assignment payload:", assignment.dict())

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE id = %s", (assignment.user_id,))
    user = cursor.fetchone()
    if not user:
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")
    cursor.execute("SELECT * FROM chores WHERE id = %s", (assignment.chore_id,))
    chore = cursor.fetchone()
    if not chore:
        conn.close()
        raise HTTPException(status_code=404, detail="Chore not found")
    if assignment.start_time >= assignment.end_time:
        conn.close()
        raise HTTPException(status_code=400, detail="End time must be after start time")
    try:
        cursor.execute(
            "INSERT INTO assignments (user_id, chore_id, start_time, end_time, status) VALUES (%s, %s, %s, %s, %s)",
            (assignment.user_id, assignment.chore_id, assignment.start_time, assignment.end_time, assignment.status)
        )
        conn.commit()
        assignment_id = cursor.lastrowid
    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()

    return {
        "id": assignment_id,
        "user_id": assignment.user_id,
        "chore_id": assignment.chore_id,
        "start_time": assignment.start_time,
        "end_time": assignment.end_time,
        "status": assignment.status,
    }

@app.get("/assignments/user/{user_id}")
async def get_assignments_by_user(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM assignments WHERE user_id = %s", (user_id,))
        assignments = cursor.fetchall()
    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()

    if not assignments:
        raise HTTPException(status_code=404, detail="Assignments not found for this user")
    
    return assignments

@app.put("/assignments/{assignment_id}")
async def update_assignment(assignment_id: int, assignment: Assignment):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "UPDATE assignments SET user_id = %s, chore_id = %s, start_time = %s, end_time = %s, status = %s WHERE id = %s",
            (assignment.user_id, assignment.chore_id, assignment.start_time, assignment.end_time, assignment.status, assignment_id)
        )
        conn.commit()
    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()
    return {"message": "Assignment updated"}

@app.delete("/assignments/{assignment_id}")
async def delete_assignment(assignment_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM assignments WHERE id = %s", (assignment_id,))
        conn.commit()
    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()

    return {"message": "Assignment deleted"}

@app.get("/assignments/")
async def get_all_assignments():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT a.id, u.name AS user_name, c.name AS chore_name, a.start_time, a.end_time, a.status
            FROM assignments a
            JOIN users u ON a.user_id = u.id
            JOIN chores c ON a.chore_id = c.id
        """)
        assignments = cursor.fetchall()
    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()

    return assignments

@app.get("/chores/search/")
async def search_chores(query: str):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT * FROM chores
            WHERE name LIKE %s OR description LIKE %s
        """, ('%' + query + '%', '%' + query + '%'))
        chores = cursor.fetchall()
    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()

    if not chores:
        raise HTTPException(status_code=404, detail="No chores found matching your search")
    
    return chores

@app.get("/chores/{chore_id}/description")
async def get_chore_description(chore_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT description FROM chores WHERE id = %s", (chore_id,))
        chore = cursor.fetchone()
    except mysql.connector.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()

    if not chore:
        raise HTTPException(status_code=404, detail="Chore not found")
    
    return {"description": chore["description"]}