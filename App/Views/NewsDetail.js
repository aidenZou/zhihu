/**
 * Movies
 */

import React, { Component } from 'react';
import {
    Image,
    ListView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    WebView,
} from 'react-native';

import LoadingFull from '../Components/Loading/Full';

var REQUEST_URL = 'http://news-at.zhihu.com/api/4/news/';   // + id

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            news: null
        };
    }

    componentDidMount() {
        const id = this.props.news.id
        this.fetchData(id);
    }

    fetchData(id) {
        REQUEST_URL += id
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    news: responseData,
                    // dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                    loaded: true,
                });
            })
            .done();
    }

    render() {
        if (!this.state.loaded) {
            return (<LoadingFull />)
        }

        const news = this.state.news
        return (
                <ScrollView style={[styles.container]}>
                    <View style={{}}>
                        <View style={styles.imgContainer}>
                            <Image
                                source={{ uri: news.image }}
                                style={styles.img}
                                />
                            <Text style={styles.title}>{news.title}</Text>
                            <Text style={styles.imageSource}>{news.image_source}</Text>
                        </View>
                        <View style={[{height: 500}]}>
                            {this.renderHtml(news.body)}
                        </View>
                    </View>
                </ScrollView>
        );
    }

    renderHtml(HTML) {
        let BGWASH = 'rgba(255,255,255,0.8)'

        return (
            <WebView
                style={{
                    backgroundColor: BGWASH,
                }}
                source={{html: HTML}}
                scalesPageToFit={true}
                />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    imgContainer: {
        height: 220,
        width: 375,
    },
    img: {
        flex: 1,
    },
    topTextContainer: {
        position: 'absolute',
        bottom: 25,
        paddingLeft: 8,
        paddingRight: 8,
        left: 0,
        right: 0,
        // backgroundColor: 'red',
    },
    title: {
        position: 'absolute',
        bottom: 25,
        paddingLeft: 8,
        paddingRight: 8,
        left: 0,
        right: 0,
        // textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    imageSource: {
        position: 'absolute',
        bottom: 10,
        paddingLeft: 8,
        paddingRight: 8,
        left: 0,
        right: 0,
        textAlign: 'right',
        fontSize: 12,
        // fontWeight: 'bold',
        color: '#BCBCBB',
    },
});
