import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { filterSearch } from '../global/Data'
import { Icon } from 'react-native-elements'
import { colors } from '../global/styles'

const FilterSearch = () => {
    return (
        <View style={{  flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: "row", padding: 5, borderColor:colors.grey3, borderWidth: 0.2, borderRadius: 20, marginRight: 10 }}>
                <Icon
                    type='material-community'
                    name='tune'
                    size={18}
                />
                <Text>Filter</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {filterSearch.map((item, idx) => (
                    <View key={idx} style={{ 
                        flexDirection: "row", 
                        alignItems:"center" ,
                        padding: 5, 
                        borderWidth: 0.2, 
                        borderRadius: 20, 
                        marginRight: 10,
                        borderColor:colors.grey3 
                    }}>
                        <Icon
                            type='material-community'
                            name={item.icon}
                            size={15}
                            iconStyle={{marginRight:5}}
                        />
                        <Text style={{}}>{item.nama}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default FilterSearch

const styles = StyleSheet.create({

})