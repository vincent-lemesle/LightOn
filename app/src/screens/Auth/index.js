import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Box, Image, Input, Stack, Icon, Button, Text } from 'native-base';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signInWithCredential } from 'firebase/auth';

const Auth = ({ auth, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { width } = useWindowDimensions();

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((_error) => {
        // const errorCode = error.code;
      });
  };

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((_error) => {
        // const errorCode = error.code;
      });
  };

  return (
    <Box
      style={{ marginTop: 2.5, backgroundColor: '#2D2F34' }}
      _web={{
        marginLeft: '25%',
        width: width / 2,
      }}
    >
      <Stack style={{ marginTop: '30%' }} space={4} w="100%" alignItems="center">
        {/* <Image alt="icon" source={icon} style={{ width: 201, height: 96, marginBottom: 50 }} /> */}
        <Input
          w={{
            base: '75%',
            md: '50%',
          }}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="email" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          w={{
            base: '75%',
            md: '50%',
          }}
          InputRightElement={
            <Icon
              as={<MaterialIcons name="visibility-off" />}
              size={5}
              mr="2"
              color="muted.400"
            />
          }
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />
        <Box>
          <Button style={{ width: 170, marginTop: 100 }} size="md" onPress={() => signIn(email, password)}>
            <Text style={{ }}>
              SIGN IN
            </Text>
          </Button>
        </Box>
        <Box>
          <Button style={{ width: 170 }} size="md" onPress={() => signUp(email, password)}>
            <Text style={{ }}>
              SIGN UP
            </Text>
          </Button>
        </Box>
        {
          /*
                 <FontAwesome5.Button style={{ width: 170 }} name="google" onPress={() => googleLogin()}>
          <Text>Log In With Google</Text>
        </FontAwesome5.Button>
           */
        }
      </Stack>
    </Box>
  )
}

export default Auth;
