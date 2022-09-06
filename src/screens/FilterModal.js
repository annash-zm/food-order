import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
    Dimensions, Animated
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../global/styles'
import { Icon } from 'react-native-elements'
import { filterData } from '../global/Data'

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
const FilterModal = ({ isVisible, isClose }) => {

    const modalAnimatedValue = useRef(new Animated.Value(0)).current

    const [showFilterModal, setShowFilterModal] = useState(isVisible)

    
    useEffect(() => {
        if (showFilterModal) {
            Animated.spring(modalAnimatedValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false
            }).start(() => isClose())
        }
    }, [showFilterModal])

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [height, height - 600]
    })


    const delivery = [{ id: 0, name: "10 mins" }, { id: 1, name: "20 mins" }, { id: 2, name: "30 mins" }]
    const [idx, setIdx] = useState(0)

    const rating = [{ id: 0, name: "1" }, { id: 1, name: "2" }, { id: 2, name: "3" }, { id: 3, name: "4" }, { id: 4, name: "5" }]
    const [idx1, setIdx1] = useState(4)

    const [idx2, setIdx2] = useState("0")

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={isVisible}
        >
            
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(10, 10, 10,0.7)'
            }}>
                <TouchableWithoutFeedback
                    onPress={() =>
                        setShowFilterModal(false)
                    }
                >
                    <View style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}>

                    </View>

                </TouchableWithoutFeedback>
                <Animated.View
                    style={{
                        position: "absolute",
                        left: 0,
                        top: modalY,
                        width: "100%",
                        height: "100%",
                        padding: 5,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: colors.cardbackground,
                    }}
                >
                    

                    <View style={{ paddingHorizontal: 10, marginTop: 10, }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <Text style={{ fontWeight: "bold" }}>Filter Your Search</Text>
                            <TouchableWithoutFeedback
                                onPress={() =>
                                    setShowFilterModal(false)
                                }
                            >
                                <Icon
                                    type='material-community'
                                    name='close-circle-outline'
                                    size={22}
                                />
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={{ marginTop: 40 }}>
                            <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Delivery Time</Text>
                            <View style={{ flexDirection: "row" }}>
                                {delivery.map((item, index) => (
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            setIdx(item.id)
                                        }}
                                        key={index}
                                    >
                                        <View style={{
                                            ...styles.deliveryButton,
                                            backgroundColor: idx === item.id ? colors.buttons : "white"
                                        }}>
                                            <Text style={{ fontWeight: "bold", color: idx === item.id ? "white" : colors.grey2 }}>{item.name}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                ))}
                            </View>
                        </View>

                        <View style={{ marginTop: 40 }}>
                            <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Rating</Text>
                            <View style={{ flexDirection: "row" }}>
                                {rating.map((item, index) => (
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            setIdx1(item.id)
                                        }}

                                        key={index}
                                    >
                                        <View style={{
                                            ...styles.ratingButton, flexDirection: "row",
                                            backgroundColor: idx1 === item.id ? colors.buttons : "white"
                                        }}>
                                            <Text style={{ color: idx1 === item.id ? "white" : colors.grey2, fontWeight: "bold" }}>{item.name}</Text>
                                            <Icon
                                                type='material-community'
                                                name='star'
                                                size={15}
                                                color={idx1 === item.id ? "white" : colors.grey3}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                ))}
                            </View>
                        </View>

                        <View style={{ marginTop: 40 }}>
                            <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Tags</Text>
                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                {filterData.map((item, index) => (
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            setIdx2(item.id)
                                        }}

                                        key={index}
                                    >
                                        <View style={{
                                            ...styles.tagsButton, flexDirection: "row",
                                            backgroundColor: idx2 === item.id ? colors.buttons : "white"
                                        }}>
                                            <Text style={{ color: idx2 === item.id ? "white" : colors.grey2, fontWeight: "bold" }}>{item.name}</Text>

                                        </View>
                                    </TouchableWithoutFeedback>
                                ))}
                            </View>
                        </View>

                        <View style={{ marginTop: 40 }}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    
                                }}

                            >
                                <View style={{
                                    ...styles.applyButton,
                                }}>
                                    <Text style={{ color: "white", fontWeight: "bold" }}>Apply Filter</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

export default FilterModal

const styles = StyleSheet.create({
    deliveryButton: {
        borderWidth: 0.4,
        padding: 10,
        marginRight: 30,
        borderRadius: 10,
        borderColor: colors.grey4,
        width: Dimensions.get("window").width * 0.25,
        alignItems: "center"
    },
    ratingButton: {
        borderWidth: 0.4,
        padding: 10,
        marginRight: 20,
        borderRadius: 10,
        borderColor: colors.grey4,
        width: Dimensions.get("window").width * 0.14,
        alignItems: "center"
    },
    tagsButton: {
        borderWidth: 0.4,
        padding: 10,
        marginRight: 20,
        borderRadius: 10,
        borderColor: colors.grey4,
        alignItems: "center",
        marginBottom: 10
    },
    applyButton :{
        borderWidth: 0.4,
        padding: 10,
        marginRight: 20,
        borderRadius: 10,
        borderColor: colors.grey4,
        alignItems: "center",
        width:"100%",
        marginBottom: 10,
        backgroundColor:colors.buttons
    }
})