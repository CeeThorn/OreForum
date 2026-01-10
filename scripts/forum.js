document.getElementById('character-form').addEventListener('submit', async function(e) {
    e.preventDefault();

const profile = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        height: document.getElementById('height').value,
        birthday: document.getElementById('birthday').value,
        background: document.getElementById('background').value,
        relationship: document.getElementById('relationship').value,
        abilities: document.getElementById('abilities').value,
        imageFile: document.getElementById('file').files[0] ? document.getElementById('file').files[0].name : ''
    };


const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)

});
    if (response.ok) {

        window.location.href = '/profiles.html';
    } else {
        alert('Failed to create profile.');
    }
});