/**
 * 全屏 Loaging
 */

import React, { Component } from 'react';
import {
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class extends Component {
    render() {
        return (
            <View style={styles.loading}>
                <Text>
                    Loading...
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
})