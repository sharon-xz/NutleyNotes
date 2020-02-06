const listNotes = () => {
    const hostUrl = "http://127.0.0.1:8000/";
    const url = hostUrl + "/notes/";
    return fetch(url, {
        method: 'GET',
    }).then(response => {
        console.log(response);
    })
};

const createNotes = (title, content) => {
    const data = {
        "title": title,
        "content" : content,
    };
    const hostUrl = "http://127.0.0.1:8000/";
    const url = hostUrl + "/notes/";
    return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        console.log(response);
    })
};