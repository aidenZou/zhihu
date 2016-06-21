import React, {Component} from 'react';
import {
    Navigator,
    StyleSheet,
    Platform,
    View,
    Text,
    StatusBar
} from 'react-native'

import IndexView from '../Views/Home'
import MoviesView from '../Views/Movies'
import NewsDetailView from '../Views/NewsDetail'

export default class NavigatorComp extends Component {

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    // backgroundColor="red"
                    // barStyle='default'
                    // showHideTransition='slide'
                    />
                <Navigator
                    initialRoute={{ name: 'indexView', index: 0, id: 'index' }}
                    configureScene={this._configureScene}
                    renderScene={this._renderScene}
                    />
            </View>
        )
    }

    /**
     *
     * @param route
     * id
     * params
     */
    _renderScene(route, navigator) {
        switch (route.id) {
            case 'index':
                return (<IndexView navigator={navigator}/>)
            case 'newsDetail':
                return (<NewsDetailView {...route.params} navigator={navigator}/>)
            case 'message':
                return (<Text>message</Text>)
            case 'i':
                return (<Text>我的</Text>)
            case 'topicDetail':
                return (<TopicDetailView {...route.params} navigator={navigator}/>)
            default:
                break
        }
        // return null
    }

    // 配置场景动画和手势。会带有两个参数调用，一个是当前的路由，一个是当前的路由栈。然后它应当返回一个场景配置对象
    _configureScene(route, routeStack) {

        switch (route.id) {
            case 'i':
                return Navigator.SceneConfigs.FloatFromBottom
            default:
                return Navigator.SceneConfigs.FloatFromRight
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})