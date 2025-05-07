// src/redux/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todoList: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {

    addTodo: (state, action) => {
      state.todoList.push({ title: action.payload, subTodos: [] });
    },
    deleteTodo: (state, action) => {
      state.todoList.splice(action.payload, 1);
    },
    editTodo: (state, action) => {
      const { index, newTitle } = action.payload;
      state.todoList[index].title = newTitle;
    },

    addSubTodo: (state, action) => {
      const { index, subText } = action.payload;
      const task = state.todoList[index];

      if (task) {
        if (!Array.isArray(task.subTodos)) {
          task.subTodos = [];
        }
        task.subTodos.push(subText);
      }
    },
    editSubTodo: (state, action) => {
      const { index, subIndex, newText } = action.payload;
      state.todoList[index].subTodos[subIndex] = newText;
    },
    deleteSubTodo: (state, action) => {
      const { index, subIndex } = action.payload;
      state.todoList[index].subTodos.splice(subIndex, 1);
    },

  },
});

export const { addTodo, resetTodo, deleteTodo, editTodo, addSubTodo, editSubTodo, deleteSubTodo } = dataSlice.actions;
export default dataSlice.reducer;




// addTodo: (state, action) => {
//   state.todoList.push(action.payload);
// },