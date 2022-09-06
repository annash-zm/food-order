import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../global/styles'

import Ionicons from 'react-native-vector-icons/Ionicons';

const StarRating = (props) => {

    // This array will contain our star tags. We will include this
    // array between the view tag.
    let stars = [];
    let warna = '#FF8C00';
    // Loop 5 times
    for (var i = 1; i <= 5; i++) {
        // set the path to filled stars
        let name = 'ios-star';
        // If ratings is lower, set the path to unfilled stars
        if (i > props.ratings) {
            warna = colors.grey4;
        }

        stars.push((<Ionicons name={name} size={17} style={{color:warna}} key={i} />));
    }

    return (
        <View style={ styles.container }>
            { stars }
            <Text style={styles.text}>{props.reviews}</Text>
        </View>
    );
	
}

export default StarRating;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	// star: {
	// 	color: '#FF8C00'
	// },
	text: {
		fontSize: 12,
        marginLeft: 5,
        color: '#444',
	}
});