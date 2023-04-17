import React, { Component } from 'react'

export class NewsItem extends Component {
 
  render() {
    let {title,description,imageUrl,newsUrl, author, date}=this.props;
    return (
      <div className="my-3">
        <div className="card" >
            <img src={!imageUrl?"https://www.hindustantimes.com/ht-img/img/2023/04/09/1600x900/Collage_Maker-09-Apr-2023-11-14-AM-7424_1681019122756_1681019132197_1681019132197.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body"> 
            <span class="badge bg-secondary">New</span>
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {date} </small></p>
                <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
