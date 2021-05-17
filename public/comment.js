var commentSubmitHandler = (event) => {
    event.preventDefault();

    const body = document.querySelector('#textbody').value;

    console.log(body)

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    if (body) {
        const response = fetch('/api/comment/' + id, {
            method: 'POST',
            body: JSON.stringify({body}),
            headers: {'Content-Type': 'application/json'},
        });
        window.location.assign("/api/post/" + id);
    }
}

document
.getElementById('comment-submit')
.addEventListener('click', commentSubmitHandler);