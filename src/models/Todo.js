import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true},
    completed: { type: String, enum: ['Pending', 'In Progress', 'Completed'], required: true }, 
    clerkUserId: { type: String, required: true}
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;