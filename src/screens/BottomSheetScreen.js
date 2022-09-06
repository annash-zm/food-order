import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useRef, useMemo, useCallback } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { Icon } from 'react-native-elements'
import { colors } from '../global/styles'

const BottomSheetScreen = () => {
    const bottomSheetRef = useRef(null)

    const dimension = useWindowDimensions()

    // variables
    const snapPoints = ["40%"]

    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
            >
                <Icon 
                    type='material-community'
                    name='arrow-left'
                />
                <BottomSheetView>
                    <Text>Hello</Text>
                </BottomSheetView>
            </BottomSheet>
            
        </View>
    )
}

export default BottomSheetScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
})