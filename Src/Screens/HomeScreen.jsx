import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addSubTodo,
  addTodo,
  deleteSubTodo,
  deleteTodo,
  editSubTodo,
  editTodo,
  clearTodos,
} from '../Redux/Slice/DataSlice';
import Images from '../assets/Image';
import {color} from '../utils/Theme';
import firestore from '@react-native-firebase/firestore';
import {getAuth, signOut} from '@react-native-firebase/auth';
import {CommonActions, StackActions} from '@react-navigation/native';
import {clearUser, UserLogOut} from '../Redux/Slice/AuthSlice';

const HomeScreen = ({navigation}) => {
  const [inputText, setInputText] = useState('');
  const [subInputIndex, setSubInputIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingSubIndex, setEditingSubIndex] = useState(null);
  const [tempEmail, setTempEmail] = useState('');

  const tasks = useSelector(state => state.data.todoList);
  const dispatch = useDispatch();

  const loginUser = useSelector(state => state.auth.loginUser);
  const loginEmail = loginUser?.email;

  const handleReset = () => {
    setSubInputIndex(null);
    setEditingIndex(null);
    setEditingSubIndex(null);
    setInputText('');
  };

  const handleResetData = async () => {
    try {
      if (!loginEmail) return;
      await firestore().collection('todo').doc(loginEmail).delete();
      dispatch(clearTodos());
      handleReset();
      console.log('Data cleared for', loginEmail);
    } catch (error) {
      console.error('Error clearing data:', error);
      console.log('Error', 'Failed to clear data: ' + error.message);
    }
  };

  useEffect(() => {
    setTempEmail(loginEmail);
    const fetchDataFromFirestore = async () => {
      try {
        if (!loginEmail) return;
        const userDoc = await firestore()
          .collection('todo')
          .doc(loginEmail)
          .get();
        if (userDoc.exists) {
          const data = userDoc.data();
          if (data.TodoItem) {
            dispatch(clearTodos());
            data.TodoItem.forEach(todo => {
              dispatch(addTodo(todo.title));
              if (todo.subTodos && todo.subTodos.length > 0) {
                todo.subTodos.forEach(subText => {
                  dispatch(
                    addSubTodo({index: data.TodoItem.indexOf(todo), subText}),
                  );
                });
              }
            });
          }
        } else {
          dispatch(clearTodos());
        }
      } catch (error) {
        console.error('Error fetching user todo data:', error);
      }
    };
    fetchDataFromFirestore();
  }, [loginEmail]);

  useEffect(() => {
    const saveDataToFirestore = async () => {
      try {
        if (!loginEmail) return;
        await firestore().collection('todo').doc(loginEmail).set({
          TodoItem: tasks,
        });
        console.log('Tasks saved to Firestore for:', loginEmail);
      } catch (error) {
        console.error('Error saving tasks to Firestore:', error);
      }
    };
    saveDataToFirestore();
  }, [tasks, loginEmail]);

  const handleAdd = () => {
    if (!inputText.trim()) return;

    if (subInputIndex !== null) {
      if (editingSubIndex !== null) {
        dispatch(
          editSubTodo({
            index: subInputIndex,
            subIndex: editingSubIndex,
            newText: inputText,
          }),
        );
        setEditingSubIndex(null);
      } else {
        dispatch(addSubTodo({index: subInputIndex, subText: inputText}));
      }
      setSubInputIndex(null);
    } else if (editingIndex !== null) {
      dispatch(editTodo({index: editingIndex, newTitle: inputText}));
      setEditingIndex(null);
    } else {
      dispatch(addTodo(inputText));
    }
    setInputText('');
  };

  const renderItem = ({item, index}) => (
    <View style={styles.ListMainView}>
      <View>
        <Text style={styles.listItem}>• {item.title}</Text>
        {item.subTodos?.map((sub, subIndex) => (
          <View key={subIndex} style={styles.subListItemRow}>
            <Text style={styles.SublistItem}>{sub}</Text>
            <View style={styles.subIcons}>
              <TouchableOpacity
                onPress={() => {
                  setInputText(sub);
                  setSubInputIndex(index);
                  setEditingSubIndex(subIndex);
                }}>
                <Image
                  style={styles.IconImage}
                  source={Images.Edit}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch(deleteSubTodo({index, subIndex}))}>
                <Image
                  style={styles.IconImage}
                  source={Images.Delete}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.mainIcons}>
        <TouchableOpacity onPress={() => setSubInputIndex(index)}>
          <Image
            style={styles.IconImage}
            source={Images.Add}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setInputText(item.title);
            setEditingIndex(index);
            setSubInputIndex(null);
            setEditingSubIndex(null);
          }}>
          <Image
            style={styles.IconImage}
            source={Images.Edit}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(deleteTodo(index))}>
          <Image
            style={styles.IconImage}
            source={Images.Delete}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleLogout = async () => {
    try {
      dispatch(clearTodos());
      dispatch(UserLogOut());
      dispatch(clearUser());
      await signOut(getAuth());
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#5A6A84', paddingBottom: 20}}>
      <StatusBar backgroundColor="#5A6A84" barStyle="light-content" />
      <View>
        <Text style={styles.HeaderText}>ToDo List</Text>
      </View>
      <View style={styles.container}>
        <Text style={{color: '#FFF'}}>Email :- {tempEmail}</Text>
        <View style={styles.InputMain}>
          <TextInput
            style={styles.InputBox}
            placeholder="Enter Today Data"
            placeholderTextColor={color.FFF}
            value={inputText}
            onChangeText={setInputText}
          />
        </View>
        <View style={styles.ButtonMianView}>
          <TouchableOpacity style={styles.ButtonMain} onPress={handleAdd}>
            <Text style={styles.ButtonText}>
              {editingIndex !== null
                ? 'Edit'
                : subInputIndex !== null
                ? editingSubIndex !== null
                  ? 'Edit Sub'
                  : 'Add Sub'
                : 'Add'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ButtonMain} onPress={handleReset}>
            <Text style={styles.ButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 100}}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={{flex: 1, maxHeight: 50, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={handleResetData}
          style={{
            flex: 1,
            marginHorizontal: 8,
            backgroundColor: 'red',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#FFF',
              textAlign: 'center',
            }}>
            CLEAR
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            marginHorizontal: 8,
            backgroundColor: 'red',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={() => handleLogout()}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#FFF',
              textAlign: 'center',
            }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  HeaderText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: color.F7D26A,
    textAlign: 'center',
    marginVertical: 20,
  },
  InputMain: {
    marginVertical: 10,
    minHeight: 50,
  },
  InputBox: {
    fontSize: 16,
    color: color.FFF,
    padding: 12,
    borderColor: color.F7D26A,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: color.BG3E4,
  },
  ButtonMianView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
  },
  ButtonMain: {
    flex: 1,
    backgroundColor: color.F7D26A,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 8,
    shadowColor: color.FFF,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  ButtonText: {
    color: color.BG3E4,
    fontSize: 18,
    fontWeight: 800,
    textAlign: 'center',
  },
  ListMainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.BG3E4,
    borderRadius: 8,
    marginVertical: 4,
  },
  listItem: {
    minWidth: '85%',
    maxWidth: '85%',
    marginHorizontal: 6,
    fontSize: 18,
    fontWeight: 800,
    color: color.FFF,
    padding: 10,
  },
  SublistItem: {
    minWidth: '80%',
    maxWidth: '80%',
    fontSize: 16,
    fontWeight: 600,
    color: color.FFF,
    padding: 10,
  },
  IconImage: {
    backgroundColor: '#1D383D',
    borderRadius: 10,
    marginHorizontal: 3,
  },
  subItem: {
    color: '#ccc',
    fontSize: 14,
    paddingLeft: 20,
  },

  subInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginLeft: 10,
  },

  subInput: {
    flex: 1,
    backgroundColor: color.BGD2F3,
    borderRadius: 8,
    padding: 8,
    color: color.FFF,
    borderColor: color.F7D26A,
    borderWidth: 1,
    marginRight: 8,
  },

  subAddButton: {
    backgroundColor: color.F7D26A,
    color: color.BG3E4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontWeight: 'bold',
  },
  subListItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 40,
    marginVertical: 4,
    minWidth: '60%',
    borderTopWidth: 1,
    borderColor: color.F7D26A,
    borderRadius: 6,
  },

  subIcons: {
    flexDirection: 'row',
    position: 'relative',
    right: 10,
  },

  mainIcons: {
    position: 'absolute',
    right: 8,
    top: 10,
    gap: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
