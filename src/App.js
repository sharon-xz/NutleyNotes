import React from 'react';
import './App.css';
import {CssBaseline, Container, Card, CardHeader, CardContent, Fab} from '@material-ui/core';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <FeedList/>
            </React.Fragment>
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
                <>
                    <Container fixed maxWidth={false}
                               style={{backgroundColor: '#cfe8fc'}}>

                        <div id="feed" style={{padding: "1.5em"}} >
                            {this.state.feed.map((eachFeed, i) =>
                                <div className={"feed_" + i} key={i}>
                                    <Feed
                                        title={this.state.feed[i].title}
                                        content={this.state.feed[i].content}
                                        isLiked={this.state.feed[i].isLiked}
                                        onClick={() => this.handleClick(i)}
                                    />
                                </div>
                            )}
                        </div>
                    </Container>
                    <Container fixed maxWidth={false} style={{backgroundColor: '#cfe8fc'}}>

                        <div id="inputBox"><InputBox title={this.state.input.title}
                                                     content={this.state.input.content}
                                                     onChange={(e) => this.handleChange(e)}
                                                     onSubmit={(e) => this.handleSubmit(e)}/>
                        </div>
                    </Container>
                </>


            )
        } else {
            return (

                <><Container fixed maxWidth={false} style={{backgroundColor: '#cfe8fc'}}>

                    <div id="feed"><span className="noFeed"> No Feed yet.</span></div>
                </Container>

                <Container fixed maxWidth={false} style={{backgroundColor: '#cfe8fc'}}>
                    <div id="inputBox"><InputBox title={this.state.input.title}
                                                 content={this.state.input.content}
                                                 onChange={(e) => this.handleChange(e)}
                                                 onSubmit={(e) => this.handleSubmit(e)}/></div>
                </Container>

                </>


            )
        }

    }
}


function Feed(props) {

    return (
        <Card className="Feed" style={{margin: '1em'}}>
            <CardHeader className="Title" title={props.title}/>
            <CardContent className="Content">{props.content}</CardContent>

            <Fab color="primary" aria-label="like" onClick={props.onClick} style={{float:"right", margin: "1.5em"}}>
                <ThumbUpAltRoundedIcon />
            </Fab>


        </Card>
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

export default App;

