import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    
    static defaultProps = {
         country: 'in',
         pageSize: 8 ,
         category : 'general' 
            
        }
    static propTypes = {
         country : PropTypes.string,
         pageSize: PropTypes.number,
         category : PropTypes.string
    }  
    capitalizeFirst = (string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
    }  
    constructor (props) {
        super(props);
        console.log("Hello I am a constructor from news Component");
        this.state = {
            articles : [],
            loading  : false,
            page:1,
            totalResults : 0
        }
        document.title = `News Adda - ${this.capitalizeFirst(this.props.category)}`;
    }
    async updateNews(){
      this.props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=beec583deaa64f0da210cebfc0e15c30&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json();
      this.props.setProgress(70);
      console.log(parsedData);
      this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults, loading:false})
      this.props.setProgress(100);
    } 
    async componentDidMount(){
      this.updateNews();
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=beec583deaa64f0da210cebfc0e15c30&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true});
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // console.log(parsedData);
      // this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults, loading:false})
    }

    handlePreviousClick = async()=>{
      // console.log("Previous");

      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=beec583deaa64f0da210cebfc0e15c30&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true});
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // this.setState({loading:false});
      // this.setState({page: this.state.page-1,
      //   articles: parsedData.articles})
      this.setState({page: this.state.page-1});
      this.updateNews();
    }

    handleNextClick = async()=>{
      
      // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=beec583deaa64f0da210cebfc0e15c30&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true});
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // this.setState({loading:false});
      // this.setState({page: this.state.page+1,
      //   articles: parsedData.articles})
      // }
      // console.log("Next");
      this.setState({page: this.state.page+1});
      this.updateNews();
    }

    fetchMoreData = async () => {
    this.setState({page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=beec583deaa64f0da210cebfc0e15c30&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({articles: this.state.articles.concat(parsedData.articles),totalResults: parsedData.totalResults, loading:false})
    };
  render() {
    return (
      <>
         <h1 className="text-center" style={{margin : '40px 0px'}}><strong>News Adda - Top Headlines</strong></h1>
         {/* {this.state.loading && <Spinner/>} */}
         
         <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<></>}
        >
          <div className="container">
         <div className="row">
         {this.state.articles.map((element)=>{
            return <div className="col-md-4" key ={element.url} >
           <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
         </div> 
          })}
        </div>
        </div>
          </InfiniteScroll>
        
           
          {/* <div className="container d-flex justify-content-between" >
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick} >&larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
          </div>  */}
         </>
      
    )
  }
}

export default News
