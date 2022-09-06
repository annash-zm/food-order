import React, { useRef } from 'react';
import {
    Animated,
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Feather } from '@expo/vector-icons'
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Icon } from 'react-native-elements';
import { restaurantsData } from '../global/Data';

import { colors } from '../global/styles'
import FilterSearch from '../components/FilterSearch';



const AnimatedImageBackground = Animated.createAnimatedComponent(
    ImageBackground
);

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function FilterResultScreen({ navigation, route }) {

    const { gambar, nama } = route.params
    // Keeps notches away
    return (
        <SafeAreaProvider>
            <Screen navigation={navigation} gambar={gambar} nama={nama} />
        </SafeAreaProvider>
    );
}

function RenderImage({ gambar, scrollY, insets }) {
    return (
        <AnimatedImageBackground
            source={{ uri: gambar }}
            style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 200,
                zIndex:1,
                transform: [{
                    translateY: scrollY.interpolate({
                        inputRange: [-220, 0, Platform.OS === "ios" ? 170 : 220],
                        outputRange: [170, 0, insets.top - 250],
                        extrapolate: "clamp"
                    }),   
                },{
                    scale: scrollY.interpolate({
                        inputRange:[-80,0],
                        outputRange:[2,1],
                        extrapolate:"clamp",
                    })
                }]
            }}
        >
            <AnimatedBlurView
                tint="light"
                intensity={96}

                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: "white",
                    opacity: scrollY.interpolate({
                        inputRange: [0, 170],
                        outputRange: [0, 1],
                    }),
                }}
            />
        </AnimatedImageBackground>
    )
}

function RenderArrowIcon({ navigation, insets }) {
    return (
        <View
            style={{
                zIndex:2,
                position: "absolute",
                left: 20,
                top: insets.top + 6
            }}
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <View
                    style={{
                        backgroundColor: "white",
                        alignItems: "center",
                        borderRadius: 20,
                        padding: 5
                    }}
                >
                    <Icon
                        type='material-community'
                        name='arrow-left'
                        size={25}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

function RenderTitle({ nama, scrollY, insets }) {
    return (
        <Animated.View
            style={{
                zIndex:2,
                position: "absolute",
                top: 200,
                backgroundColor:"white",
                width:"100%",
                transform: [{
                    translateX: scrollY.interpolate({
                        inputRange: [0, 170],
                        outputRange: [0, 40],
                        extrapolate: "clamp"
                    }),
                },
                {
                    translateY: scrollY.interpolate({
                        inputRange: [-220, 0, Platform.OS === "ios" ? 160 : 200],
                        outputRange: [220, 0, insets.top - 200],
                        extrapolate: "clamp"
                    })
                }],
            }}
        >
            <View style={{ paddingHorizontal: 20, paddingVertical: 10, marginBottom:10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom:5 }}>{nama}</Text>
                <Text style={{ fontSize: 13 }}>Makanan yang kamu mau udah dikumpulin nih !</Text>
            </View>
        </Animated.View>
    )
}

function RenderFilter({ scrollY, insets }) {
    return (
        <Animated.View
            style={{
                zIndex:2,
                position: "absolute",
                top: 270,
                width: "100%",
                backgroundColor:"white",
                transform: [{
                    translateY: scrollY.interpolate({
                        inputRange: [-220, 0, Platform.OS === "ios" ? 160 : 200],
                        outputRange: [220, 0, insets.top - 200],
                        extrapolate: "clamp"
                    })
                }]
            }}
        >
            <View style={{ paddingLeft: 20, paddingTop: 5 }}>
                <FilterSearch />
            </View>
        </Animated.View>
    )
}

function RenderData() {
    return (
        <>
            {
                restaurantsData.map((item, index) => (
                    <View style={{ marginBottom: 30}} key={index}>
                        <TouchableWithoutFeedback

                            onPress={() => {

                            }}
                        >
                            <View style={{ flexDirection: "row", justifyContent:"space-between" }}>
                                <Image
                                    source={{ uri: item.images }}
                                    style={{ width: 90, height: 90 }}
                                    borderRadius={10}
                                />
                                <View style={{flex:1, marginLeft: 10, flexDirection: "column", justifyContent: "space-between" }}>
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
                                <Icon
                                    type='material-community'
                                    name='heart-circle'
                                    color="red"
                                    size={17}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                ))
            }
        </>
    )
}

function Screen({ navigation, gambar, nama }) {
    const insets = useSafeAreaInsets();
    const scrollY = useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    marginTop:insets.top,
                    left: 0,
                    right: 0,
                    height: 115,
                    backgroundColor: "white",
                    opacity: scrollY.interpolate({
                        inputRange: [0, 170],
                        outputRange: [0, 1]
                    })
                }}
            />
            <Animated.ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >

                <View style={{ paddingHorizontal: 20, marginTop: Platform.OS==="ios" ? 175 : 215 }}>
                    <RenderData />
                    <RenderData />
                </View>
            </Animated.ScrollView>

            {/* <View style={{ position: "absolute", top: 0, left: 0, right: 0, backgroundColor: "white", height: 100 }} /> */}
            
            <RenderTitle nama={nama} scrollY={scrollY} insets={insets} />
            <RenderFilter scrollY={scrollY} insets={insets} />
            <RenderImage gambar={gambar} scrollY={scrollY} insets={insets} />
            <RenderArrowIcon navigation={navigation} insets={insets} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },

});