/* eslint-disable */ 
import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Alert , Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
  } from 'antd';
  
import {  Layout } from 'antd';
import Intitle from '../Common/intitle'
import '../../static/css/wallet.css'

const { Option } = Select;
const { Sider, Content } = Layout;
const AutoCompleteOption = AutoComplete.Option;

const {dialog} = window.remote;

class Transfer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        size: 'default',
        accountlist: [],
        selectadd:0
    };
  }
  componentDidMount() {
    var _this = this;
    axios.post('http://localhost:8081', {
      "id": "1234",
      "method": "ListAddress",
      "params": {
        "count": 10
      }
    })
    .then(function (response) {
      var _data = response.data;
      if(_data.msgType == -1){
        console.log("需要先打开钱包再进入页面");
        return;
      }
      _this.setState({
        accountlist:_data.result.accounts
      })
    })
    .catch(function (error) {
      console.log(error);
      console.log("error2");
    });
  }
  setAddress = (target) =>{
    var _this = this;
    this.setState({
      selectadd:_this.state.accountlist[target]
    })

  }
  getAsset = () =>{
    this.setState({
      neo:_data.result.accounts
    })
  }
  verifyInput = () =>{
    
  }
  transfer = () =>{

  }
  render() {
    const {size,accountlist,selectadd} = this.state;
    
    return (
      <Layout className="wa-container">
        <Content className="mt3">
          <Row gutter={[30, 0]}  className="bg-white pv4" style={{ 'min-height': 'calc( 100vh - 120px )'}}>
            <Col span={28}>
              <Intitle content="转账"/>
              <div className="w600 wa-trans">
                <div className="mt3 mb5 bolder">付款地址</div>
                <Select
                  size={size}
                  defaultValue={"请选择要转出的地址"}
                  style={{ width: '100%'}}
                  onChange={this.setAddress}>
                  {accountlist.map((item,index)=>{
                    return(
                    <Option key={index}>{item.address}</Option>
                    )
                  })}
                </Select>

                <div className="mt3 mb5 bolder">收款地址</div>
                <Input placeholder="请输入要转到 NEO3 地址"/>

                <Row>
                  <Col span={16} className="bg-white pv4">
                    <div className="mt3 mb5 bolder">转账金额</div>
                      <Input
                        type="text"
                        placeholder="请输入转账金额" 
                        style={{ width: 250, marginRight: 20 }}
                      />
                  </Col>
                  <Col span={8} className="bg-white pv4">
                    <div className="mt3 mb5 bolder">发送资产</div>
                    <Select
                        defaultValue="选择" 
                        style={{ width: '100%' }}
                        >
                        <Option value="neo">NEO <small>{selectadd.neo}</small></Option>
                        <Option value="gas">GAS <small>{selectadd.gas}</small></Option>
                      </Select>
                  </Col>
                </Row>
                {/* <Input
                    style={{ width: 250 }}
                    placeholder="手续费(GAS)"
                    suffix={
                    <Tooltip title="在网络拥堵时加快交易速度">
                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>}
                  /> */}
                  <div className="mt2 text-c lighter">
                    <small>预计到账时间：20s</small>
                    <Button type="primary" onClick={this.transfer}>发送</Button> 
                  </div>
                </div>
                <Alert 
                  className="mt2"
                  showIcon
                  type="info"
                  message="安全提示：请勿轻易向陌生人转账。请仔细确认收款账户、转账金额、资产类型。请仔细辨别相同资产名称的资产，避免被骗。请勿向其它区块链的收款账户（地址）转账。"
                  />
              </Col>

            </Row>
        </Content>
      </Layout>
    );
  }
}

export default Transfer;