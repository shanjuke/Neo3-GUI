/* eslint-disable */ 
import React from 'react';
import 'antd/dist/antd.css';
import '../../static/css/menu.css'
import '../../static/css/wallet.css'
import {  Layout, Menu, Icon } from 'antd';
import MenuDown from '../Common/menudown'


const { Sider } = Layout;
const { SubMenu } = Menu;


class Chainlayout extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        size: 'default'
    };
  }
  toHome = () =>{
    location.href=location.origin;
  }
  toPage = (e) =>{
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
              <Menu.Item onClick={this.toHome}>
                <Icon type="home" />
                <span>主页</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="radius-setting" />
                    <span>区块链</span>
                  </span>
                }
              >
                <Menu.Item key="1" onClick={this.toPage}>区块</Menu.Item>
                <Menu.Item key="2" onClick={this.toPage}>交易记录</Menu.Item>
                <Menu.Item key="3" onClick={this.toPage}>资产</Menu.Item>
              </SubMenu>
            </Menu>
            <MenuDown />
          </Sider>
      </div>
    );
  }
} 

export default Chainlayout;