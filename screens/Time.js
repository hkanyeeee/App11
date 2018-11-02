import React from 'react';
import {
	StyleSheet,
	Text,
	Alert,
	View,
} from 'react-native';
import { Button,InputItem,Toast } from 'antd-mobile-rn';
import {storage} from '../RNAsyncStorage';
import {IsEmpty} from '../components/IsEmpty';
export default class Time extends React.Component {
	constructor(){
		super();
		this.state={
			todayReview:'',
			todayReviewDetail:'',
			dayCount:0,
			monthTimeReview:[],
			allTimeData:[]
		}
	}
	static navigationOptions = {
		title: '时间',
	};
	componentWillMount(){
		storage.getBatchData([
			{key: 'dateMonthlyData'},
			{key:'allTimeData'}
		])
		.then(results => {
			this.setState({
				dayCount:results[0].dateCount,
				monthTimeReview:results[0].monthTimeReview,
				allTimeData:results[1]
			})
				
		}).catch(err => {
			console.log(err.message);
		})
	}
	
	initAllTimeData(){
		//将按月计的数据清空，然后将这个月的数据加入到总数据中!
		storage.save({
			key: 'allTimeData',  // 注意:请不要在key中使用_下划线符号!
			data: {
				allTimeData:[]//格式是[{"dateCount":{"todayReview":?,"detail":？}},"dateCount":{"todayReview":?,"detail":？}]
			}
		});
		Toast.success("初始化完成");
	}
	initDate(){
		storage.save({
			key: 'dateMonthlyData',  // 注意:请不要在key中使用_下划线符号
			data: {
				dateCount:0,
				monthTimeReview:[]
			}
		});
		Toast.success("初始化完成");
	}
	submitReview(){
		let self=this;
		let tempJson1={};
		let tempJson2={};
		if (!IsEmpty(self.state.todayReview)&&!IsEmpty(self.state.todayReviewDetail)) {
			Toast.success("保存完成");
			let dayCount=parseInt(self.state.dayCount);
			let monthTimeReview = self.state.monthTimeReview;
			let temp1=self.state.allTimeData.allTimeData;
			dayCount = dayCount+1;
			tempJson1={"todayReview":self.state.todayReview,"todayReviewDetail":self.state.todayReviewDetail};
			tempJson2[`${dayCount}`]=tempJson1;
			monthTimeReview.push(tempJson2);
			if (parseInt(dayCount) == 30) {
				temp1.push(monthTimeReview);
				storage.save({
					key: 'allTimeData',  // 注意:请不要在key中使用_下划线符号!
					data: {
						allTimeData:temp1
					}
				});
				storage.save({
					key: 'dateMonthlyData',  // 注意:请不要在key中使用_下划线符号!
					data: {
						dateCount:0,
						monthTimeReview:[]//格式是[{"dateCount":{"todayReview":?,"detail":？}},"dateCount":{"todayReview":?,"detail":？}]
					}
				});
			} else {
				storage.save({
					key: 'dateMonthlyData',  // 注意:请不要在key中使用_下划线符号!
					data: {
						dateCount:dayCount,
						monthTimeReview:monthTimeReview//格式是[{"dateCount":{"todayReview":?,"detail":？}},"dateCount":{"todayReview":?,"detail":？}]
					}
				});
			}	
			self.setState({
				todayReview:'',
				todayReviewDetail:'',
				monthTimeReview:monthTimeReview,
				dayCount:dayCount
			})
		} else {
			Alert.alert('评分和一句话概括没填');
		}
	}
	render() {
		return (
			<View>
				<View style={{flexDirection: 'row',marginTop:10}}>
					<Button onClick={this.initDate.bind(this)} style={styles.goSetButton}>
						<Text >初始化日期统计</Text>
					</Button>
					<Button onClick={this.initAllTimeData.bind(this)} style={styles.goSetButton}>
						<Text >初始化所有的日期统计</Text>
					</Button>
				</View>
				
				<Text style={{fontSize:20,marginTop:12}}>给今天打个分:</Text>
				<InputItem
					value={this.state.todayReview}
					onChange={(value) => {
						this.setState({
							todayReview:value
					});
					}}
					placeholder="今日评价"
				>
					今日评价
				</InputItem>
				<InputItem
					value={this.state.todayReviewDetail}
					onChange={(value) => {
						this.setState({
							todayReviewDetail:value
					});
					}}
					placeholder="一句话"
				>
					一句话
				</InputItem>
				<Button onClick={this.submitReview.bind(this)} style={styles.goSetButton}>
						<Text >提交评分</Text>
				</Button>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	goSetButton: {
		width:120,
		height:40,
		marginLeft:10
	}
})
