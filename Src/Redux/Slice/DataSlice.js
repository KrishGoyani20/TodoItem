// src/redux/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  todoList: [],
};

const saveTodosToStorage = async (todoList) => {
  try {
    await AsyncStorage.setItem('todoList', JSON.stringify(todoList));
  } catch (err) {
    console.error('Failed to save todos to AsyncStorage:', err);
  }
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push({ title: action.payload, subTodos: [] });
      saveTodosToStorage(state.todoList);
    },
    deleteTodo: (state, action) => {
      state.todoList.splice(action.payload, 1);
      saveTodosToStorage(state.todoList);
    },
    editTodo: (state, action) => {
      const { index, newTitle } = action.payload;
      state.todoList[index].title = newTitle;
      saveTodosToStorage(state.todoList);
    },
    addSubTodo: (state, action) => {
      const { index, subText } = action.payload;
      const task = state.todoList[index];
      if (task) {
        if (!Array.isArray(task.subTodos)) {
          task.subTodos = [];
        }
        task.subTodos.push(subText);
        saveTodosToStorage(state.todoList);
      }
    },
    editSubTodo: (state, action) => {
      const { index, subIndex, newText } = action.payload;
      state.todoList[index].subTodos[subIndex] = newText;
      saveTodosToStorage(state.todoList);
    },
    deleteSubTodo: (state, action) => {
      const { index, subIndex } = action.payload;
      state.todoList[index].subTodos.splice(subIndex, 1);
      saveTodosToStorage(state.todoList);
    },
    clearTodos: (state) => {
      state.todoList = [];
      saveTodosToStorage(state.todoList);
    },
  },
});

export const { addTodo, resetTodo, deleteTodo, editTodo, addSubTodo, editSubTodo, deleteSubTodo, clearTodos } = dataSlice.actions;
export default dataSlice.reducer;