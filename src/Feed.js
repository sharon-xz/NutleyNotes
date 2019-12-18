import {Card, CardContent, CardHeader, Fab} from "@material-ui/core";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
// import StarBorderIcon from '@material-ui/icons/StarBorder';
import React from "react";

const Feed = props => {
    return (
        <Card className="Feed" style={{margin: '1em'}}>
            <CardHeader className="Title" title={props.title}/>
            <CardContent className="Content">{props.content}</CardContent>

            <Fab color="primary" aria-label="like" onClick={props.onClick} style={{float: "right", margin: "1.5em"}}>
                <ThumbUpAltRoundedIcon/>
            </Fab>

        </Card>
    );
};

export default Feed;
