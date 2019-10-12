import React from 'react';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <FeedList/>
        )
    }
}

class FeedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {title: "Enter Title here", content: "Enter Content here",},
            feed: Array(0),
        };
    }

    handleSubmit(event) {
        const feed = this.state.feed.slice();
        const newFeed = {
            title: this.state.input.title,
            content: this.state.input.content,
            isLiked: false,
            time: showtime(),
        };
        this.setState(
            {feed: feed.concat([newFeed])});

        // alert("Post submitted successfully: \n" + this.state.input.title + "\n" + this.state.input.content);
        event.preventDefault();
    }

    handleChange(event) {
        const inputs = this.state.input;
        const key = event.target.name;
        inputs[key] = event.target.value;

        this.setState({input: inputs});
    }

    handleClick(i) {
        const feed = this.state.feed.slice();
        feed[i].isLiked = !feed[i].isLiked;
        this.setState(
            {feed: feed});
    }


    render() {
        if (this.state.feed[0]) {
            return (
                <div id="feedList">
                    <div id="feed">
                        {this.state.feed.map((eachFeed, i) =>
                            <div className={"feed_" + i} key={i}>
                                <Feed
                                    title={this.state.feed[i].title}
                                    content={this.state.feed[i].content}
                                    isLiked={this.state.feed[i].isLiked}
                                    time={this.state.feed[i].time}
                                    onClick={() => this.handleClick(i)}
                                />
                            </div>
                        )}
                    </div>
                    <div id="inputBox"><InputBox title={this.state.input.title}
                                                 content={this.state.input.content}
                                                 onChange={(e) => this.handleChange(e)}
                                                 onSubmit={(e) => this.handleSubmit(e)}/></div>
                </div>
            )
        } else {
            return (
                <div id="feedList">
                    <div id="feed"><span className="noFeed"> No Feed yet.</span></div>
                    <div id="inputBox"><InputBox title={this.state.input.title}
                                                 content={this.state.input.content}
                                                 onChange={(e) => this.handleChange(e)}
                                                 onSubmit={(e) => this.handleSubmit(e)}/></div>
                </div>
            )
        }

    }
}


function Feed(props) {
    const likeImage = props.isLiked ? './Liked.png' : './toLike.png';

    return (
        <div className="Feed">
            <div className="Title">{props.title}</div>
            <div className="Content">{props.content}</div>
            <input type="image" src={require(`${likeImage}`)}
                   alt="Like" name="Like" className="Like"
                   onClick={props.onClick}/>
            <div className="Time">{props.time}</div>
        </div>
    );
}


class InputBox extends React.Component {

    render() {
        return (
            <div className="Input">
                <form onSubmit={(e) => this.props.onSubmit(e)}>
                    <label className='createPost'>Create a new post here:</label>
                    <div id="inputTitle">
                        <label className='postField'>Title: </label>
                        <input type="text" name="title"
                               value={this.props.title}
                               onChange={(e) => this.props.onChange(e)}/>
                    </div>
                    <div id="inputContent">
                        <label className='postField'>Content: </label>
                        <textarea name="content"
                                  value={this.props.content}
                                  onChange={(e) => this.props.onChange(e)}/>
                    </div>

                    <input type="submit" value="Submit"/>

                </form>

            </div>
        );
    }
}

function showtime() {
    let currentdate = new Date();
    let datetime =
        (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return datetime;
}

export default App;

