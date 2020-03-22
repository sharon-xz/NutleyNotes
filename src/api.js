export const listNotes = () => {
    const hostUrl = "http://127.0.0.1:8000/";
    const url = hostUrl + "notes/";
    return fetch(url, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return {};
    })
};

export const createNotes = (title, content) => {
    const data = {
        title: title,
        content: content,
    };
    const hostUrl = "http://127.0.0.1:8000/";
    const url = hostUrl + "notes/";

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.ok;
    })
};