import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { LoginPropsType } from './LoginContainer'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import TwitterLogin from 'react-twitter-login'

const Login: React.FC<LoginPropsType> = (props) => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
        props.loginCheck(values)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    const responseGoogle = (response: any) => {
        console.log('responseGoogle', response)
    }

    const responseFacebook = (response: any) => {
        console.log('responseFacebook', response)
    }

    const responseTwitter = () => {
        
    }

    return (
        <div className='container'>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Login
                    </Button>
                </Form.Item>

                <Form.Item>
                    {/* <Button type="ghost" className="mx-3">
                        Google
                    </Button> */}

                    <GoogleLogin
                        clientId="259617516382-mtqgm6d9c7n60h9cmpfluiscare8ioa3.apps.googleusercontent.com"
                        buttonText=""
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />

                    {/* <Button type="ghost" className="mx-3">
                        Facebook
                    </Button> */}

                    <FacebookLogin
                        appId="2904006213223010"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={() => console.log('onClick')}
                        callback={responseFacebook} />

                    {/* <Button type="ghost" className="mx-3">
                        Twitter
                    </Button> */}
                    <TwitterLogin
                        authCallback={responseTwitter}
                        consumerKey={'KUWZqSDTKRjetfpSoMrwu81CT'}
                        consumerSecret={'DdijnbdTeYyVUE0FkKa08aNR8ORuvCiEMEIJVd4JWMY3Q4e2V8'}
                    />
                </Form.Item>

                <Form.Item>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login

// type LoginPropsType = {

// }