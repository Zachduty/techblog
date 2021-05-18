const deleteFormHandler = async(event) => {
    event.preventDefault();

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    const response = await fetch('/dashboard/post/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');   
      } else {
        alert('Failed to delete post.');
      }

}

document.querySelector('#delete-button').addEventListener('click', deleteFormHandler);


