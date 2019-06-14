import React, { Component } from 'react';
import '../App.css';
import '../Custom.css';
import { exists } from 'fs';
import { parse } from 'query-string';
import queryString from 'query-string'
var qs = require('qs');
export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            cluster:[],
            group1:[],
            cluster3:[],
            clusterflag:'True',
            groupflag:'True',
            cluster3flag:'True',
            access_token : '',
            Code : '',
            State:''
        };
        console.log(this.props.match.params.session)
    }
    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        console.log(values.code);
        console.log(values.state);
        var Code = values.code;
        if (typeof(values.code) !== 'undefined' && values.code != null && values.state !== 'undefined' && values.state != null) {
            //console.log('Not Undefined or Not Null')
            //alert('Not Undefined or Not Null')
     } else {
            //console.log('Undefined or Null')
           // alert('Undefined or Null')
            window.location= '/LoginScreen';
   }
       // alert(values.code);
        fetch('http://52.172.36.138/api/authorize/access_token',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body :  qs.stringify({
                'client_id' : 'cbBVF0wO6fnwg65L1qRD3QxwBxxqk4WETD4Po9YP',
                'client_secret' : 'Dtj0al4xTYMSuO7htOtdX3ToNsBk5nUZZNPzYSJZCGW93iIw4yKM9Iei3PPds689uXlNNhvtSQdmDmrELXmUEd7DBCw9IuLWrLKDP7XogxThbiidxVahXnNdSqEpRLyHaVVHUnO8hQywKUAwPvZA3rpMr7g9eLMLjo5OZ10sOmK6Ytn8COGeSuMkW4zZG3ocyp7RHCVdIoQf5UkatChe7AwujvlfG9m101NCF1ShNoLPTW6DD9lP0t3qKCbYlO',
                'grant_type' : 'client_credentials',
            })
        }).then((response) => response.json()).then((jsonData) => {
            console.log(jsonData);
            var  access_token =  jsonData.access_token
            console.log(this.props.match.params.session);
            var x = this.props.match.params;
            console.log(x);
            console.log(access_token)
            fetch('http://52.172.36.138/api/display',{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+access_token,
                },
            }).then((response) => response.json()).then((jsonResponse) => {
                console.log(jsonResponse);
                    this.setState({
                        cluster:jsonResponse
                    })
            })
                .catch((error) => {
                    console.error(error);
                });
        })
        .catch((error) => {
            console.error(error);
        });
    };

    /*********  Play Functionality Start *********************/

    PayVideo() {
        let url = 'http://52.172.36.138/layout/preview/36';
        let win = window.open(url, '_blank');
        win.focus();
    }
    render() {
        return (
            <div>
                { this.state.groupflag ==='True' ?
                    <div className="container">
                        <div className="mybox">
                            <div className="row">
                                <div className="col-sm-12">
                                    {
                                        this.state.cluster.length > 0 ? this.state.cluster.map((data)=> {
                                            return (
                                                <div className="col-sm-6">
                                                    <div className="col-sm-2">
                                                    <img src={require('../../src/image/play2.png')} className="playimg" onClick={this.PayVideo} style={{"pointer-events":"all"}} />
                                                    </div>
                                                    <div className={data.licensed == 1 ?  "box" : "box-red" }>
                                                        {data.display}
                                                    </div>
                                                </div>
                                            )
                                        }) : "Data Not Available."
                                    }
                                </div>
                            </div>
                        </div>
                    </div> :
                   <div>   
                   </div>
                }
            </div>
        );
    }
}



