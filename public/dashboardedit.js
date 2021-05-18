const editFormHandler = async(e) => {
    e.preventDefault();

    const title = document.querySelector('#title-update').value;
    const content = document.querySelector('#content-update').value;

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    if(title && content) {
        const response = await fetch('/dashboard/post/' + id, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {'Content-Type': 'application/json'}
        })
        if (response.ok) {
            document.location.replace('/dashboard'); 
          } else {
            console.log('Failed to delete post.');
          }
    } else {
        console.log('TITLE & CONTENT FAIL')
    }


}


document.getElementById('editsubmitbutton').addEventListener('click', editFormHandler);