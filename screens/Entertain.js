import React from 'react';
import {
	Text,
	View,
} from 'react-native';
import { Button,InputItem } from 'antd-mobile-rn';
import AddEntertain from '../components/addEnterain';
import ShowEntertain from '../components/showEntertain';
export default class Entertainment extends React.Component {
	constructor(){
		super();
		this.state={
			openAdd:false,
			showResult:false,
			freeTime:''
		}
	}
	static navigationOptions = {
			title: '冲冲冲',
		};
	toAdd(){
		let self=this;
		self.setState({
			openAdd:true
		})
	}
	submit(){
		let self=this;
		self.setState({
			showResult:true
		})
	}
	render() {
		if (this.state.openAdd) {
			return(
				<AddEntertain index={this}/>
			)
		} else if(this.state.showResult){
			return(
				<ShowEntertain index={this}/>
			)
		} else {
			return (
				<View >
					<Text style={{fontSize:20,marginTop:12}}>你现在有多少时间</Text>
					<Button onClick={this.toAdd.bind(this)}  style={{marginTop:15}}>
						<Text >添加内容</Text>
					</Button>
					<InputItem
						value={this.state.freeTime}
						onChange={(value) => {
							this.setState({
								freeTime:value
						});
						}}
						placeholder="输入空闲时间"
						style={{marginTop:15}}
					>
						输入空闲时间
					</InputItem>
					<Button onClick={this.submit.bind(this)}  style={{marginTop:15}}>
						<Text>提交</Text>
					</Button>
				</View>
			);
		}
		
	}
}