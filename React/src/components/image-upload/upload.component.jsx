import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CustomButton from './../custom-button/custom-button.component';
import Display from './../uploaded-display/uploaded-display.component';
import './image-upload.styles.scss';
import '../../pages/collection/collection.styles.scss';
import {withRouter} from 'react-router-dom';

class Upload extends React.Component {

    state={image:null,matchedImage:null,imageURL:'',Result:[],Confidence:[],scrapedResults:[]};

    btnClick(Website) {
        window.open(Website);
    }

    reverseImageSearch = async () => {
        try {
            const response = await fetch('http://localhost:5000/reverseImageSearch',{
                method:'GET'
            });
            const res = await response.json();
            if(res.errorMessage===undefined) {
                this.setState({matchedImage:res.matchedImage,imageURL:res.path});
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
                <h1>UPLOAD IMAGES TO FIND THEM IN OUR STORE AND OTHER STORES</h1>
                <input type="file" id="uploader" onChange={e=>this.uploadHandler(e)}/>
                <br/>
                {this.state.matchedImage ? 
                        <div>
                            <h2>In our store</h2>
                            <hr />
                        </div>
                        :
                        <div />   
                }
                <div className='collection-item'>
                    
                    { this.state.matchedImage ?
                        <div
                        className='image'
                        style={{
                            backgroundImage: `url(${this.state.matchedImage})`
                        }}
                        />
                        :
                        <div
                        className='image'
                        style={{
                            backgroundColor: 'white'
                        }}
                        />
                    }
                    <CustomButton onClick={() => this.props.history.push(this.state.imageURL)} inverted>
                        BUY
                    </CustomButton>
                </div>
                <div className='collection-page'>
                    <br />
                    
                    {this.state.scrapedResults ? <h2>Other Store Recommendations </h2> : <div />}
                    <hr />
                    <div className='items'>
                        {this.state.scrapedResults.map(elem=>(
                            <Display item={elem} onclick={this.btnClick}/>
                        ))}
                    </div>
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

export default withRouter(Upload);