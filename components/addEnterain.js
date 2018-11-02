import React from 'react';
import {
  Text,
  View,
  Picker
} from 'react-native';
import { Button,InputItem } from 'antd-mobile-rn';
import {storage} from '../RNAsyncStorage';
export default class AddEntertain extends React.Component {
	constructor(){
		super();
		this.state={
			entertainType:'movie',
			costTime:'',
			addContent:'',
			youxianji:'low',
			movie:[],//每一个类目要有一个数组
			game:[],
			book:[],
			tvShow:[],
			networkVideo:[],
			others:[]
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
			}).catch(err => {
				console.warn(err.message);
			})
	}
    static navigationOptions = {
        title: '增加娱乐内容',
		};

	init(){
		storage.save({
			key: 'entertain',  // 注意:请不要在key中使用_下划线符号!
			data: {
				movie:[],//每一个类目要有一个数组
				game:[],
				book:[],
				tvShow:[],
				networkVideo:[],
				others:[]
			}
		});
		//Toast.success("初始化完成");
	}
	back(){
		let self=this;
		self.props.index.setState({
			openAdd:false
		})
	}	
    submit(){
		let self=this;
		let temp1={};
		let temp2=[];
		temp1["time"]=self.state.costTime;
		temp1["content"]=self.state.addContent;
		temp1["youxianji"]=self.state.youxianji;
		switch (self.state.entertainType) {
			case 'movie':
				temp2=self.state.movie;
				temp1["type"]='movie';
				temp2.push(temp1);
				storage.save({
					key: 'entertain',  // 注意:请不要在key中使用_下划线符号!
					data: {
						movie:temp2,//每一个类目要有一个数组
						game:self.state.game,
						book:self.state.book,
						tvShow:self.state.tvShow,
						networkVideo:self.state.networkVideo,
						others:self.state.others
					}
				});
			break;
			case 'game':
				temp2=self.state.game;
				temp1["type"]='game';
				temp2.push(temp1);
				storage.save({
					key: 'entertain',  // 注意:请不要在key中使用_下划线符号!
					data: {
						movie:self.state.movie,//每一个类目要有一个数组
						game:temp2,
						book:self.state.book,
						tvShow:self.state.tvShow,
						networkVideo:self.state.networkVideo,
						others:self.state.others
					}
				});
			break;
			case 'book':
				temp2=self.state.book;
				temp1["type"]='book';
				temp2.push(temp1);
				storage.save({
					key: 'entertain',  // 注意:请不要在key中使用_下划线符号!
					data: {
						movie:self.state.movie,//每一个类目要有一个数组
						game:self.state.game,
						book:temp2,
						tvShow:self.state.tvShow,
						networkVideo:self.state.networkVideo,
						others:self.state.others
					}
				});
			break;
			case 'tvShow':
				temp2=self.state.tvShow;
				temp1["type"]='tvShow';
				temp2.push(temp1);
				storage.save({
					key: 'entertain',  // 注意:请不要在key中使用_下划线符号!
					data: {
						movie:self.state.movie,//每一个类目要有一个数组
						game:self.state.game,
						book:self.state.book,
						tvShow:temp2,
						networkVideo:self.state.networkVideo,
						others:self.state.others
					}
				});
			break;
			case 'networkVideo':
				temp2=self.state.networkVideo;
				temp1["type"]='networkVideo';
				temp2.push(temp1);
				storage.save({
					key: 'entertain',  // 注意:请不要在key中使用_下划线符号!
					data: {
						movie:self.state.movie,//每一个类目要有一个数组
						game:self.state.game,
						book:self.state.tvShow,
						tvShow:self.state.tvShow,
						networkVideo:temp2,
						others:self.state.others
					}
				});
			break;
			case 'others':
				temp2=self.state.others;
				temp1["type"]='type';
				temp2.push(temp1);
				storage.save({
					key: 'entertain',  // 注意:请不要在key中使用_下划线符号!
					data: {
						movie:self.state.movie,//每一个类目要有一个数组
						game:self.state.game,
						book:self.state.book,
						tvShow:self.state.tvShow,
						networkVideo:self.state.networkVideo,
						others:temp2
					}
				});
			break;
			default:
				break;
		}
        self.props.index.setState({
            openAdd:false
        })
    }
    render() {
        return (
            <View >
            <Text>增加娱乐模块</Text>
            <InputItem
					value={this.state.addContent}
					onChange={(value) => {
						this.setState({
							addContent:value
					});
					}}
					placeholder="添加娱乐内容"
				>
					添加娱乐内容标题
				</InputItem>
				<Text>内容类型</Text>
				<Picker
					selectedValue={this.state.entertainType}
					style={{ width: 150 }}
					onValueChange={(itemValue, itemIndex) => this.setState({entertainType: itemValue})}>
					<Picker.Item label="电影" value="movie" />
					<Picker.Item label="书籍" value="book" />
					<Picker.Item label="游戏" value="game" />
					<Picker.Item label="电视剧" value="tvShow" />
					<Picker.Item label="网络视频" value="networkVideo" />
					<Picker.Item label="其他" value="others" />
				</Picker>
				<Picker
					selectedValue={this.state.youxianji}
					style={{ width: 150 }}
					onValueChange={(itemValue, itemIndex) => this.setState({youxianji: itemValue})}>
					<Picker.Item label="低" value="low" />
					<Picker.Item label="中" value="medium" />
					<Picker.Item label="高" value="high" />
				</Picker>
				<InputItem
					value={this.state.costTime}
					onChange={(value) => {
						this.setState({
							costTime:value
					});
					}}
					placeholder="需要花多少时间"
				>
					需要花多少时间
				</InputItem>
				<Button onClick={this.submit.bind(this)}>
					<Text>提交</Text>
				</Button>
				<Button onClick={this.init.bind(this)}>
					<Text>初始化</Text>
				</Button>
				<Button onClick={this.back.bind(this)}>
					<Text>返回</Text>
				</Button>
            </View>
        );
    }
}