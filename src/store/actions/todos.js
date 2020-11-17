export const SET_TODOS = 'SET_TODOS'

import AsyncStorage from '@react-native-community/async-storage';

export const setTodos = (todos) => {
    return async dispatch => {
        await AsyncStorage.setItem('todos', JSON.stringify(todos))
        dispatch({ type: SET_TODOS, todos })
    }
}

export const getTodos = () => {
    return async dispatch => {
        try{
            let oldTodos = await AsyncStorage.getItem('todos')
            let todos = JSON.parse(oldTodos)
            if(todos){
                dispatch({ type: SET_TODOS, todos })
            }
        }catch(e){
            console.log(e)
        }
    }
}