import React from 'react';
import {
	Text,
	View,
} from 'react-native';
import { Button,} from 'antd-mobile-rn';
import {storage} from '../RNAsyncStorage';
import MoneyDetail from '../components/moneyDetail';
import TimeDetail from '../components/timeDetail';
export default class Tongji extends React.Component {
		constructor(){
			super();
			this.state={
				showTimeScore:0,
				timeDate:0,
				timeDetailData:[],
				allTimeData:[],
				todayCost:0,
				moneyDate:0,
				toMonthCost:0,
				moneyDetailData:[],
				allMoneyData:[],
				setMoneyData:{},
				entertainData:{},
			}
		}
		componentWillMount(){
			let self=this;
			storage.getBatchData([
				{ key: 'dateMonthlyData'},
				{ key: 'allTimeData' },
				{ key: 'TodayMoney' },
				{ key: 'moneyMonthlyData' },
				{ key: 'allMoneyData' },
				{ key: 'money' },
				{ key:'entertain'}
			])
			.then(results => {
				let sum = 0;
				let sum2 = 0;
				for (let i = 1; i <= results[0].monthTimeReview.length; i++) {
					sum+=parseInt(results[0].monthTimeReview[i-1][`${i}`].todayReview);
				}
				for (let i = 0; i < results[3].monthAllCost.length; i++) {
					sum2+=results[3].monthAllCost[i];
				}
				sum = sum/parseInt(results[0].dateCount);
				self.setState({
					timeDate:results[0].dateCount,
					toMonthCost:sum2,
					showTimeScore:sum,
					timeDetailData:results[0].monthTimeReview,
					allTimeData:results[1].allTimeData,
					todayCost:results[2].countDailyCost,
					moneyDate:results[3].dateCount,
					moneyDetailData:results[3].monthAllCost,
					allMoneyData:results[4].allMoneyData,
					setMoneyData:results[5],
					entertainData:results[6],
				})
			}).catch(err => {
				console.log(err.message);
			})
		}
		static navigationOptions = {
				title: '冲冲冲!',
			};
		openMoneyDetail(){
			let self=this;
			self.setState({
				openMoneyDetail:true
			})
		}
		openTimeDetail(){
			let self=this;
			self.setState({
				openTimeDetail:true
			})
		}
		render() {
			if (this.state.openTimeDetail) {
				return (
					<TimeDetail index={this}/>
					)
			}else if(this.state.openMoneyDetail){
				return (
					<MoneyDetail index={this}/>
				)
			} else {
				return (
					<View >
						<Text style={{fontSize:20,marginTop:12}}>这个月你的评分是{this.state.showTimeScore}分</Text>
						<Text style={{fontSize:20,marginTop:12}}>这个月目前为止计划是要花{parseInt(this.state.moneyDate)*parseInt(this.state.setMoneyData.daliyCost)}</Text>
						<Text style={{fontSize:20,marginTop:12}}>已经花了{this.state.toMonthCost}</Text>
						<Button onClick={this.openTimeDetail.bind(this)} style={{marginTop:15}}>
							<Text>查看时间管理详情</Text>
						</Button>
						<Button onClick={this.openMoneyDetail.bind(this)} style={{marginTop:15}}>
							<Text>查看金钱管理详情</Text>
						</Button>
					</View>
				);
			}
			
		}
}