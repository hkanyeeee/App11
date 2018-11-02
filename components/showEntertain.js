import React from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Button} from 'antd-mobile-rn';
import {storage} from '../RNAsyncStorage';
import {IsEmpty} from '../components/IsEmpty';
export default class ShowEntertain extends React.Component {
    constructor(){
        super();
        this.state={
            showContent:{"low":[],"medium":[],"high":[]},
            movie:'',
            game:'',
            book:'',
            tvShow:'',
            networkVideo:'',
            others:''
        }
    }
    componentWillMount(){
        storage.load({
			key: 'entertain',
			}).then(ret => {
					this.setState({
						movie:ret.movie,
						game:ret.game,
						book:ret.book,
						tvShow:ret.tvShow,
						networkVideo:ret.networkVideo,
						others:ret.others
                    })
                    //然后全部进行遍历找出符合时间要求的，规定要求？
                    //时间，急不急这个得加一个参数（优先级），在这里添加删除功能
                    let temp=this.state.showContent;
                    if (!IsEmpty(this.state.movie)) {
                        for (let i = 0; i < this.state.movie.length; i++) {
                            if (this.props.index.state.freeTime>=1) {
                                temp[this.state.movie[i]["youxianji"]].push(this.state.movie[i]);
                            }
                        }
                    }
                    if (!IsEmpty(this.state.game)) {
                        for (let i = 0; i < this.state.game.length; i++) {
                            if (this.props.index.state.freeTime>=0.5) {
                                temp[this.state.game[i]["youxianji"]].push(this.state.game[i]);
                            }
                        }
                    }
                    if (!IsEmpty(this.state.book)) {
                        for (let i = 0; i < this.state.book.length; i++) {
                            if (this.props.index.state.freeTime>=0.5) {
                                temp[this.state.book[i]["youxianji"]].push(this.state.book[i]);
                            }
                        }
                    }
                    if (!IsEmpty(this.state.tvShow)) {
                        for (let i = 0; i < this.state.tvShow.length; i++) {
                            if (this.props.index.state.freeTime>=0.75) {
                                temp[this.state.tvShow[i]["youxianji"]].push(this.state.tvShow[i]);
                            }
                        }
                    }
                    if (!IsEmpty(this.state.networkVideo)) {
                        for (let i = 0; i < this.state.networkVideo.length; i++) {
                                temp[this.state.networkVideo[i]["youxianji"]].push(this.state.networkVideo[i]);
                        }
                    }
                    if (!IsEmpty(this.state.others)) {
                        for (let i = 0; i < this.state.others.length; i++) {
                                temp[this.state.others[i]["youxianji"]].push(this.state.others[i]);
                        }
                    }
                    this.setState({
                        showContent:temp
                    })
                    }).catch(err => {
                        console.warn(err.message);
                    })
            
    }
    static navigationOptions = {
        title: '展示娱乐内容',
        };
    showContent(){
        let self=this;
        let renderData=[];
        if (!IsEmpty(self.state.showContent["high"])) {
            self.state.showContent["high"].map((item,index)=>{
                //在这里添加删除功能
                renderData.push(
                    <View key={index}>
                        <Text>一共需要花{item["time"]}小时</Text>
                        <Text>{item["content"]}</Text>
                        <Text>优先级：{item["youxianji"]}</Text>
                        <Button onClick={self.pick.bind(self,index,item)}>
                            <Text>删除</Text>
                        </Button>
                    </View>
                )
            })
        }
        if (!IsEmpty(self.state.showContent["medium"])) {
            self.state.showContent["medium"].map((item,index)=>{
                //在这里添加删除功能
                renderData.push(
                    <View key={index}>
                        <Text>一共需要花{item["time"]}小时</Text>
                        <Text>{item["content"]}</Text>
                        <Text>优先级：{item["youxianji"]}</Text>
                        <Button onClick={self.pick.bind(self,index,item)}>
                            <Text>删除</Text>
                        </Button>
                    </View>
                )
            })
        }
        if (!IsEmpty(self.state.showContent["low"])) {
            self.state.showContent["low"].map((item,index)=>{
                //在这里添加删除功能
                renderData.push(
                    <View key={index}>
                        <Text>一共需要花{item["time"]}小时</Text>
                        <Text>{item["content"]}</Text>
                        <Text>优先级：{item["youxianji"]}</Text>
                        <Button onClick={self.pick.bind(self,index,item)}>
                            <Text>删除</Text>
                        </Button>
                    </View>
                )
            })
        }
        return renderData
    }
    pick(e,v){
        let self=this;
        switch (v["type"]) {
            case 'movie':
            let temp1=self.state.movie;
            for (let i = 0; i < temp1.length; i++) {
                if (temp1[i]["content"]==v["content"]) {
                    temp1.splice(i,1);
                    i=i-1;
                } 
            }
            self.setState({
                movie:temp1
            })
            break;
            case 'game':
            let temp2=self.state.game;
            for (let i = 0; i < temp2.length; i++) {
                if (temp2[i]["content"]==v["content"]) {
                    temp2.splice(i,1);
                    i=i-1;
                } 
            }
            self.setState({
                game:temp2
            })
            break;
            case 'book':
            let temp3=self.state.movie;
            for (let i = 0; i < temp3.length; i++) {
                if (temp3[i]["content"]==v["content"]) {
                    temp3.splice(i,1);
                    i=i-1;
                } 
            }
            self.setState({
                movie:temp3
            })
            break;
            case 'tvShow':
            let temp4=self.state.movie;
            for (let i = 0; i < temp4.length; i++) {
                if (temp4[i]["content"]==v["content"]) {
                    temp4.splice(i,1);
                    i=i-1;
                } 
            }
            self.setState({
                movie:temp4
            })
            break;
            case 'networkVideo':
            let temp5=self.state.movie;
            for (let i = 0; i < temp5.length; i++) {
                if (temp5[i]["content"]==v["content"]) {
                    temp5.splice(i,1);
                    i=i-1;
                } 
            }
            self.setState({
                movie:temp5
            })
            break;
            case 'others':
            let temp6=self.state.movie;
            for (let i = 0; i < temp6.length; i++) {
                if (temp6[i]["content"]==v["content"]) {
                    temp6.splice(i,1);
                    i=i-1;
                } 
            }
            self.setState({
                movie:temp6
            })
            break;
            default:
                break;
        }
        storage.save({
            key: 'entertain',  // 注意:请不要在key中使用_下划线符号!
            data: {
                movie:self.state.movie,//每一个类目要有一个数组
                game:self.state.game,
                book:self.state.book,
                tvShow:self.state.tvShow,
                networkVideo:self.state.networkVideo,
                others:self.state.others
            }
        });
    }
    back(){
        let self=this;
        self.props.index.setState({
            showResult:false
        })
    }
    render() {
        return (
            <ScrollView>
                <Text>展示娱乐模块</Text>
                {this.showContent()}
                <Button onClick={this.back.bind(this)}>
                    <Text>返回</Text>
                </Button>
            </ScrollView>
        );
    }
}