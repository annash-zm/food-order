import {
    StyleSheet, Text, View,
    TouchableWithoutFeedback, Modal, TouchableOpacity, FlatList, Image, ScrollView, Keyboard
} from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { colors } from '../global/styles'
import { Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import { restaurantsData } from '../global/Data'
import { AppContext } from '../context/app-context'

import filter from 'lodash/filter'

const SearchComponent = () => {
    const navigation = useNavigation()
    const [data, setData] = useState([...restaurantsData])
    const [modalVisible, setModalVisible] = useState(false)
    const textInput = useRef(0)
    const [cari, setCari] = useState("")

    const [click, setClick] = useState(false)
    const context = useContext(AppContext)
    const contains = ({ restaurantName }, query) => {
        if (restaurantName.includes(query)) {
            return true
        }
        return false
    }

    const handleSearch = text => {
        const dataS = filter(restaurantsData, userSearch => {
            return contains(userSearch, text)
        })
        if (text != '') {
            setModalVisible(true)
        }
        else {
            setModalVisible(false)
        }
        setCari(text)
        setData([...dataS])
    }



    return (
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            <View style={{
                padding: 5,
                borderWidth: 1,
                borderRadius: 10,
                flexDirection: "row",
                borderColor: click ? "black" : colors.grey4,
                justifyContent: "space-between"
            }}>
                {click ?
                    <TouchableWithoutFeedback
                        onPress={() => {
                            Keyboard.dismiss()
                            setClick(false)
                            setModalVisible(false)
                        }}
                    >
                        <Icon
                            type='material-community'
                            name='arrow-left'
                            color={colors.grey3}
                        />
                    </TouchableWithoutFeedback> :
                    <Icon
                        type='material'
                        name='search'
                        color={colors.grey3}
                    />
                }
                <TextInput
                    placeholder="Mau makan apa?"
                    placeholderTextColor={colors.grey3}
                    //autoFocus={true}
                    ref={textInput}
                    style={{ flex: 1, marginLeft: 5, fontSize: 16 }}
                    onChangeText={handleSearch}
                    onFocus={() => {
                        setClick(true)
                    }}
                />
                {click &&
                    <TouchableWithoutFeedback
                        onPress={() => {
                            Keyboard.dismiss()
                            textInput.current.clear()
                            setModalVisible(false)
                            setClick(false)
                        }}
                    >
                        <Icon
                            type='material-community'
                            name='close-circle'
                            color={colors.grey3}
                        />
                    </TouchableWithoutFeedback>
                }
            </View>

            {modalVisible &&
                <View style={{ marginTop: 20, borderBottomWidth: 0.5, paddingBottom: 20, borderColor: colors.grey4 }}>
                    {data.length > 0 ?
                        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Resto "{cari}" Sesuai yang kamu cari</Text> :
                        <Text>Makanan "{cari}" yang kamu cari nggak ketemu</Text>
                    }

                    <ScrollView>
                        {data.map((item, index) => (
                            <View style={{ marginBottom: 20 }} key={index}>
                                <TouchableWithoutFeedback

                                    onPress={() => {
                                        context.setRefresh(true)
                                        context.setTampungCari([...context.tampungCari, {
                                            nama: cari
                                        }])
                                        textInput.current.clear()
                                        setModalVisible(false)
                                        setClick(false)
                                        navigation.navigate("DetailRestoScreen", { id: item.id })
                                    }}
                                >
                                    <View style={{ flexDirection: "row" }}>
                                        <Image
                                            source={{ uri: item.images }}
                                            style={{ width: 90, height: 90 }}
                                            borderRadius={10}
                                        />
                                        <View style={{ marginLeft: 10, flexDirection: "column", justifyContent: "space-between" }}>

                                            <Text style={{ fontWeight: "bold" }}>{item.restaurantName}</Text>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 12 }}>{item.foodType}</Text>
                                            </View>
                                            <View style={{ marginBottom: 5, flexDirection: "row" }}>
                                                <Icon
                                                    type='material-community'
                                                    name='motorbike'
                                                    size={16}
                                                    color={colors.buttons}
                                                />
                                                <Text style={{ fontSize: 12, marginLeft: 5 }}>Diantar dalam {item.deliveryTime} min
                                                    <Text style={{ color: colors.grey3 }}>. {item.farAway} km</Text>
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Icon
                                                    type='material-community'
                                                    name='star'
                                                    size={16}
                                                    color={colors.star}
                                                />
                                                <Text style={{ fontSize: 12, marginLeft: 5, fontWeight: "bold" }}>{item.averageReview}
                                                    <Text style={{ fontWeight: "bold" }}>. {item.numberOfReview}++ Rating</Text>
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            }


        </View >
    )
}

export default SearchComponent

const styles = StyleSheet.create({
    container: {
        flex: 1
    },


})