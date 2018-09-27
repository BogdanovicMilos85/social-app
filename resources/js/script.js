{
	const app = document.getElementById('root');

	const logo = document.createElement('img');
	logo.src = 'resources/images/logo.png';

	const container = document.createElement('div');
	container.setAttribute('class', 'container');

	const footer = document.getElementById('footer');
	const socialLinks = '<ul class="social-links"><li><a href="https://www.facebook.com"><i class="ion-social-facebook"></i></a></li><li><a href="https://www.twitter.com"><i class="ion-social-twitter"></i></a></li><li><a href="https://www.google.com"><i class="ion-social-googleplus"></i></a></li><li><a href="https://www.youtube.com"><i class="ion-social-youtube"></i></a></li><li><a href="https://www.instagram.com"><i class="ion-social-instagram"></i></a></li><li><a href="https://www.instagram.com"><i class="ion-social-linkedin"></i></a></li></ul>';
	footer.insertAdjacentHTML('beforeend', socialLinks);

	app.appendChild(logo);
	app.appendChild(container);



	let request = new XMLHttpRequest();

	request.open('GET', 'data.json', true);
	request.onload = function () {

	  // Begin accessing JSON data here
	  const data = JSON.parse(this.response);
	  if (request.status >= 200 && request.status < 400) {
		data.forEach(cur => {
			let card = document.createElement('div');
			card.setAttribute('class', 'card');

			let h2 = document.createElement('h2');
			h2.textContent = cur.firstName + " " + cur.surname;

			let p = document.createElement('p');
			p.textContent = `Age: ${cur.age}`;

			let p2 = document.createElement('p');
			p2.textContent = `Gender: ${cur.gender}`;

			let btn = document.createElement('button');
			btn.setAttribute('class', 'btn');
			btn.textContent = 'Find more';

			container.appendChild(card);
			card.appendChild(h2);
			card.appendChild(p);
			card.appendChild(p2);
			card.appendChild(btn);
		});
	  } else {
			const errorMessage = document.createElement('marquee');
			errorMessage.textContent = `Something went wrong!`;
			app.appendChild(errorMessage);
	  }
	}

	request.send();

}













