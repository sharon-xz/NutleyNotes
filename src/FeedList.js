import React from "react";
import {Container} from "@material-ui/core";
import InputBox from "./InputBox";
import Feed from "./Feed";

class FeedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {title: "", content: "",},
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
                <><Container fixed maxWidth={false} style={{backgroundColor: '#cfe8fc'}}>

                    <div id="inputBox"><InputBox title={this.state.input.title}
                                                 content={this.state.input.content}
                                                 onChange={(e) => this.handleChange(e)}
                                                 onSubmit={(e) => this.handleSubmit(e)}/>
                    </div>
                </Container>
                    <Container fixed maxWidth={false}
                               style={{backgroundColor: '#cfe8fc'}}>

                        <div id="feed" style={{padding: "1.5em"}}>
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

                </>
            )
        } else {
            return (

                <> <Container fixed maxWidth={false} style={{backgroundColor: '#cfe8fc'}}>
                    <div id="inputBox"><InputBox title={this.state.input.title}
                                                 content={this.state.input.content}
                                                 onChange={(e) => this.handleChange(e)}
                                                 onSubmit={(e) => this.handleSubmit(e)}/></div>
                </Container>

                    <Container fixed maxWidth={false} style={{backgroundColor: '#cfe8fc'}}>

                        <div id="feed"><span className="noFeed"> No Feed yet.</span></div>
                    </Container>
                </>
            )
        }

    }
}

export default FeedList;