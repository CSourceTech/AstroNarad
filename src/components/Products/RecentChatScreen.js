// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// import io from 'socket.io-client';
// import { useSelector } from 'react-redux';
// import { useRoute } from '@react-navigation/native';

// const RecentChatScreen = () => {
//   const token = useSelector(state => state.auth.value.accessToken);
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');
//   const route = useRoute();
//   const { id } = route.params;

//   useEffect(() => {
//     fetchMessages();
//     connectSocket();
//   }, []);

//   // Fetch messages
//   const fetchMessages = async () => {
//     try {
//       const response = await fetch(`http://35.174.44.86:8000/api/chat/thread/${id}?page=1` , {
//         method: 'GET',
//         headers: {
//           'accept': 'application/json',
//           'accesstoken': token, // Dynamic token from Redux
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(data)
//       const formattedMessages = data.messages.map((msg) => ({
//         id: msg.message_id.toString(),
//         text: msg.message,
//         sender: msg.sender_id,
//       }));
//       setMessages(formattedMessages.reverse()); // Assuming latest messages come last
//     } catch (error) {
//       console.error('Failed to fetch messages:', error);
//     }
//   };

//   // Socket connection
//   const connectSocket = () => {
//     const socket = io('http://35.174.44.86:8000/', {
//       query: { token: token }
//     });

    
//     const receiver_id = 1;
//     console.log('socket receiver_id:', receiver_id);
//     console.log('socketdata:', socket);
//     socket.emit('joinRoom', receiver_id);

//     socket.on('joinInfo', (data) => {
//       console.log('Message Join Info:', data);
//     });

//     socket.on('receiveMessage', (data) => {
//       console.log('Message received:', data);
//       setMessages(prevMessages => [
//         { id: data?.id, text: data.message, sender: data?.sender },
//         ...prevMessages,
//       ]);
//     });

//     socket.on('receiveVoiceCall', (data) => {
//       console.log('Voice call received:', data);
//     });
//   };

//   const handleSend = () => {
//     if (inputText.trim()) {
//       setMessages(prevMessages => [
//         { id: Date.now().toString(), text: inputText, sender: 'user' },
//         ...prevMessages,
//       ]);
//       setInputText('');
//     }
//   };

//   const renderMessage = ({ item }) => (
//     <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.supportMessage]}>
//       <Text style={styles.messageText}>{item.text}</Text>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <FlatList
//         data={messages}
//         renderItem={renderMessage}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.messagesList}
//         inverted
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type a message"
//           value={inputText}
//           onChangeText={setInputText}
//           placeholderTextColor={'black'}
//         />
//         <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   messagesList: {
//     paddingVertical: 10,
//   },
//   messageContainer: {
//     marginVertical: 5,
//     padding: 10,
//     borderRadius: 8,
//     maxWidth: '75%',
//   },
//   userMessage: {
//     backgroundColor: '#DCF8C6',
//     alignSelf: 'flex-end',
//     marginRight: 10,
//   },
//   supportMessage: {
//     backgroundColor: '#ECECEC',
//     alignSelf: 'flex-start',
//     marginLeft: 10,
//   },
//   messageText: {
//     fontSize: 16,
//     color: 'black'
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: '#ECECEC',
//     backgroundColor: '#FFF',
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     fontSize: 16,
//     backgroundColor: '#F5F5F5',
//     borderRadius: 20,
//     marginRight: 10,
//     color: 'black'
//   },
//   sendButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//   },
//   sendButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default RecentChatScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

const RecentChatScreen = () => {
  const token = useSelector(state => state.auth.value.accessToken);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const route = useRoute();
  const { id } = route.params;

  const currentUser = 'user'; // Define current user type

  useEffect(() => {
    fetchMessages();
    connectSocket();
  }, []);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://35.174.44.86:8000/api/chat/thread/${id}?page=1`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'accesstoken': token,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const formattedMessages = data.messages.map((msg) => ({
        id: msg.message_id.toString(),
        text: msg.message,
        message_user_type: msg.sender_id === 1 ? 'user' : 'other', // Simulating message type
      }));
      setMessages(formattedMessages.reverse());
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  // Socket connection
  const connectSocket = () => {
    const socket = io('http://35.174.44.86:8000/', {
      query: { token: token },
    });

    const receiver_id = 1;
    socket.emit('joinRoom', receiver_id);

    socket.on('joinInfo', (data) => {
      console.log('Message Join Info:', data);
    });

    socket.on('receiveMessage', (data) => {
      console.log('Message received:', data);
      setMessages(prevMessages => [
        {
          id: data?.id,
          text: data.message,
          message_user_type: data?.sender === 1 ? 'user' : 'other',
        },
        ...prevMessages,
      ]);
    });

    socket.on('receiveVoiceCall', (data) => {
      console.log('Voice call received:', data);
    });
  };

  // Send message
  const handleSend = () => {
    if (inputText.trim()) {
      fetch('http://35.174.44.86:8000/api/chat/send', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'accesstoken': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message_type: 'new',
          reciever_id: id,
          message: inputText,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Message sent successfully:', data);
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });

      setMessages(prevMessages => [
        {
          id: Date.now().toString(),
          text: inputText,
          message_user_type: currentUser, // Add current user type
        },
        ...prevMessages,
      ]);
      setInputText('');
    }
  };

  // Render message
  const renderMessage = ({ item }) => {
    const isUserMessage = item.message_user_type === currentUser;

    return (
      <View
        style={[
          styles.messageContainer,
          isUserMessage ? styles.userMessage : styles.supportMessage,
          { alignSelf: isUserMessage ? 'flex-end' : 'flex-start' }, // Align dynamically
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={inputText}
          onChangeText={setInputText}
          placeholderTextColor={'black'}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messagesList: {
    paddingVertical: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    maxWidth: '75%',
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  supportMessage: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ECECEC',
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    marginRight: 10,
    color: 'black',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecentChatScreen;