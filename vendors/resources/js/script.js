{
	let users;
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

	const request = new XMLHttpRequest();
	const url = 'data.json';

	request.open('GET', url, true);
	request.onload = function() {
		
		if (request.status >= 200 && request.status < 400) {
			users.data = JSON.parse(this.response);
			getData(users.data)
		} else {
			const errorMessage = document.createElement('marquee');
			errorMessage.textContent = `Something went wrong!`;
			app.appendChild(errorMessage);
		}
	}

	request.send();
	
	
	let card, h2, p, p2, btn;
	
	const ids = [];
	const usersAll = [];
	const friends = [];
	
	
	function getData(ourData) {
		ourData.forEach(cur => {
            usersAll.push(cur);
			card = document.createElement('div');
			card.setAttribute('class', 'card');

			h2 = document.createElement('h2');
			h2.textContent = cur.firstName + " " + cur.surname;

			p = document.createElement('p');
			p.textContent = `Age: ${cur.age}`;

			p2 = document.createElement('p');
			p2.textContent = `Gender: ${cur.gender}`;
				
			btn = document.createElement('button');
			btn.setAttribute('id', 'btn');
			btn.textContent = 'Find more';

			container.appendChild(card);
			card.appendChild(h2);
			card.appendChild(p);
			card.appendChild(p2);
			card.appendChild(btn);
            	
		});
	}
	
    document.body.addEventListener('click', function(event) {
        if(event.srcElement.id == 'btn') {
           console.log('Test!');       
        }
    });
}

