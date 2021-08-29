// error
const error = document.getElementById('error');
error.style.display = 'none';

document.getElementById('search-btn').addEventListener('click', async () => {
  const inputField = document.getElementById('input-id');
  const inputValue = inputField.value;
  // clear input field
  inputField.value = '';
  if (inputValue == '') {
    error.style.display = 'block';
  } else {
    try {
      error.style.display = 'none';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=eab7a4b55f15386418becd11e75fe308`;
      const res = await fetch(url);
      const data = await res.json();
      updateTemp(data);
    } catch (err) {
      error.style.display = 'block';
      error.innerText =
        'City not found or something went wrong , please try again later';
    }
  }
});

const updateTemp = (data) => {
  document.getElementById('location').innerText = data.name;
  document.getElementById('weather-status').innerText = data.weather[0].main;
  const tempCelsius = data.main.temp - 273.15;
  const displayTemp = document.getElementById('temp');
  displayTemp.innerText = tempCelsius.toFixed(2);
  const weatherIcon = document.getElementById('weather-icon');
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
};
