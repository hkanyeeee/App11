import React from 'react';
import {
	ScrollView,
	Text,
	View,
} from 'react-native';
import { Button} from 'antd-mobile-rn';
import {IsEmpty} from './IsEmpty';
export default class TimeDetail extends React.Component {
	static navigationOptions = {
		title: '时间详情',
	};
	renderDetail(){
		let self=this;
		let renderData=[];
		if (IsEmpty(self.props.index.state.allTimeData)) {
			renderData.push(
				<Text key={0}>无时间数据</Text>
			)
			return renderData
		} else {
			for (let i = 0; i < self.props.index.state.allTimeData.length; i++) {
				for (let j = 0; j < self.props.index.state.allTimeData[i].length; j++) {
					renderData.push(
						<View style={{marginTop:10}}>
							<Text>你第{i+1}个月第{j+1}天评分为{self.props.index.state.allTimeData[i][j][`${j+1}`].todayReview}</Text>
							<Text>评论为：{self.props.index.state.allTimeData[i][j][`${j+1}`].todayReviewDetail}</Text>
						</View>
					)
				}
			}
			return renderData
		}
	}
	back(){
		let self=this;
		self.props.index.setState({
			openTimeDetail:false
		})
	}
	render() {
		return (
			<ScrollView >
				<Text>查看时间详情</Text>
				{this.renderDetail()}
				<Button onClick={this.back.bind(this)}>
					<Text>返回</Text>
				</Button>
			</ScrollView>
		)
	}
}