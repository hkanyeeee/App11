import React from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import {storage} from '../RNAsyncStorage';
import { Button,InputItem } from 'antd-mobile-rn';
export default class MoneySet extends React.Component {
	constructor(){
		super();
		this.state={
			salary:'',
			daliyCost:'',
			alwaysCost:'',
		}
	}
	static navigationOptions = {
		title: '设置',
	};
	submit(){
		let self=this;
		//点击确定了之后，将上一层的state和缓存一起改变
		storage.save({
			key: 'money',  // 注意:请不要在key中使用_下划线符号!
			data: {
				salary:self.state.salary,
				daliyCost:self.state.daliyCost,
				alwaysCost:self.state.alwaysCost,
			}
			});
			self.props.index.setState({
				money:false,
				entertain:false,
				salary:self.state.salary,
				daliyCost:self.state.daliyCost,
				alwaysCost:self.state.alwaysCost
			})
	}
	back(){
		let self=this;
		self.props.index.setState({
			money:false,
			entertain:false,
		})
	}
	render() {
		return (
				<View>
					<Text>金钱设置模块</Text>
					<InputItem
						value={this.state.salary}
						onChange={(value) => {
							this.setState({
								salary:value
						});
						}}
						placeholder="工资"
						style={{marginTop:20}}
					>
						工资
					</InputItem>
					<InputItem
						value={this.state.daliyCost}
						onChange={(value) => {
							this.setState({
								daliyCost:value
						});
						}}
						placeholder="每天固定花费"
						style={{marginTop:20}}
					>
						每天固定花费
					</InputItem>
					<InputItem
						value={this.state.alwaysCost}
						onChange={(value) => {
							this.setState({
								alwaysCost:value
						});
						}}
						placeholder="固定花费"
						style={{marginTop:20}}
					>
						固定花费
					</InputItem>
					<Button onClick={this.submit.bind(this)} style={styles.configButton}>
						<Text style={styles.buttonFont}>确定</Text>
					</Button>
					<Button onClick={this.back.bind(this)} style={styles.configButton}>
						<Text style={styles.buttonFont}>返回</Text>
					</Button>
				</View>
		)
	}
}
const styles = StyleSheet.create({
	configButton:{
		marginTop:20
	},
	setButtonGroup:{
		flexDirection: 'row',
		marginLeft:10,
		marginTop:30
	},
	buttonFont:{
		fontSize:12
	}
})