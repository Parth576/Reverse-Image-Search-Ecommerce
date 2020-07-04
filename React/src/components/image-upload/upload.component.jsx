import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Upload extends React.Component {

    state={image:null,matchedImage:null,Result:[],Confidence:[],scrapedResults:[]};

    reverseImageSearch = async () => {
        try {
            const response = await fetch('http://localhost:5000/reverseImageSearch',{
                method:'GET'
            });
            const res = await response.json();
            if(res.errorMessage===undefined) {
                this.setState({matchedImage:res.matchedImage});
            }
            else {
                alert(res.errorMessage);
            }
        }
        catch(err) {
            console.log(err);
        }
    };

    uploadHandler = async e => {
        const formData = new FormData();
        formData.append('image',e.target.files[0]);
        try {
            const response = await fetch('http://localhost:5000/classify',{
                method:'POST',
                body:formData,
                
            });
            const res = await response.json();
            if(res.errorMessage===undefined) {
                this.setState({Result:res.Result,Confidence:res.Confidence,scrapedResults:res.scrapingResults});
            }
            await this.reverseImageSearch();
        }
        catch(err) {
            console.log(err);
        }
    };

    render() {
        return (
            <div style={{margin:20,padding:20,alignItems:'center',textAlign:'center'}}>
                <input type="file" id="uploader" onChange={e=>this.uploadHandler(e)}/>
                <br/>
                <img style={{marginTop:"10%"}} src={this.state.matchedImage} alt="Matched Image"/>
                <div style={{width:200,height:400,textAlign:'center',alignItems:'center',marginLeft:"45%",marginTop:"10%"}}>
                <Carousel showIndicators={false}>
                    {this.state.scrapedResults.map(elem=>{
                        return <div style={{width:200,height:300}}><img alt="scraped results" src={elem}/></div>
                    })}
                </Carousel>
                </div>
                <br/>
                <div>
                <h1 style={{marginTop:"10%"}} className="f4 bold center mw5">Classification Result</h1>
                <ul className="list pl0 ml0 center mw5 ba b--light-silver br3">
                    {this.state.Result.map(el=>{
                        return <li key={el} className="ph3 pv2">{el}</li>
                    })}
                </ul>
                </div>
            </div>
        );
    }

}

export default Upload;