import React, { useState, useRef, useEffect } from 'react'

import {
    View, Text, StyleSheet, Dimensions,
    TextInput, Alert, LogBox, AsyncStorage,
    ActivityIndicator, SafeAreaView
} from 'react-native'

import Header from '../../components/Header'
import { colors, parameters, title } from '../../global/styles'
import { Icon, Button, SocialIcon } from 'react-native-elements'

import * as Animatable from 'react-native-animatable'
import { TouchableOpacity } from 'react-native-gesture-handler'

import {
    createUserWithEmailAndPassword
} from 'firebase/auth'
import { auth, db } from '../../firebase/firebase'
import { collection, addDoc, doc } from "firebase/firestore";

LogBox.ignoreAllLogs()

export default function SignUpScreen({ navigation }) {

    const [textinput2Fossued, setTextInput2Fossued] = useState(false)
    const [show, setShow] = useState(true)

    const [disable, setDisable] = useState(false)

    const textinput1 = useRef(1)
    const textinput2 = useRef(2)

    // Get Data Sign Up
    const [state, setState] = useState({
        no_hp: '',
        nama_depan: '',
        nama_belakang: '',
        email: '',
        password: ''
    })

    const handleOnChangeText = (field, text) => {
        setState({ ...state, [field]: text })
    }

    const [loading, setLoading] = useState(false)

    const SignUp = async () => {
        if (state.no_hp != '' || state.nama_depan != '') {
            setDisable(true)
            createUserWithEmailAndPassword(auth, state.email, state.password)
                .then(async () => {
                    setLoading(true)
                    const docRef = await addDoc(collection(db, "users"), {
                        no_hp: state.no_hp,
                        nama_depan: state.nama_depan,
                        nama_belakang: state.nama_belakang,
                        email: state.email,
                        password: state.password
                    });
                    setLoading(false)
                    //console.log("Document written with ID: ", docRef.id);

                    alert("berhasil sign up")
                    navigation.replace('SignInScreen')
                })
                .catch(error => {
                    if (error.code === "auth/email-already-in-use") {
                        Alert.alert("Email yang anda masukan sudah terdaftar")
                    }
                    else if (error.code === "auth/invalid-email") {
                        Alert.alert("Email yang anda masukan Invalid")
                    }
                })
        }
        else {
            Alert.alert("Invalid")
        }
    }

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: colors.buttons, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        )
    }
    return (

        <SafeAreaView style={styles.container}>
            <Header
                title="Buat Akun"
                type="material-community"
                navigation={navigation}
            />
            <View style={{ marginTop: 10 }}>
                <Text style={title}>
                    Hallo!
                </Text>
            </View>
            <View style={{ justifyContent: "flex-start", paddingHorizontal: 30, marginTop: 10 }}>

                <Text style={{ fontSize: 15, color: colors.grey2 }}>Yuk, Daftar dulu biar bisa masuk</Text>

            </View>
            <View style={{ marginTop: 20 }}>
                <View style={styles.textinput1}>

                    <View style={{ flex: 1 }}>
                        <TextInput
                            placeholder="Nomor Hp kamu yang aktif"
                            // style={styles.input1}
                            keyboardType="number-pad"
                            //autoFocus={true}
                            style={{ width: "100%", padding: 5 }}
                            onChangeText={(text) => handleOnChangeText("no_hp", text)}
                        //value={props.values.phone_number}
                        />
                    </View>
                </View>
                <View style={styles.textinput1}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            placeholder="Nama Depan"
                            style={{ padding: 5, width: "100%" }}
                            autoFocus={false}
                            onChangeText={(text) => handleOnChangeText("nama_depan", text)}
                        //value={props.values.name}
                        />
                    </View>
                </View>
                <View style={styles.textinput1}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            placeholder="Nama Belakang"
                            style={{ width: "100%", padding: 5 }}
                            autoFocus={false}
                            onChangeText={(text) => handleOnChangeText("nama_belakang", text)}
                        //value={props.values.family_name}
                        />
                    </View>
                </View>
                <View style={styles.textinput1}>
                    <View style={{}}>
                        <Icon
                            name="email"
                            type="material"
                            iconStyle={{ color: colors.grey3 }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={{ width: "100%", padding: 5 }}
                            placeholder='Email'
                            ref={textinput1}
                            //value = {email}
                            onChangeText={(text) => handleOnChangeText("email", text)}
                        />
                    </View>
                </View>
                <View style={styles.textinput2}>
                    <Animatable.View animation={textinput2Fossued ? "" : "fadeInLeft"} duration={400}>

                        <Icon
                            name="lock"
                            type="material"
                            iconStyle={{ color: colors.grey3 }}
                        />
                    </Animatable.View>
                    <Animatable.View
                        style={{ flex: 1 }}
                    >
                        <TextInput
                            secureTextEntry={show}
                            style={{ padding: 5, width: "100%" }}
                            placeholder='Password'
                            //value={password}
                            ref={textinput2}
                            onChangeText={(text) => handleOnChangeText("password", text)}
                            onFocus={() => {
                                setTextInput2Fossued(false)
                            }}

                            onBlur={() => {
                                setTextInput2Fossued(true)
                            }}
                        />
                    </Animatable.View>
                    <Animatable.View animation={textinput2Fossued ? "" : "fadeInLeft"} duration={400}>
                        <TouchableOpacity
                            onPress={() => {
                                setShow((prev) => !prev)
                            }}
                        >
                            <Icon
                                name={show ? "eye" : "eye-off"}
                                type="material-community"
                                iconStyle={{ color: colors.grey3 }}
                                style={{ marginRight: 10 }}
                            />
                        </TouchableOpacity>
                    </Animatable.View>
                </View>
            </View>
            <View style={{ marginTop: 10, marginHorizontal: 20, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 11 }}>Dengan membuat dan masuk menggunakan akun anda</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 11 }}>maka setuju dengan  </Text>
                    <Text style={{ textDecorationLine: 'underline', color: 'green', fontSize: 11 }}> Ketentuan & Kondisi</Text>
                    <Text style={{ fontSize: 11 }}> dan </Text>
                </View>
                <Text style={{ textDecorationLine: 'underline', color: 'green', fontSize: 11 }}> Status Privasi</Text>
            </View>
            <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
                <Button
                    disabled={disable}
                    title="Daftar"
                    buttonStyle={{ borderRadius: 10, backgroundColor: colors.buttons }}
                    titleStyle={{ fontWeight: "bold" }}
                    onPress={() => {
                        SignUp()
                        //navigation.navigate("DrawerNavigator")
                        // navigation.navigate("RootClientTab")
                    }}
                />
            </View>

            <View style={{ marginHorizontal: 30, marginTop: 10 }}>
                <Text style={styles.text1}>
                    Sudah Punya Akun?
                </Text>
            </View>
            <View style={{ alignItems: "flex-end", marginHorizontal: 20 }}>
                <Button
                    title="Masuk"
                    buttonStyle={styles.createButton}
                    titleStyle={styles.createButtonTitle}
                    onPress={() => {
                        navigation.navigate('SignInScreen')
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
    },

    text1: {
        color: colors.grey3,
        fontSize: 12
    },

    textinput1: {
        borderWidth: 0.2,
        borderRadius: 10,
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 30,
        marginBottom: 20,
        borderColor: colors.grey3,
        paddingLeft: 10
    },

    textinput2: {
        borderWidth: 0.2,
        borderRadius: 12,
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        marginHorizontal: 30,
        marginBottom: 20,
        borderColor: colors.grey3,
        paddingLeft: 10
    },

    createButton: {
        backgroundColor: "white",
        borderColor: colors.buttons,
        borderWidth: 1,
        borderRadius: 12,
        alignContent: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
        height: 40
    },

    createButtonTitle: {
        color: colors.buttons,
        fontSize: 16,
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        marginTop: -3
    }
});