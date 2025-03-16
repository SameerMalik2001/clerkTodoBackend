import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from "../controller/Todo.controller.js";
import { getUserById } from "../controller/user.controller.js";


export const GraphResolver = {
  // Todo : {
  //   user: async(todo) => await getUserById(todo.UserId)
  // },

	Query: {
		user: async (_, { id }) => getUserById(id),

    todos: async (_, { clerkUserId }) => await getAllTodos(clerkUserId),
    todo: async (_, { todoId }) => await getTodoById(todoId),
	},
	Mutation: {

    createTodo: async (_, {title, completed, clerkUserId}) => await createTodo(title, completed, clerkUserId),
    updateTodo: async (_, {title, completed, todoId}) => await updateTodo(title, completed, todoId),
    deleteTodo: async (_, {todoId}) => await deleteTodo(todoId),
	},
};
