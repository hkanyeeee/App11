import React from 'react';
import { StyleSheet,View,Text,Linking,Alert } from 'react-native';
import {storage} from '../RNAsyncStorage';
import {IsEmpty} from '../components/IsEmpty';
import { Button,InputItem,Toast } from 'antd-mobile-rn';
export default class Money extends React.Component {
	constructor(){
		super();
		this.state={
			stateCost:'',
			countDailyCost:0,
			daliyCost:'',
			alwaysCost:'',
			dateCount:0,
			monthAllCost:[],
			allMoneyData:[]
		}
	}
	static navigationOptions = {
		title: '金钱',
	};
	componentWillMount(){
		storage.getBatchData([
			{key:'moneyMonthlyData'},
			{key:'allMoneyData'},
			{key:'money'},
			{ key: 'TodayMoney'},
		])
		.then(results => {
			this.setState({
				allMoneyData:results[1].allMoneyData,
				salary:results[2].salary,
				daliyCost:results[2].daliyCost,
				alwaysCost:results[2].alwaysCost,
				dateCount:results[0].dateCount,
				monthAllCost:results[0].monthAllCost,
				countDailyCost:parseInt(results[3].countDailyCost),
			})
		}).catch(err => {
			console.log(err.message);
		})
		
	}
	openAlipay(){
		Linking.canOpenURL('https://www.alipay.com').then(supported => {
		if (supported) {
			Linking.openURL('https://www.alipay.com');
		} else{
			Alert.alert('nope,you cant');
		}
		});
	}
	addCount(){
		//结账功能
		let self=this;
		if (!IsEmpty(self.state.stateCost)) {
			let temp1=0;
			temp1=parseInt(self.state.countDailyCost);
			temp1=temp1+parseInt(self.state.stateCost);
			storage.save({
				key: 'TodayMoney',  // 注意:请不要在key中使用_下划线符号!
				data: {
					countDailyCost:temp1
				}
			});
			self.setState({
				countDailyCost:temp1
			})
			Toast.success("完成结账");
		} else {
			Alert.alert('你没输入刚才花了多少钱');
		}
		
	}
	initTodayMoney(){
		storage.save({
			key: 'TodayMoney',  // 注意:请不要在key中使用_下划线符号!
			data: {
				countDailyCost:0
			}
		});
		Toast.success("初始化完成");
	}
	initMoney(){
		//将按月计的数据清空，然后将这个月的数据加入到总数据中
		storage.save({
			key: 'moneyMonthlyData',  // 注意:请不要在key中使用_下划线符号!
			data: {
				dateCount:0,
				monthAllCost:[]//按月保存每个月总共花销
			}
		});
		Toast.success("初始化完成");
	}
	initAllMoneyData(){
		storage.save({
			key: 'allMoneyData',  // 注意:请不要在key中使用_下划线符号!
			data: {
				allMoneyData:[]
			}
		});
		Toast.success("初始化完成");
	}
	countDay(){
		//结算一天的花销
		let self=this;
		let temp=self.state.monthAllCost;
		let temp1=parseInt(self.state.dateCount);
		let temp2=self.state.allMoneyData;
		let temp3=0;
		temp1=temp1+1;
		temp.push(self.state.countDailyCost);
		if (temp1==30) {
			for (let i = 0; i < temp.length; i++) {
				temp3=temp3+parseInt(temp[i]);
			}//像是这种循环都可以通过reduce完成
			temp2.push(temp3);
			storage.save({
				key: 'allMoneyData',  // 注意:请不要在key中使用_下划线符号!
				data: {
					allMoneyData:temp2
				}
			});
			storage.save({
				key: 'moneyMonthlyData',  // 注意:请不要在key中使用_下划线符号!
				data: {
					dateCount:0,
					monthAllCost:[]//按月保存每个月总共花销
				}
			});
			storage.save({
				key: 'TodayMoney',  // 注意:请不要在key中使用_下划线符号!
				data: {
					countDailyCost:0
				}
			});
			temp1=0;
			temp=[];
		} else {
			storage.save({
				key: 'moneyMonthlyData',  // 注意:请不要在key中使用_下划线符号!
				data: {
					dateCount:temp1,
					monthAllCost:temp//按月保存每个月总共花销
				}
			});
			storage.save({
				key: 'TodayMoney',  // 注意:请不要在key中使用_下划线符号!
				data: {
					countDailyCost:0
				}
			});
		}
		self.setState({
			dateCount:temp1,
			monthAllCost:temp,
			countDailyCost:0
		})
		Toast.success("结算完成");
	}
	render() {
		return (
			<View>
				<View style={{flexDirection: 'row',marginTop:10}}>
					<Button onClick={this.initTodayMoney.bind(this)} style={styles.goSetButton}>
						<Text>初始化今天的花销</Text>
					</Button>
					<Button onClick={this.initMoney.bind(this)} style={styles.goSetButton}>
						<Text>初始化月总花销</Text>
					</Button>
				</View>
				<View style={{marginTop:20}}>
					<Text style={{fontSize:20,marginTop:12}}>你每天的伙食费为{this.state.daliyCost}</Text>
					<Text style={{fontSize:20,marginTop:12}}>你今天已经花了{this.state.countDailyCost}</Text>
					<InputItem
						value={this.state.stateCost}
						onChange={(value) => {
							this.setState({
								stateCost:value
						});
						}}
						placeholder="刚才花了多少钱"
					>
						刚才花了多少钱
					</InputItem>
					<View style={{flexDirection: 'row',marginTop:10}}>
					<Button onClick={this.countDay.bind(this)} style={styles.goSetButton}>
							<Text>该算算总账了</Text>
						</Button>
						<Button onClick={this.addCount.bind(this)} style={styles.goSetButton}>
							<Text>老板，结账</Text>
						</Button>
						
					</View>
					<Button onClick={this.openAlipay.bind(this)} style={{marginTop:20}}>
						<Text>打开支付宝</Text>
					</Button>
				</View>
				
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

