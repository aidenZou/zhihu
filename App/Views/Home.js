/**
 * Home 首页
 */

import React, { Component } from 'react';
import {
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Swiper from 'react-native-swiper';
import LoadingFull from '../Components/Loading/Full'

var API_URL = 'http://news-at.zhihu.com/api/4/news/latest';
var REQUEST_URL = API_URL;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            top_stories: null,
            stories: new ListView.DataSource({
                // rowHasChanged: (row1, row2) => row1 !== row2,
                rowHasChanged: (row1, row2) => row1.id !== row2.id,
            }),
            loaded: false,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                this.setState({
                    date: responseData.date,
                    top_stories: responseData.top_stories,
                    stories: this.state.stories.cloneWithRows(responseData.stories),
                    loaded: true,
                });
            })
            .done();
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <View style={{ flex: 1 }}>
                {this.renderSwiper() }
                <ListView
                    dataSource={this.state.stories}
                    renderRow={this.renderItem}
                    style={styles.listView}
                    />
            </View>
        )
    }

    renderLoadingView() {
        return (
            <LoadingFull />
        );
    }

    renderItem(item) {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
                <Image
                    source={{ uri: item.images[0] }}
                    style={styles.img}
                    />
            </View>
        );
    }

    renderSwiper() {
        return (
            <Swiper style={styles.wrapper} height={220}
                dot={<View style={{ backgroundColor: 'rgba(255,255,255,.3)', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4, }} />}
                activeDot={<View style={{ backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4 }} />}
                paginationStyle={{
                    bottom: 10,
                }}
                loop={true}>
                {
                    this.state.top_stories.map((item, key) => {
                        return this.renderSwiperView(item, key)
                    })
                }
            </Swiper>
        )
    }

    renderSwiperView(item, key) {
        return (
            <View key={item.id} style={styles.slide}>
                <Image style={styles.image} source={{ uri: item.image }} />
                <View style={styles.slideTextContainer}>
                    <Text style={styles.slideText}>{item.title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    listView: {
        padding: 15,
        paddingTop: 20,
        backgroundColor: '#fff',
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 16,
        paddingBottom: 16,
        borderColor: '#E5E5E5',
        borderBottomWidth: 0.5,
        backgroundColor: '#fff',
    },
    infoContainer: {
        flex: 1,
        paddingRight: 20,
    },
    title: {
        fontSize: 16,
    },
    img: {
        width: 75,
        height: 60,
        borderRadius: 2,
    },

    // 轮播
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    image: {
        flex: 1,
    },
    slideTextContainer: {
        position: 'absolute',
        bottom: 25,
        paddingLeft: 8,
        paddingRight: 8,
        left: 0,
        right: 0,
        // backgroundColor: 'red',
    },
    slideText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    }
});
