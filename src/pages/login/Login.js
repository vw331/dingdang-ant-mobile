import React from 'react'
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import $http from '../../request'

import './login.css'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      BtnSMS: {
        disabled: false,
        text: '获取验证码'
      },
    }
  }

  componentWillMount() {

  }

  freezeBtn() {
    const self = this
    ;(function _delay(t){
      t--
      self.setState({
        BtnSMS: {
          disabled: !!t,
          text: t ? `${t}s` : '获取验证码'
        },
      })
      t && setTimeout( _delay.bind(self, t), 1000)
    })(60)
  }

  // 发送验证码
  sendSMS = e => {
    const self = this

    $http.post('http://47.114.163.46:4000/api/test', {})
      .then( res => {
        const { data, status } = res
        if(status === 200){
          Toast.success('短信已发送!');
          self.freezeBtn.call(self)
        }
      })
      .catch( err => {
        console.log('发送错误')
      })

  }

  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }

  render() {
    
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <div className="login-page">
        <List>
          <InputItem
            {...getFieldProps('userName', {
              rules: [{required: true}]
            })}
            error={!!getFieldError('userName')}
            placeholder="用户名"
            ref={el => this.autoFocusInst = el}
          />
          <InputItem
            className="login-input-SMS"
            {...getFieldProps('captcha', {
              rules: [{required: true}]
            })}
            error={!!getFieldError('userName')}
            placeholder="短信验证码"
            ref={el => this.autoFocusInst = el}
            extra={<Button  
              className="login-btn-SMS" 
              type="ghost" 
              size="small" 
              disabled={this.state.BtnSMS.disabled}
              onClick={this.sendSMS} 
              >{this.state.BtnSMS.text}</Button>
            }
          >
          </InputItem>
          <List.Item>
            <Button onClick={this.submit} type="primary" size="">登录</Button>
          </List.Item>
        </List>
      </div>
    )
  }
  
}

export default createForm()(Login);