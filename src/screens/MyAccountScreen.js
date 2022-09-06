import {
  StyleSheet, Text, View, ScrollView, Dimensions,
  ImageBackground, AsyncStorage, TouchableOpacity, Alert, SafeAreaView
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors, screen_scale } from '../global/styles'
import { Avatar, Icon, SocialIcon } from 'react-native-elements'
import { settingScreen } from '../global/Data'
import { auth } from '../firebase/firebase'
import { AppContext } from '../context/app-context'

const MyAccountScreen = ({ navigation }) => {

  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [hp, setHp] = useState('')

  const ambil = async () => {
    const val = await AsyncStorage.getItem('email')
    setEmail(val)
    const val2 = await AsyncStorage.getItem("simpanNama")
    setNama(val2)
    const val3 = await AsyncStorage.getItem("simpanHp")
    setHp(val3)
  }

  const handleSignOut = async () => {
    auth
      .signOut()
      .then(() => {
        Alert.alert(
          "Sign Out",
          "Apakah Anda yakin untuk keluar ?",
          [
            {
              text: "Batal",
              //onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "OK", onPress: async () => {
                await AsyncStorage.removeItem('isLoggedIn')
                await AsyncStorage.removeItem('email')
                await AsyncStorage.removeItem('simpanNama')
                await AsyncStorage.removeItem('simpanHp')
                navigation.replace('SignInScreen')
              }
            }
          ]
        );

      })
      .catch(error => alert(error.message))
  }

  const context = useContext(AppContext)

  useEffect(() => {
    ambil()
  }, [])

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: context.darkTheme ? "black" : "white", }}
    >
      <View style={{borderBottomWidth:0.2, borderBottomColor:colors.grey4}}>
        <View style={{ borderColor: colors.grey3, padding: 10, backgroundColor: context.darkTheme ? "black" : "white", flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ alignItems: "flex-start", marginLeft: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: context.darkTheme ? "white" : "black" }}>My Account</Text>
          </View>
          <Icon
            type='material-community'
            name="account-edit-outline"
            size={25}
            iconStyle={{
              alignItems: "flex-start", marginHorizontal: 20,
              color: context.darkTheme ? "white" : "black"
            }}
          />
        </View>
      </View>
      <ScrollView>
        <View style={{marginTop:20}}>
          <View
            style={styles.header}
          >

            <View style={styles.avatarPosition}>

              <Avatar
                rounded
                avatarStyle={styles.avatar}
                source={require("../assets/pp/pp.jpg")}
                size={80}
              >
                <Avatar.Accessory
                  size={30}
                  onPress={() => {

                  }}
                />
              </Avatar>

              <View style={{ marginHorizontal: 20, justifyContent: "center" }}>
                <Text style={{ ...styles.nama, color: context.darkTheme ? "white" : "black" }}>{nama}</Text>
                <Text style={{ fontSize: 12, color: colors.grey2, marginTop: 5 }}>Mobile Developer</Text>
              </View>
            </View>
            <View style={{ marginTop: 30, marginHorizontal: 35, justifyContent: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Icon
                  type='material-community'
                  name='phone'
                  size={15}
                  color={colors.grey2}
                />
                <Text style={{ fontSize: 14, color: colors.grey2, marginBottom: 10, marginLeft: 10 }}>{hp}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Icon
                  type='material-community'
                  name='email-outline'
                  size={15}
                  color={colors.grey2}
                />
                <Text style={{ marginLeft: 10, fontSize: 14, color: colors.grey2 }}>{email}</Text>
              </View>
            </View>
            <View style={{ marginLeft:30,marginRight:10,marginTop: 30, flexDirection: "row", justifyContent: "space-between" }}>
              <View style={styles.box}>
                <Text style={{ marginBottom: 10, fontWeight: "bold", color: !context.darkTheme ? "black" : "white" }}>Rp. 100.000</Text>
                <View style={{ flexDirection: "row", alignItems:"center" }}>
                  <Icon
                    type='material-community'
                    name='wallet-outline'
                    size={16}
                    color={!context.darkTheme ? "black" : "white"}
                  />
                  <Text style={{ marginLeft: 5, color: !context.darkTheme ? "black" : "white" }}>Saldo</Text>
                </View>
              </View>
              <View style={styles.box}>
                <Text style={{ marginBottom: 10, fontWeight: "bold", color: !context.darkTheme ? "black" : "white" }}>25</Text>
                <View style={{ flexDirection: "row", alignItems:"center" }}>
                  <Icon
                    type='material-community'
                    name='clipboard-text-outline'
                    size={16}
                    color={!context.darkTheme ? "black" : "white"}
                  />
                  <Text style={{ marginLeft: 5, color: !context.darkTheme ? "black" : "white" }}>Orders</Text>
                </View>
              </View>
              <View style={styles.box}>
                <Text style={{ marginBottom: 10, fontWeight: "bold", color: !context.darkTheme ? "black" : "white" }}>3</Text>
                <View style={{ flexDirection: "row", alignItems:"center" }}>
                  <Icon
                    type='material-community'
                    name='ticket-percent-outline'
                    size={16}
                    color={!context.darkTheme ? "black" : "white"}
                  />
                  <Text style={{ marginLeft: 5, color: !context.darkTheme ? "black" : "white" }}>Voucher</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: context.darkTheme ? "black" : "white" }}>
            <View style={{ backgroundColor: context.darkTheme ? "black" : "white", marginVertical: 5 }}>
              {settingScreen.map((item, index) => (
                <TouchableOpacity key={index}>
                  <View style={styles.list}>
                    <Icon
                      type='material-community'
                      name={item.icon}
                      size={20}
                      color={colors.buttons}
                      style={{ marginLeft: 20, justifyContent: "center", alignItems: "center" }}
                    />
                    <Text style={styles.preferences}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => {
                  handleSignOut()
                }}
              >
                <View style={{ borderTopWidth: 1, borderColor: colors.grey5 }}></View>
                <View style={{
                  height: 60,
                  alignItems: "center",
                  flexDirection: "row",
                  marginHorizontal: 10,
                }}>
                  <Icon
                    type='material-community'
                    name='logout-variant'
                    size={20}
                    color={colors.buttons}
                    style={{ marginLeft: 20, justifyContent: "center", alignItems: "center" }}
                  />
                  <Text style={{ ...styles.preferences, color: colors.buttons }}>Sign Out</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MyAccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    //height: Dimensions.get("window").height / 2.8,
    //backgroundColor: colors.buttons
  },
  preferences: {
    fontSize: 13,
    paddingLeft: 20,
    fontWeight: "bold",
    color: colors.grey2
  },
  avatar: {
    borderWidth: 1,
    borderColor: colors.grey5

  },
  box: {
    flex: 1,
    height: 70,
    borderWidth:0.2,
    borderColor:colors.grey3,
    marginRight:10,
    borderRadius:10,
    justifyContent: "center",
    alignItems: "center"
  },
  list: {
    height: 60,
    // borderBottomWidth: 0.9,
    // borderBottomColor: colors.grey5,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10

  },
  avatarPosition: {
    marginLeft: 30,
    flexDirection: "row",

    //backgroundColor:'rgba(52, 52, 52,0.3)'
  },
  nama: {
    fontWeight: "bold",
    fontSize: 18
  },
})