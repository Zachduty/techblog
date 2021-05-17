const signupFormHandler = async(event) => {
    event.preventDefault();

    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const passConfirm = document.querySelector('#passCon-signup').value.trim();
    const name = document.querySelector('#user-signup').value.trim();

    if (!passtrue(password, passConfirm)) {
        return;
    }

    if (email && password && name) {
        alert('We hit the if statement!')
        console.log(email, password, name)
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            document.location.replace('/');
          } else {
            alert('Failed to create account.');
          }
    }

}

const passtrue = (input1, input2) => {
    if (input1 === input2){
        alert('Passwords match!')
        return true;
    } else if (input1 != input2) {
        alert('Passwords do not match, please try again.');
        return false;
    }
}


document
    .querySelector('#signup-submit')
    .addEventListener('click', signupFormHandler);