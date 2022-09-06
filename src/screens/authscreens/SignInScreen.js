import React, { useState, useRef, useEffect } from 'react'

import {
    View, Text, StyleSheet, Dimensions,
    TextInput, Alert, LogBox, AsyncStorage, ActivityIndicator, ImageBackground,
    ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform, SafeAreaView, useWindowDimensions
} from 'react-native'

import Header from '../../components/Header'
import { colors, parameters, title } from '../../global/styles'
import { Icon, Button, SocialIcon } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
    signInWithEmailAndPassword
} from 'firebase/auth'
import { auth, db } from '../../firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { isValidEmail } from '../../global/styles'

LogBox.ignoreAllLogs()

export default function Signinscreen({ navigation }) {

    const dimension = useWindowDimensions()


    //state for login
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [lihat, setLihat] = useState(true)

    const [valid, setValid] = useState()
    const [iconValid, setIconValid] = useState(false)

    //loading
    const [loading, setLoading] = useState(false)

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                setLoading(true)
                const user = userCredential.user;
                await AsyncStorage.setItem('isLoggedIn', '1')
                await AsyncStorage.setItem('email', user.email)
                try {
                    const q = query(collection(db, "users"), where("email", "==", user.email))
                    const ambil = await getDocs(q)
                    ambil.forEach(async (doc) => {
                        const simpan_nama = doc.data().nama_depan
                        const no_hp = doc.data().no_hp
                        await AsyncStorage.setItem("simpanNama", simpan_nama)
                        await AsyncStorage.setItem("simpanHp", no_hp)
                    })
                }
                catch (error) {

                }
                setLoading(false)
                navigation.navigate("DrawerNavigator")
                Alert.alert("Anda Berhasil Sign In")
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    return (
        <KeyboardAwareScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <Image
                        source={{ uri: "https://img.freepik.com/free-vector/online-groceries-concept-illustration_114360-1786.jpg?w=740&t=st=1650554980~exp=1650555580~hmac=ced0a40b3c37f73513f65dd717fb6cf2f3982ce4eeb58853fe154936ea524b78" }}
                        style={{ width: dimension.width * 0.6, height: dimension.width * 0.6 }}
                        resizeMode="contain"
                    />
                </View>

                <View style={{ paddingHorizontal: 30, paddingTop: 30 }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 5, color: colors.buttons }}>Hallo!</Text>
                    <Text style={{ color: colors.grey3 }}>Yuk, masuk dulu buat pesen makananmu</Text>

                    <View style={{ marginTop: 40 }}>
                        <View style={{ marginBottom: 20 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontWeight: "bold", fontSize: 14, marginBottom: 10 }}>Masukin Email</Text>
                                {!valid && iconValid ?
                                    <Text style={{ color: "red", fontSize: 12 }}>Invalid Email!</Text> : null
                                }
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                borderWidth: iconValid && !valid ? 1 : 0.2,
                                borderColor: iconValid && !valid ? "red" : "black",
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                //backgroundColor:iconValid && !valid ? "#FFE6E8" : null
                            }}>
                                <Icon
                                    type='material-community'
                                    name='email-outline'
                                    color={colors.grey3}
                                    size={22}
                                />
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder='Ketik di sini'
                                    placeholderTextColor={colors.grey3}
                                    autoFocus={false}
                                    keyboardType="email-address"
                                    style={{ paddingVertical: Platform.OS === "ios" ? 15 : 5, paddingHorizontal:5, flex: 1 }}
                                    onChangeText={(text) => {
                                        setEmail(text)
                                        setValid(isValidEmail(text))
                                        if (text.length > 0) {
                                            setIconValid(true)
                                        }
                                        else {
                                            setIconValid(false)
                                        }
                                    }}
                                />
                                {iconValid &&
                                    <Icon
                                        type='material-community'
                                        name={valid ? 'check-circle-outline' : "alert-circle-outline"}
                                        color={valid ? "green" : "red"}
                                    />
                                }
                            </View>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontWeight: "bold", fontSize: 14, marginBottom: 10 }}>Kata Sandi</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderWidth: 0.2,
                                borderRadius: 10,
                                paddingHorizontal: 10
                            }}>
                                <Icon
                                    type='material-community'
                                    name='lock-outline'
                                    color={colors.grey3}
                                    size={22}
                                />
                                <TextInput
                                    placeholder='Ketik di sini'
                                    placeholderTextColor={colors.grey3} 
                                    secureTextEntry={lihat}
                                    autoCapitalize="none"
                                    autoFocus={false}
                                    style={{ paddingHorizontal:5,paddingVertical: Platform.OS === "ios" ? 15 : 5, flex: 1 }}
                                    onChangeText={(text) => {
                                        setPassword(text)
                                    }}
                                    
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        setLihat(ubah => !ubah)
                                    }}
                                >
                                    <Icon
                                        type='material-community'
                                        name={lihat ? "eye" : "eye-off"}
                                        color={colors.grey3}
                                        size={22}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ alignSelf: "flex-end", marginBottom: 20 }}>
                            <Text style={{ color: colors.buttons, textDecorationLine: "underline" }}>Lupa Password ?</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                handleSignIn()
                            }}
                        >
                            <View style={{ alignItems: "center", borderRadius: 10, padding: 10, backgroundColor: colors.buttons }}>
                                {loading ?
                                    <ActivityIndicator color="white" size="small" /> :
                                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Masuk</Text>
                                }
                            </View>
                        </TouchableOpacity>

                        <View style={{ marginTop: 35 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", alignSelf:"center"}}>
                                <View style={{borderBottomWidth:1,borderColor:colors.grey4, width:"25%"}} />
                                <Text style={{ color: colors.grey3, marginHorizontal:10 }}>atau masuk dengan</Text>
                                <View style={{ borderBottomWidth: 1,borderColor:colors.grey4, width:"25%" }} />
                            </View>
                            <View style={{ flexDirection: "row", alignSelf:"center", marginTop:10 }}>
                                <View style={{ flexDirection: "row", padding: 5, alignItems: "center", justifyContent: "center", borderWidth: 0.2, marginTop: 10, borderRadius: 20 }}>
                                    <Image
                                        source={{ uri: "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" }}
                                        style={{ width: 25, height: 25 }}
                                    />
                                    {/* <Text style={{ marginLeft: 3, fontWeight: "bold", color: colors.grey2 }}> Google</Text> */}
                                </View>

                                <View style={{ marginLeft: 10, flexDirection: "row", padding: 5, alignItems: "center", justifyContent: "center", borderWidth: 0.2, marginTop: 10, borderRadius: 20, backgroundColor: "#3b5998" }}>
                                    <Icon
                                        type='material-community'
                                        name='facebook'
                                        color="white"
                                        size={25}
                                    />
                                    {/* <Text style={{ marginLeft: 3, fontWeight: "bold", color: "white" }}>Facebook</Text> */}
                                </View>

                                <View style={{ marginLeft: 10, flexDirection: "row", padding: 5, alignItems: "center", justifyContent: "center", borderWidth: 0.2, marginTop: 10, borderRadius: 20, backgroundColor: "black" }}>
                                    <Icon
                                        type='material-community'
                                        name='apple'
                                        color="white"
                                        size={25}
                                    />
                                    {/* <Text style={{ marginLeft: 3, fontWeight: "bold", color: "white" }}>Apple</Text> */}
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 40, alignItems: "center", marginBottom: 40 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontWeight: "bold" }}>Belum punya akun?</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("SignUpScreen")
                                    }}
                                >
                                    <Text style={{ marginLeft: 10, color: colors.buttons }}>Daftar disini</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView>
            </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
    },

    textInput: {
        borderBottomWidth: 1,
        borderColor: colors.buttons,
        //padding:10, 
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-between",
        height: 50,
        marginBottom: 20
    }

});