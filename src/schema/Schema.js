export const GraphSchema = `#graphql
        type User {
            id: ID!
            username: String!
            firstName: String!
            lastName: String!
            phoneNumber: [String]!
            email: [String]!
            imageUrl: String!
            clerkUserId: String!
        }

        type Todo {
            id: ID!
            title: String!
            completed: String!
            clerkUserId: ID!
            createdAt: String!
            updatedAt: String!
        }

        type Query {
            user(id: ID!): User,
            todos(clerkUserId: ID!): [Todo],
            todo(todoId: ID!): Todo
        }

        type Mutation {
          createTodo(
            title: String!,
            completed: String
            clerkUserId: String!
          ): Todo,

          updateTodo(
            title: String,
            completed: String
            todoId: String!
          ): Boolean,

          deleteTodo(
            todoId: String!
          ): Boolean
          
        }
  `;
