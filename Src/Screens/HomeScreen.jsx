import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addSubTodo,
  addTodo,
  deleteSubTodo,
  deleteTodo,
  editSubTodo,
  editTodo,
} from '../Redux/Slice/DataSlice';
import Images from '../Images/Image';

const HomeScreen = () => {
  const [inputText, setInputText] = useState('');
  const tasks = useSelector(state => state.data.todoList);
  const dispatch = useDispatch();

  const handleReset = () => {
    setSubInputIndex(null);
    setEditingIndex(null);
    setInputText('');
  };

  const [subInputIndex, setSubInputIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingSubIndex, setEditingSubIndex] = useState(null);

  const handleAdd = () => {
    if (inputText) {
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
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#5A6A84'}}>
      <StatusBar backgroundColor={'#5A6A84'} barStyle={'light-content'} />
      <ScrollView>
        <Text style={styles.HeaderText}>ToDo List</Text>
        <View style={styles.container}>
          <View style={styles.InputMain}>
            <TextInput
              style={styles.InputBox}
              placeholder="Enter Today Data"
              placeholderTextColor={'#FFFFFF'}
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
          <View>
            <FlatList
              data={tasks}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.ListMainView}>
                    <View>
                      <Text style={styles.listItem}>• {item.title}</Text>

                      {item.subTodos?.map((sub, subIndex) => {
                        return (
                          <View key={subIndex} style={styles.subListItemRow}>
                            <Text style={styles.SublistItem}> {sub}</Text>

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
                                onPress={() =>
                                  dispatch(deleteSubTodo({index, subIndex}))
                                }>
                                <Image
                                  style={styles.IconImage}
                                  source={Images.Delete}
                                  resizeMode="cover"
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        );
                      })}
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
                      <TouchableOpacity
                        onPress={() => dispatch(deleteTodo(index))}>
                        <Image
                          style={styles.IconImage}
                          source={Images.Delete}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{marginTop: 20}}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  HeaderText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F7D26A',
    textAlign: 'center',
    marginVertical: 20,
  },
  InputMain: {
    marginVertical: 10,
    minHeight: 50,
  },
  InputBox: {
    fontSize: 16,
    color: '#FFFFFF',
    padding: 12,
    borderColor: '#F7D26A',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#3E4A61',
  },
  ButtonMianView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  ButtonMain: {
    flex: 1,
    backgroundColor: '#F7D26A',
    paddingVertical: 12,
    marginHorizontal: 7,
    borderRadius: 10,
    elevation: 8,
    shadowColor: '#fff',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  ButtonText: {
    color: '#3E4A61',
    fontSize: 18,
    fontWeight: 800,
    textAlign: 'center',
  },
  ListMainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3E4A61',
    borderRadius: 8,
    marginVertical: 4,
  },
  listItem: {
    minWidth: '70%',
    maxWidth: '70%',
    fontSize: 18,
    fontWeight: 800,
    color: '#FFFFFF',
    padding: 10,
  },
  SublistItem: {
    minWidth: '80%',
    maxWidth: '80%',
    fontSize: 16,
    fontWeight: 600,
    color: '#FFFFFF',
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
    backgroundColor: '#2F3B50',
    borderRadius: 8,
    padding: 8,
    color: '#fff',
    borderColor: '#F7D26A',
    borderWidth: 1,
    marginRight: 8,
  },

  subAddButton: {
    backgroundColor: '#F7D26A',
    color: '#3E4A61',
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
    borderColor: '#F7D26A',
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
