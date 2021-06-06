import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import './login.css'
import {loggin} from '../actions'
import { push, replace } from 'react-router-redux'
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '', 
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }   
    handleChange = (event)=>{
        const {type, value} = event.target
        this.setState({
            [type]:value
        })
    } 

    handleSubmit = ()=>{
        const {email, password} = this.state
        console.log(email)
        const {dispatch } = this.props
        fetch("https://movieapp98.herokuapp.com/api/check/" + email.split('@')[0] + "/" + password)
      .then((result) => result.json())
      .then((data) => {
        if (data["data"]["isChecked"]) {
        console.log(data)
          data = data["data"];
          dispatch(loggin(data["username"], data["phone"], data["id"]));
          localStorage.setItem("username", data["username"]);
          localStorage.setItem("id", data["id"]);
          localStorage.setItem("accessToken", true);
        }
        dispatch(replace('/'))
      });
    }
    render() {
        const accessToken = localStorage.getItem('accessToken')

        return (
            (!accessToken) ? (
        <form className='login-form'>
                {/* <h3>Log in</h3> */}

                <div className="form-group">
                    <label>Email</label>
                    <input onChange={this.handleChange} type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={this.handleChange} type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button onClick={this.handleSubmit} type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>): <div></div>
        )
    }
}
const mapStateToProps = (state)=> {
    const {userDetail} = state
    console.log(userDetail)
    return {userDetail}
}
export default connect(mapStateToProps)(Login)