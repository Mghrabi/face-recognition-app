import React from 'react';


class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email:'',
            password:'',
            name:''
        }
    }

    gettingSignUpName = (event) => {
        this.setState({name: event.target.value})
    }

    gettingSignUpEmail = (event) => {
        this.setState({email: event.target.value})
    }

    gettingSignUpPass = (event) => {
        this.setState({password: event.target.value});
    }

    onSignup = () => {
        console.log(this.state);
        fetch('http://localhost:3001/register', {
            method:'post',
            headers:{'Content-Type':'application/json'}, 
            body:JSON.stringify({
                email:this.state.email,
                password:this.state.password,
                name:this.state.name})
            })

            .then(user => user.json())
            .then(user => {
                alert(user)
                
                if (user.id){
                this.props.gettingUserInfo(user);
                alert('signup successful')
                this.props.routing('active');
                }
            }) 
    }

    render(){
        const {routing, gettingUserInfo} = this.props;
        return (
            <article className="br3 ba dark-grey b--black-10 mv4 w-100 w-50-m w-25-l mw5 center ">
                <main className="pa4 black-80 main_box">
                    <div className="measure form_box">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 ma1" htmlFor="username">Username</label>
                            <input onChange={this.gettingSignUpName} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="name"  id="username" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 ma1" htmlFor="email-address">Email</label>
                            <input onChange={this.gettingSignUpEmail} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6 ma1" htmlFor="password">Password</label>
                            <input onChange={this.gettingSignUpPass} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSignup} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" id='submit' value="Sign Up" />
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


export default Register;