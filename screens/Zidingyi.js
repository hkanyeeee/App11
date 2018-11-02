import React from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Button } from 'antd-mobile-rn';
import MoneySet from '../components/moneySet';
import {storage} from '../RNAsyncStorage';
export default class Zidingyi extends React.Component {
	constructor(){
		super();
		this.state={
			money:false,
			entertain:false,
			salary:'',
			daliyCost:'',
			alwaysCost:'',
		}
	}
	//以上就是所有可以设置的数值，属于义务
	static navigationOptions = {
		title: '设置',
	};
	//进入该模块就读取缓存，将数据存到state中
	/*componentWillMount(){
	// 读取
	storage.getBatchData([
		{ key: 'time' },
		{ key: 'money' },
		{ key: 'entertain' },
	]).then(results => {
		results.forEach( result => {
			console.log(result); 	
		})
	}).catch(err => {
		console.warn(err.message);
		})
	}*/
	openConfig(type){
		let self=this;
		switch (type) {
			case 2:
				self.setState({
					money:true
				})
				break;
			case 3:
				self.setState({
					entertain:true
				})
				break;
			default:
				break;
		}
	}
	initAll(){
		storage.save({
			key: 'allTimeData',  // 注意:请不要在key中使用_下划线符号!
			data: {
				allTimeData:[]//格式是[{"dateCount":{"todayReview":?,"detail":？}},"dateCount":{"todayReview":?,"detail":？}]
			}
		});
		storage.save({
			key: 'allMoneyData',  // 注意:请不要在key中使用_下划线符号!
			data: {
				allMoneyData:[]//格式是[{"dateCount":{"todayReview":?,"detail":？}},"dateCount":{"todayReview":?,"detail":？}]
			}
		});
	}
	render() {
		let self=this;
		if(this.state.money) {
			return (
				<MoneySet index={self}></MoneySet>
				)
		}else{
			return (
				<View  style={{ flexDirection: 'column'}}>
					<Button onClick={this.openConfig.bind(this,2)}  style={{marginTop:15}}>
						<Text style={styles.buttonFont}>设置money模块</Text>
					</Button>
					<Button onClick={this.initAll.bind(this)}  style={{marginTop:15}}>
							<Text style={styles.buttonFont}>初始化长期的数据</Text>
					</Button>
				</View>
			);
		}
	}
}
const styles = StyleSheet.create({
	goSetButton: {
		width:100,
		height:40,
		marginLeft:10
	},
	buttonFont:{
		fontSize:12
	}
})