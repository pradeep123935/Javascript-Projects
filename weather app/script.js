const fetchWeatherData = async (latitude,longitude) =>{
	await fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`)
	.then(response => response.json())
	.then(data =>{
		document.querySelector('.name').innerText=data?.name;
		document.querySelector('.temp').innerText=(+data?.main?.temp).toFixed(2);
		document.querySelector('.main').innerText=data?.weather[0]?.main;
		const img = document.createElement('img');
		img.src=data?.weather[0]?.icon;
		img.alt="weather";
		img.width="90";
		document.querySelector('body').appendChild(img);
		const btn = document.createElement('button');
		btn.innerText='C';
		btn.onclick = ()=>toggleDegrees(btn,data?.main?.temp);
		document.querySelector('.temp').appendChild(btn);
	})
	.catch(error=>console.log(error));
}

const toggleDegrees = (btn,temp)=>{
	if(btn.innerText==='C') {
		const data = ((+temp*1.8)+32).toFixed(2);
		document.querySelector('.temp').innerText = data;
		btn.innerText='F';
		btn.onclick = ()=>toggleDegrees(btn,data);
		document.querySelector('.temp').appendChild(btn);

	}else {
		const data = ((+temp-32)/1.8).toFixed(2);
		document.querySelector('.temp').innerText = data;
		btn.innerText='C';
		btn.onclick = ()=>toggleDegrees(btn,data);
		document.querySelector('.temp').appendChild(btn);
	}
}

const success = (position) =>{
	const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetchWeatherData(latitude,longitude)
}

const error = ()=>{
	alert("unable to Unable to retrieve your location");
}

if("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(success,error);
}else {
	alert("Geolocation is not supported by your browser");
}