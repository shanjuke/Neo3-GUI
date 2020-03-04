/* eslint-disable */ 
import React from 'react';
import 'antd/dist/antd.css';
import '../../static/css/menu.css'
import '../../static/css/wallet.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {  Layout, Menu, Icon, message } from 'antd';
import MenuDown from '../Common/menudown'

const { Sider } = Layout;
const { SubMenu } = Menu;

class Walletlayout extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        size: 'default',
        isopen: false
    };
  }
  toPage = (e) =>{
    console.log(e.key);
    let _link = location.origin + "/Walletlist"
  }
  componentDidMount = () =>{
    this.getGas()
  }
  getGas = () =>{
    var _this = this;
    axios.post('http://localhost:8081', {
      "id":51,
      "method": "ShowGas"
    })
    .then(function (response) {
      var _data = response.data;
      if(_data.msgType == -1){
        return;
      }
      _this.setState({isopen:true})
    })
    .catch(function (error) {
      console.log(error);
      console.log("error");
    });
  }
  render = () =>{
    return (
      <div style={{ height: '100%'}}>
          <Sider style={{ height: '100%'}} >
            <Menu
              className="menu-scroll"
              theme="dark"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
            >
              <Menu.Item>
                <Link to="/"><Icon type="home" />主页</Link>
              </Menu.Item>
                
              {!this.state.isopen?(
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="radius-setting" />
                      <span>钱包</span>
                    </span>
                  }
                >
                  <Menu.Item key="1">
                    <Link onClick={()=>message.info("请先打开钱包",2)}>账户列表</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link onClick={()=>message.info("请先打开钱包",2)}>交易列表</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link onClick={()=>message.info("请先打开钱包",2)}>转账</Link>
                  </Menu.Item>
                </SubMenu>
              ):null}
              {this.state.isopen?(
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="radius-setting" />
                      <span>钱包</span>
                    </span>
                  }
                >
                  <Menu.Item key="1">
                    <Link to="/wallet/walletlist">账户列表</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/wallet/trans">交易列表</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/wallet/transfer">转账</Link>
                  </Menu.Item>
                </SubMenu>
              ):null}
            </Menu>
            <MenuDown />
          </Sider>
      </div>
    );
  }
} 

export default Walletlayout;