import { StyleSheet, Text, View, Image, FlatList, Animated } from 'react-native'
import React, { useState, useRef } from 'react'

import { Icon, Button, SocialIcon } from 'react-native-elements'
import { colors, parameters, title } from '../../global/styles'
import { slides } from '../../global/styles'
import OnboardingItem from '../../components/OnboardingItem'
import Paginator from '../../components/Paginator'
import NextButton from '../../components/NextButton'


export default function SignInWelcomeScreen({ navigation }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

    const scrollTo = ()=>{
        if (currentIndex<slides.length-1){
            slidesRef.current.scrollToIndex({index:currentIndex+1})
        }
        else{
            navigation.navigate("SignInScreen")
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    horizontal
                    data={slides}
                    renderItem={({ item }) => <OnboardingItem item={item} />}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
            <Paginator data={slides} scrollX={scrollX} />
            <NextButton scrollTo={scrollTo} percentage={(currentIndex+1)*(100/slides.length)} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"white"
    },
    createButton: {
        backgroundColor: "white",
        borderColor: colors.buttons,
        borderWidth: 1,
        borderRadius: 12,
        alignContent: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        height: 40
    },

    createButtonTitle: {
        color: colors.grey1,
        fontSize: 16,
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        marginTop: -3
    }

})