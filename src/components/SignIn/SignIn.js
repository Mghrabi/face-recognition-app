import React from 'react';
import './SignIn.css';


class SignIn extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            signinEmail:'',
            signinPass:''
        }
    }

    gettingSignInEmail = (event) => {
        this.setState({signinEmail: event.target.value})
    }

    gettingSignInPass = (event) => {
        this.setState({signinPass: event.target.value});
    }

    onSignin = () => {
        console.log(this.state);
        fetch('http://localhost:3001/signin', {
            method:'post',
            headers:{'Content-Type':'application/json'}, 
            body:JSON.stringify({
                email:this.state.signinEmail,
                password:this.state.signinPass})
            })
            .then(data => data.json())
            .then(user => {
                alert(user)
                if (user.id){
                this.props.gettingUserInfo(user);
                alert('signin successful')
                this.props.routing('active');
                }
            })
            .catch(error => {
                alert(error);
            }) 
    }
//C:\Program Files\PostgreSQL\12
    render(){
        const { routing } = this.props;

        return (
            <article className="br3 ba dark-grey b--black-10 mv4 w-100 w-50-m w-25-l mw5 center ">
                <main className="pa4 black-80 main_box">
                    <div className="measure form_box">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 ma1" htmlFor="email-address">Email</label>
                            <input onChange={this.gettingSignInEmail} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6 ma1" htmlFor="password">Password</label>
                            <input onChange={this.gettingSignInPass} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSignin} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" id='submit' value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                        {/* <a href="#0" className="f6 link dim black db">Sign up</a> */}
                        
                        </div>
                    </div>
                </main>
            </article>
        )
    }
    
}

export default SignIn;