import React from "react";
import {Button, TextField} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const InputBox = props => {
    return (
        <div className="Input">
            <form onSubmit={(e) => props.onSubmit(e)} style={{padding: "1em 0"}}>

                <TextField id="inputTitle"
                           label="New Post"
                           name="title"
                           fullWidth
                           value={props.title}
                           onChange={(e) => props.onChange(e)}
                />

                <TextField id="inputContent"
                           label="Content"
                           multiline
                           rows="3"
                           fullWidth
                           variant="outlined"
                           margin="normal"
                           value={props.content}
                           name="content"
                           onChange={(e) => props.onChange(e)}
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
};

export default InputBox;
