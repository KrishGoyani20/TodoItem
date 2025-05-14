App install 
    npx @react-native-comminity/cli init DigiVegetable



Navigation add

    npm install @react-navigation/native
    npm install react-native-screens react-native-safe-area-context
    npm install @react-navigation/native-stack


    MainActivity.kt
import android.os.Bundle;

        override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }


Tab Navigation

    npm install @react-navigation/bottom-tabs


Vector Icon

    npm i react-native-vector-icons

        apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")

Redux
    npm install @reduxjs/toolkit react-redux
    
    npm install @reduxjs/toolkit
    npm install react-redux

    Style.js, CounterSlice.js, Index.js

SafeArea Context

    npm i react-native-safe-area-context

OTP entry

    npm i react-native-otp-entry

Slider/Swipwe Image

    npm i react-native-image-slider-box

    npm install react-native-snap-carousel

    npm i react-animated-slider
    
    npm i react-native-swiper

    
        Volume UP-Down Slider
    
             npm install @react-native-community/slider


firebase social logIn

    google

        https://react-native-google-signin.github.io/

        npm i @react-native-google-signin/google-signin@latest














        
// " Jante ho fir bhi, Anjan bante ho, istrah hame Pareshan karte ho, puchte ho tum hai kaya hai pasand, jo App khud ho fir bhi saval karte ho"

// ....................realtime Databse
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       // const index = tasks.length;
//       // .ref(`todo/${index}`)
//       const responce = await database().ref('todo/').set({value: tasks});
//       console.log('Firebase Data:', responce);
//     } catch (error) {
//       console.error('Error fetching data from Firebase:', error);
//     }
//   };

//   if (tasks.length >= 0) {
//     fetchData();
//   }
//   getDataBase();
// }, [tasks]);

// const getDataBase = async () => {
//   try {
//     getFirestore()
//       .collection('todo')
//       .onSnapshot(snapshot => {
//         const data = snapshot.docs.map(doc => doc.data());
//         setStoredData(data);
//         console.log('Firestore Data:', data);
//       });
//   } catch (error) {
//     console.error('Error fetching data from Firestore:', error);
//   }

//   // try {
//   //   const data = await database()
//   //     .ref('todo/')
//   //     .on('value', temData => {
//   //       setStoredData(temData.val());

//   //       console.log('Firebase Temp Data:', temData.val(), '\n\nData:', data);
//   //     });
//   // } catch (error) {
//   //   console.error('Error fetching data from Firebase:', error);
//   // }
// };

// const handleAdd = async () => {
//   if (inputText) {
//     // console.log('Input handal add function Text:', inputText);

//     // console.log('Editing Sub Index:  This is working');

//     if (subInputIndex !== null) {
//       if (editingSubIndex !== null) {
//         dispatch(
//           editSubTodo({
//             index: subInputIndex,
//             subIndex: editingSubIndex,
//             newText: inputText,
//           }),
//         );
//         setEditingSubIndex(null);
//       } else {
//         dispatch(addSubTodo({index: subInputIndex, subText: inputText}));
//       }
//       setSubInputIndex(null);
//     } else if (editingIndex !== null) {
//       dispatch(editTodo({index: editingIndex, newTitle: inputText}));
//       setEditingIndex(null);
//     } else {
//       dispatch(addTodo(inputText));
//     }
//     setInputText('');
//   }
// };










  // useEffect(() => {
  //   // const saveDataToFirestore = async () => {
  //   //   try {
  //   //     const todosCollection = firestore().collection('todo');

  //   //     // First, delete all existing documents (optional: clear old data)
  //   //     const snapshot = await todosCollection.get();
  //   //     const batch = firestore().batch();
  //   //     snapshot.forEach(doc => {
  //   //       batch.delete(doc.ref);
  //   //     });
  //   //     await batch.commit();

  //   //     // Then, add updated tasks
  //   //     tasks.forEach(async (task, index) => {
  //   //       await todosCollection.add(task);
  //   //     });

  //   //     setStoredData(todosCollection);
  //   //     console.log('Tasks saved to Firestore');
  //   //   } catch (error) {
  //   //     console.error('Error saving tasks to Firestore:', error);
  //   //   }
  //   // };
  //   // if (tasks.length >= 0) {
  //   //   saveDataToFirestore();
  //   // }

  //   getDataBase();
  // }, [tasks]);


















// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   FlatList,
//   Image,
//   StatusBar,
//   Alert,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   addSubTodo,
//   addTodo,
//   deleteSubTodo,
//   deleteTodo,
//   editSubTodo,
//   editTodo,
// } from '../Redux/Slice/DataSlice';
// import Images from '../assets/Image';
// import {color} from '../utils/Theme';

// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';

// const HomeScreen = ({navigation}) => {
//   const [inputText, setInputText] = useState('');
//   const [subInputIndex, setSubInputIndex] = useState(null);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editingSubIndex, setEditingSubIndex] = useState(null);
//   const [storedData, setStoredData] = useState([]);

//   const tasks = useSelector(state => state.data.todoList);
//   console.log('Tasks from Redux: ', tasks);

//   const currentUser = auth().currentUser;
//   const userEmail = currentUser?.email;

//   const dispatch = useDispatch();

//   const handleReset = () => {
//     setSubInputIndex(null);
//     setEditingIndex(null);
//     setInputText('');
//   };

//   const handleResetData = async () => {
//     try {
//       if (!userEmail) return;
//       await firestore().collection('users').doc(userEmail).delete();
//       setStoredData([]);
//       dispatch(clearTodos());
//       console.log('Data cleared for', userEmail);
//     } catch (error) {
//       console.error('Error clearing data:', error);
//     }
//   };

//   useEffect(() => {
//     const saveDataToFirestore = async () => {
//       try {
//         if (!userEmail) return;

//         await firestore().collection('todo').doc(userEmail).set({
//           TodoItem: tasks,
//         });
//         setStoredData(tasks);
//         console.log('Tasks saved to Firestore for:', userEmail);
//       } catch (error) {
//         console.error('Error saving tasks to Firestore:', error);
//       }
//     };

//     if (tasks.length >= 0) {
//       saveDataToFirestore();
//     }
//   }, [tasks]);

//   const getDataBase = async () => {
//     try {
//       if (!userEmail) return;
//       const userDoc = await firestore()
//         .collection('todo') // Ensure this is the correct collection
//         .doc(userEmail)
//         .get();
//       if (userDoc.exists) {
//         const data = userDoc.data();
//         console.log('Fetched data from Firestore:', data.TodoItem);
//         setStoredData(data.TodoItem || []); // Set the TodoItem array
//       } else {
//         setStoredData([]);
//       }
//     } catch (error) {
//       console.error('Error fetching user todo data:', error);
//     }
//   };
//   useEffect(() => {
//     getDataBase();
//   }, [userEmail]);

//   useEffect(() => {
//     getDataBase();
//   }, [userEmail]);

//   const handleAdd = () => {
//     if (inputText) {
//       if (subInputIndex !== null) {
//         if (editingSubIndex !== null) {
//           dispatch(
//             editSubTodo({
//               index: subInputIndex,
//               subIndex: editingSubIndex,
//               newText: inputText,
//             }),
//           );
//           setEditingSubIndex(null);
//         } else {
//           dispatch(addSubTodo({index: subInputIndex, subText: inputText}));
//         }
//         setSubInputIndex(null);
//       } else if (editingIndex !== null) {
//         dispatch(editTodo({index: editingIndex, newTitle: inputText}));
//         setEditingIndex(null);
//       } else {
//         dispatch(addTodo(inputText));
//       }
//       setInputText('');
//     }
//   };

//   console.log('Stored Data from firestore:', storedData);
//   const renderHeader = () => (
//     <View style={{marginTop: 16, marginBottom: 120}}>
//       <View>
//         <FlatList
//           data={storedData}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({item, index}) => (
//             <View style={styles.ListMainView}>
//               <View>
//                 <Text style={styles.listItem}>• {item.title}</Text>
//                 {item.subTodos?.map((sub, subIndex) => (
//                   <View key={subIndex} style={styles.subListItemRow}>
//                     <Text style={styles.SublistItem}>{sub}</Text>
//                     <View style={styles.subIcons}>
//                       <TouchableOpacity
//                         onPress={() => {
//                           setInputText(sub);
//                           setSubInputIndex(index);
//                           setEditingSubIndex(subIndex);
//                         }}>
//                         <Image
//                           style={styles.IconImage}
//                           source={Images.Edit}
//                           resizeMode="cover"
//                         />
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         onPress={() =>
//                           dispatch(deleteSubTodo({index, subIndex}))
//                         }>
//                         <Image
//                           style={styles.IconImage}
//                           source={Images.Delete}
//                           resizeMode="cover"
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//               <View style={styles.mainIcons}>
//                 <TouchableOpacity onPress={() => setSubInputIndex(index)}>
//                   <Image
//                     style={styles.IconImage}
//                     source={Images.Add}
//                     resizeMode="cover"
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => {
//                     setInputText(item.title);
//                     setEditingIndex(index);
//                     setSubInputIndex(null);
//                     setEditingSubIndex(null);
//                   }}>
//                   <Image
//                     style={styles.IconImage}
//                     source={Images.Edit}
//                     resizeMode="cover"
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => dispatch(deleteTodo(index))}>
//                   <Image
//                     style={styles.IconImage}
//                     source={Images.Delete}
//                     resizeMode="cover"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//           contentContainerStyle={{paddingBottom: 100}}
//           showsVerticalScrollIndicator={false}
//         />

//         {/* <FlatList
//           data={storedData?.value || []}
//           renderItem={({item, index}) => {
//             return (
//               <View style={styles.ListMainView}>
//                 <View>
//                   <Text style={styles.listItem}>• {item.title}</Text>

//                   {item.subTodos?.map((sub, subIndex) => {
//                     return (
//                       <View key={subIndex} style={styles.subListItemRow}>
//                         <Text style={styles.SublistItem}> {sub}</Text>

//                         <View style={styles.subIcons}>
//                           <TouchableOpacity
//                             onPress={() => {
//                               setInputText(sub);
//                               setSubInputIndex(index);
//                               setEditingSubIndex(subIndex);
//                             }}>
//                             <Image
//                               style={styles.IconImage}
//                               source={Images.Edit}
//                               resizeMode="cover"
//                             />
//                           </TouchableOpacity>
//                           <TouchableOpacity
//                             onPress={() =>
//                               dispatch(deleteSubTodo({index, subIndex}))
//                             }>
//                             <Image
//                               style={styles.IconImage}
//                               source={Images.Delete}
//                               resizeMode="cover"
//                             />
//                           </TouchableOpacity>
//                         </View>
//                       </View>
//                     );
//                   })}
//                 </View>

//                 <View style={styles.mainIcons}>
//                   <TouchableOpacity onPress={() => setSubInputIndex(index)}>
//                     <Image
//                       style={styles.IconImage}
//                       source={Images.Add}
//                       resizeMode="cover"
//                     />
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => {
//                       setInputText(item.title);
//                       setEditingIndex(index);
//                       setSubInputIndex(null);
//                       setEditingSubIndex(null);
//                     }}>
//                     <Image
//                       style={styles.IconImage}
//                       source={Images.Edit}
//                       resizeMode="cover"
//                     />
//                   </TouchableOpacity>
//                   <TouchableOpacity onPress={() => dispatch(deleteTodo(index))}>
//                     <Image
//                       style={styles.IconImage}
//                       source={Images.Delete}
//                       resizeMode="cover"
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             );
//           }}
//         /> */}
//       </View>
//     </View>
//   );

//   return (
//     <View style={{flex: 1, backgroundColor: '#5A6A84', paddingBottom: 20}}>
//       <StatusBar backgroundColor={'#5A6A84'} barStyle={'light-content'} />
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <TouchableOpacity
//           style={{
//             padding: 10,
//             backgroundColor: '#5A6A84',
//             margin: 16,
//             borderRadius: 8,
//           }}
//           onPress={() => navigation.openDrawer()}>
//           <Text style={{color: 'white', fontWeight: 'bold'}}>Open Menu</Text>
//         </TouchableOpacity>

//         <Text style={styles.HeaderText}>ToDo List</Text>
//       </View>
//       <View style={styles.container}>
//         <View style={styles.InputMain}>
//           <TextInput
//             style={styles.InputBox}
//             placeholder="Enter Today Data"
//             placeholderTextColor={color.FFF}
//             value={inputText}
//             onChangeText={value => setInputText(value)}
//           />
//         </View>
//         <View style={styles.ButtonMianView}>
//           <TouchableOpacity style={styles.ButtonMain} onPress={handleAdd}>
//             <Text style={styles.ButtonText}>
//               {editingIndex !== null
//                 ? 'Edit'
//                 : subInputIndex !== null
//                 ? editingSubIndex !== null
//                   ? 'Edit Sub'
//                   : 'Add Sub'
//                 : 'Add'}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.ButtonMain} onPress={handleReset}>
//             <Text style={styles.ButtonText}>Reset</Text>
//           </TouchableOpacity>
//         </View>
//         <View>
//           <FlatList
//             data={''}
//             ListHeaderComponent={renderHeader}
//             keyExtractor={(item, index) => index.toString()}
//             showsVerticalScrollIndicator={false}
//           />
//         </View>
//       </View>
//       <TouchableOpacity
//         onPress={() => handleResetData()}
//         style={{
//           backgroundColor: 'red',
//           paddingVertical: 10,
//           marginHorizontal: 16,
//           borderRadius: 10,
//         }}>
//         <Text style={{fontSize: 18, fontWeight: 700, textAlign: 'center'}}>
//           CLEAR
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };







/ const ResetInputButton = () => {
//   setEmailInput('');
//   setPassInput('');
//   navigation.navigate('HomeScreen');
// };

// createUserWithEmailAndPassword(
//   getAuth(),
//   'jane.doe@example.com',
//   'SuperSecretPassword!',
// )
//   .then(() => {
//     console.log('User account created & signed in!');
//   })
//   .catch(error => {
//     if (error.code === 'auth/email-already-in-use') {
//       console.log('That email address is already in use!');
//     }

//     if (error.code === 'auth/invalid-email') {
//       console.log('That email address is invalid!');
//     }

//     console.error(error);
//   });