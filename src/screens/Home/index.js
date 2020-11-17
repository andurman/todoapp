import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button, Dimensions, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as todosActions from '../../store/actions/todos';

const { width } = Dimensions.get('window')

const Home = props => {
    const todos = useSelector( state => state.todos.todos )
    const [ newTodo, setNewTodo ] = useState('')
    const [ editId, setEditId ] = useState(null)
    const [ editToDo, setEditToDo ] = useState('')
    const [ unique, setUnique ] = useState(0)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(todosActions.getTodos())
    }, [dispatch]);

    addNewToDo = () => {
        let id = Math.round(Math.random() * 1000000)
        if(newTodo == ''){
            alert('Lütfen alanı boş bırakmayınız.')
        }else{
            let temp = todos
            temp.push({'id': id,'desc': newTodo, 'isComplated': false})
            setNewTodo('')
            dispatch(todosActions.setTodos(temp))
        }
    }

    updateToDo = (id, text) => {
        setEditId(id)
        setEditToDo(text)
    }

    updateToDoComplate = (id) => {
        let index = todos.findIndex(item => item.id === id);
        let temp = todos
        temp[index].desc = editToDo
        setEditToDo('')
        setEditId(null)
        dispatch(todosActions.setTodos(temp))
    }

    changeToDoStatus = (id) => {
        let index = todos.findIndex(item => item.id === id);
        let temp = todos
        temp[index].isComplated = !temp[index].isComplated
        setUnique(unique+1)
        dispatch(todosActions.setTodos(temp))
    }

    deleteToDo = (id) => {
        let index = todos.findIndex(item => item.id === id);
        let temp = todos
        temp.splice(index, 1);
        setUnique(unique+1)
        dispatch(todosActions.setTodos(temp))
    }

    renderTodos = () => {
        return todos.map((item)=> {
            if(!item.isComplated){
                return(
                    <View key= {item.id} style={styles.item}>
                        {editId == item.id ? 
                            <View style={{flexDirection:'row'}}>
                                <TextInput
                                    style={{ height: 40, width: width-100, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={text => setEditToDo(text)}
                                    value={editToDo}
                                />
                                <Button
                                    onPress={()=>updateToDoComplate(item.id)}
                                    title="Tamam"
                                    color="#841584"
                                />
                            </View>
                        :
                            <View>
                                <Text style={styles.itemText}>{item.desc}</Text>
                                <View style={{flexDirection:'row', alignSelf: 'flex-end', justifyContent:'space-between', marginRight: 10}}>
                                    <Button
                                        onPress={()=>changeToDoStatus(item.id)}
                                        title="Tamamlandı"
                                        color="#841584"
                                    />
                                    <Button
                                        onPress={() => updateToDo(item.id, item.desc)}
                                        title="Düzenle"
                                        color="#841584"
                                    />
                                    <Button
                                        onPress={() => deleteToDo(item.id)}
                                        title="Sil"
                                        color="#841584"
                                    />
                                </View>
                            </View>
                        }
                    </View>
                )
            }
        })
    }

    renderComplated = () => {
        return todos.map((item)=> {
            if(item.isComplated){
                return(
                    <View key= {item.id} style={styles.item}>
                        {editId == item.id ? 
                            <View style={{flexDirection:'row'}}>
                                <TextInput
                                    style={{ height: 40, width: width-100, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={text => setEditToDo(text)}
                                    value={editToDo}
                                />
                                <Button
                                    onPress={()=>updateToDoComplate(item.id)}
                                    title="Tamam"
                                    color="#841584"
                                />
                            </View>
                        :
                            <View>
                                <Text style={styles.itemText}>{item.desc}</Text>
                                <View style={{flexDirection:'row', alignSelf: 'flex-end', justifyContent:'space-between', marginRight: 10}}>
                                    <Button
                                        onPress={()=>changeToDoStatus(item.id)}
                                        title="Tamamlanmadı"
                                        color="#841584"
                                    />
                                    <Button
                                        onPress={() => updateToDo(item.id, item.desc)}
                                        title="Düzenle"
                                        color="#841584"
                                    />
                                    <Button
                                        onPress={() => deleteToDo(item.id)}
                                        title="Sil"
                                        color="#841584"
                                    />
                                </View>
                            </View>
                        }
                    </View>
                )
            }
        })
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.addNew}>
                <Text style={styles.title}>Yeni Ekle</Text>
                <View style={styles.divider}/>
                <View style={{flexDirection:'row'}}>
                    <TextInput
                        style={{ height: 40, width: width-70, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setNewTodo(text)}
                        value={newTodo}
                    />
                    <Button
                        onPress={addNewToDo}
                        title="Ekle"
                        color="#841584"
                    />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.todos}>
                    <Text style={styles.title}>Yapılacaklar</Text>
                    <View style={styles.divider}/>
                    {renderTodos()}
                </View>
                <View style={styles.complated}>
                    <Text style={styles.title}>Tamamlananlar</Text>
                    <View style={styles.divider}/>
                    {renderComplated()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginHorizontal: 10
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        marginVertical: 10
    },
    addNew: {
        marginBottom: 10
    },
    todos: {
        marginBottom: 10
    },
    complated: {
        
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    item: {
        marginVertical: 5,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    itemText: {
        margin: 10
    }
});

export default Home;