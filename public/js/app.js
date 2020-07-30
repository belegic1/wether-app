const w = document.querySelector('.wrap');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    w.innerHTML = 'Loading...';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then(({ location, data }) => {
            const { temperature, chanceToRain } = data;
            w.innerHTML = `<p>${location}</p>
        <p>Temperature: ${temperature}</p>
        <p>${chanceToRain}% chance to rain</p>`;
        });
    });
});
