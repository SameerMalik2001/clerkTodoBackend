import mongoose from "mongoose";
import Todo from "../models/Todo.js";


export const createTodo = async(title, completed, clerkUserId) => {
  if([undefined, null, ''].includes(title)) {
    throw new Error('Title is required');
  }
  if([undefined, null, ''].includes(completed)) {
    throw new Error('Completed is required');
  }

  // create a new todo object
  const todoObject = {
    title,
    completed,
    clerkUserId
  };
  //save in db
  const todo = new Todo(todoObject);
  await todo.save();
  if(!todo) {
    throw new Error('Failed to create todo');
  }
  return todo;
}

export const updateTodo = async(title, completed, todoId) => {
  let todoObject = {}
  if(title) {
    todoObject.title = title
  }
  if(completed) {
    todoObject.completed = completed
  }

  // find the todo by titleId and update the fields
  const isUpated = await Todo.findByIdAndUpdate(todoId, todoObject, { new: true });
  console.log(isUpated, todoObject);
  if(!isUpated) {
    return false
  }
  return true
}

export const deleteTodo = async(todoId) => {
  const objectId = new mongoose.Types.ObjectId(todoId);
  const todo = await Todo.findByIdAndDelete(objectId);
  if(!todo) {
    false
  }
  return true
}

export const getAllTodos = async(clerkUserId) => {
  const todos = await Todo.find({ clerkUserId });
  return todos;
}

export const getTodoById = async(todoId) => {
  const todo = await Todo.findById(todoId);
  if(!todo) {
    throw new Error('Todo not found');
  }
  return todo;
}