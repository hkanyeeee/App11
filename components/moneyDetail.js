import React from 'react';
import {
	ScrollView,
	Text,
	View,
} from 'react-native';
import { Button} from 'antd-mobile-rn';
import {IsEmpty} from './IsEmpty';
export default class MoneyDetail extends React.Component {
	static navigationOptions = {
		title: '花销详情',
	};
	renderDetail(){
		let self=this;
		let renderData=[];
		if (IsEmpty(self.props.index.state.allMoneyData)||self.props.index.state.allMoneyData==[]) {
			renderData.push(
				<Text key={0}>无花销数据</Text>
			)
			return renderData
		} else {
			renderData.push(
				<Text>你每个月的预算为{parseInt(self.props.index.state.setMoneyData.daliyCost*30)+parseInt(self.props.index.state.setMoneyData.alwaysCost)}</Text>
			)
			self.props.index.state.allMoneyData.map((item,index)=>{
				renderData.push(
					<View  style={{marginTop:10}} key={index}>
						<Text>你第{index+1}个月花了{item}元</Text>
					</View>
				)
			})
			return renderData
		}
	}
	back(){
		let self=this;
		self.props.index.setState({
			openMoneyDetail:false
		})
	}
	render() {
		return (
				<ScrollView>
					<Text>查看花销详情</Text>
					{this.renderDetail()}
					<Button onClick={this.back.bind(this)}>
						<Text>返回</Text>
					</Button>
				</ScrollView>
		)
	}
}