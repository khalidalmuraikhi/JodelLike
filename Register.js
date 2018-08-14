import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore'
import Login from './Login'
import Messages from './Messages.js'
import ImagePicker from 'react-native-image-picker'
import { pickImage, uploadImage } from './ImageUtils'
import * as Aziz from 'native-base';


export default class App extends React.Component {

    state = {
        email: '',
        password: '',
        passwordConfirm: '',
        image: null
    }

    // async handleRegister() {
    //     if (this.state.password === this.state.passwordConfirm) {
    //         if (!this.state.image) {
    //             this.setState({ image: await pickImage() })
    //         }
    //         const user = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    //         if (this.state.image) {
    //             const result = await uploadImage(this.state.image, user.email)
    //         }
    //     }
    // }

    handleRegister = async () => {
        if (this.state.password === this.state.passwordConfirm ) {
            if (!this.state.image) {
                this.setState({ image: await pickImage() })
            }
            const user = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            await db.collection("users").doc(this.state.email).set({name: this.state.name})

            if (this.state.image) {
                const result = await uploadImage(this.state.image, user.email)
            }
            // await db.collection('userslist').add({ id: this.state.email })

            const { navigate } = this.props.navigation;
            navigate("Login", {screen: "Login"})
        }
       
    }

    async handlePickImage() {
        this.setState({ image: await pickImage() })
    }

    handleChangePage = () => {
        this.setState({ flag: false })
    }

    render() {
        return (
            <Aziz.Container>

                {/* CONTENT */}
                <Aziz.Content>
                    <Aziz.Form>

                        <Aziz.Item floatingLabel>
                            <Aziz.Label>Username</Aziz.Label>
                            <Aziz.Input onChangeText={email => this.setState({ email })} />
                        </Aziz.Item>

                        <Aziz.Item floatingLabel>
                            <Aziz.Label>Password</Aziz.Label>
                            <Aziz.Input secureTextEntry onChangeText={password => this.setState({ password })} />
                        </Aziz.Item>

                        <Aziz.Item floatingLabel>
                            <Aziz.Label>Confirm Password</Aziz.Label>
                            <Aziz.Input secureTextEntry onChangeText={passwordConfirm => this.setState({ passwordConfirm })} />
                        </Aziz.Item>

                        <View style={{ paddingTop: 30, paddingRight: 80, paddingLeft: 80 }}>
                            <Aziz.Button onPress={() => this.handlePickImage()} bordered info iconLeft>
                                <Aziz.Icon name='camera' />
                                <Aziz.Text>Choose an Image     </Aziz.Text>
                            </Aziz.Button>
                        </View>

                        <View style={{ padding: 40 }}>
                            <Aziz.Button onPress={() => this.handleRegister()} block success iconLeft>
                            <Aziz.Icon name='person' />
                                <Aziz.Text>Register</Aziz.Text>
                            </Aziz.Button>
                        </View>

                    </Aziz.Form>
                </Aziz.Content>

                {/* FOOTER */}
                <Aziz.Footer>

                </Aziz.Footer>

            </Aziz.Container>
            
        )
    }
}

const styles = StyleSheet.create({
    Login: {
        fontSize: 20,
        margin: 50,
        borderRadius: 70,
        borderWidth: 2,
        padding: 25,
    },
    Register: {
        margin: 30,
        borderRadius: 20,
        borderWidth: 1.5,
        padding: 15,
    },
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#C6F0FF',
        alignItems: 'center',
    },
    forBoxes: {
        borderRadius: 10,
        borderRadius: 5,
        width: 200,
        borderWidth: 1,
        height: 30,
        padding: 3,
        margin: 5
    }
});