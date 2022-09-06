import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Avatar, Icon } from 'react-native-elements'

import { Actions, Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat"
import { colors } from '../global/styles'


const ChatScreen = ({ navigation }) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Pesanan sesuai aplikasi ya mba?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://scontent-cgk1-1.xx.fbcdn.net/v/t1.6435-9/205032573_1428823244149232_7145023937067423142_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=174925&_nc_eui2=AeFoqpk1Im6t2xJHw11SuFFFTQKTirjevN9NApOKuN6830_xqEm54j7N_a_MqMRAiHmpZPcfOvioCNAwHG0cwqBL&_nc_ohc=PlHnL7H09lkAX_sBVLJ&_nc_ht=scontent-cgk1-1.xx&oh=00_AT_vuqMT0uwq7YCe9vzFqlIddQ0bs8OGyY29vIOMG3AyIg&oe=62622C23',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    function handlePhotoPicker() {
        alert("ok")
    }

    function renderHeader() {
        return (
            <SafeAreaView style={styles.header}>
                <View style={styles.headerChild}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Icon
                            type='material-community'
                            name='arrow-left'
                        />
                    </TouchableWithoutFeedback>
                    <View style={{ flex: 1, marginLeft: 10, flexDirection: "row", alignItems: "center" }}>
                        <Avatar
                            rounded
                            source={require("../assets/pp/pp.jpg")}
                            size={40}
                        />
                        <View style={{marginLeft:10}}>
                            <Text style={{ fontWeight: "bold" }}>Annash ZM</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Icon
                                    type='material-community'
                                    name='circle'
                                    color="green"
                                    size={10}
                                />
                                <Text style={{ marginLeft:5, fontSize: 12 }}>Online</Text>
                            </View>
                        </View>

                    </View>
                    <Icon
                        type='material-community'
                        name='phone-outline'
                    />
                </View>
            </SafeAreaView>
        )
    }
    return (
        <ImageBackground
            source={{ uri: "https://i.pinimg.com/564x/39/cf/bc/39cfbc81276720ddf5003854e42c2769.jpg" }}
            style={styles.container}
        >
            {renderHeader()}
            {/* <View
                style={
                    {
                        position:"absolute",
                        bottom : 0,
                        left : 0,
                        right: 0,
                        height:Dimensions.get("window").height*0.1,
                        backgroundColor:"gray"
                    }
                }
            >

            </View> */}
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}

                renderAvatar={null}

                renderActions={(props) => (
                    <Actions
                        {...props}
                        containerStyle={{
                            marginRight:5,
                            bottom:2
                        }}
                        onPressActionButton={handlePhotoPicker}
                        icon={() => (
                            <Icon
                                type='material-community'
                                name='camera'
                                color={colors.grey3}
                                size={28}
                            />
                        )}
                    />
                )}

                bottomOffset={26}

                renderSend={(props) => {
                    const { text, messageIdGenerator, user, onSend } = props;
                    return (
                        <TouchableOpacity
                            style={{
                                marginRight:10,
                                bottom:10,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            onPress={() => {
                                if (text && onSend) {
                                    onSend({
                                        text: text.trim(),
                                        user,
                                        _id: messageIdGenerator()
                                    }, true)
                                }
                            }}
                        >
                            <Icon
                                type='material-community'
                                name='send-circle'
                                color={colors.buttons}
                                size={30}
                            />
                        </TouchableOpacity>
                    )
                }}

                renderInputToolbar={(props) => (
                    <InputToolbar
                        {...props}
                        containerStyle={{
                            borderRadius: 20,
                            marginHorizontal: 20,
                            paddingTop: 5,
                            borderTopWidth: 0,
                        }}
                    />
                )}
                renderBubble={(props) => (
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            left: {
                                backgroundColor: "white"
                            },
                            right: {
                                backgroundColor: colors.buttons
                            }
                        }}
                    />
                )}
                alignTop={true}
                messagesContainerStyle={{marginHorizontal:10}}
            />

        </ImageBackground>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: "white",
        paddingHorizontal: 10
    },
    headerChild: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})