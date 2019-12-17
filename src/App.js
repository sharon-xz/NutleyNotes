import React from 'react';
import './App.css';
import clsx from 'clsx';
import {
    CssBaseline, Container, Card, CardHeader, CardContent, Fab, TextField,
    Button, Drawer, Toolbar, AppBar, List, Divider, Typography, ListItem,
    ListItemIcon, ListItemText, IconButton
} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';

import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import SendIcon from '@material-ui/icons/Send';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        marginTop: "4em",
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,


    },
}));

export default function App() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Nutley Notes
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {['Notes', 'Tasks', 'Starred'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['Trash'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <FeedList/>
            </main>
        </div>
    );
}

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


function Feed(props) {

    return (
        <Card className="Feed" style={{margin: '1em'}}>
            <CardHeader className="Title" title={props.title}/>
            <CardContent className="Content">{props.content}</CardContent>

            <Fab color="primary" aria-label="like" onClick={props.onClick} style={{float: "right", margin: "1.5em"}}>
                <ThumbUpAltRoundedIcon/>
            </Fab>


        </Card>
    );
}


class InputBox extends React.Component {

    render() {
        return (
            <div className="Input">
                <form onSubmit={(e) => this.props.onSubmit(e)} style={{padding: "1em 0"}}>

                    <TextField id="inputTitle"
                               label="New Post"
                               name="title"
                               fullWidth
                               value={this.props.title}
                               onChange={(e) => this.props.onChange(e)}
                    />

                    <TextField id="inputContent"
                               label="Content"
                               multiline
                               rows="3"
                               fullWidth
                               variant="outlined"
                               margin="normal"
                               value={this.props.content}
                               name="content"
                               onChange={(e) => this.props.onChange(e)}
                    />

                    <Button type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SendIcon/>}
                    >
                        Send

                    </Button>

                </form>

            </div>
        );
    }
}


