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
	
	class User {
		constructor(id, name, surname, age, gender, friends) {
			this.id = id;
			this.name = name;
			this.surname = surname;
			this.age = age;
			this.gender = gender;
			this.friends = friends;
		}
	}
	
	const users = [];

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
			
			let p3 = document.createElement('p');
			p3.setAttribute('class', 'para');
			p3.textContent = `Friends with: `;

			let btn = document.createElement('a');
			btn.setAttribute('class', 'btn');
			btn.textContent = 'Find more';
			
			let list = document.createElement('ul');

			container.appendChild(card);
			card.appendChild(h2);
			card.appendChild(p);
			card.appendChild(p2);
			card.appendChild(p3);
//			card.appendChild(btn);
//			
//			btn.onclick = function() {
//				btn.setAttribute('href', 'https://google.com');
//			}
			
			let friendsArr = cur.friends;
			let id = cur.id;
			let name = cur.firstName; 
			let surname = cur.surname;
			let age = cur.age;
			let gender = cur.gender;

			
			let friends = friendsArr.map(friendId => {
//				console.log("friendID is: ", friendId);
				let friend = data.find(cur => {
					return cur.id === friendId;
				});
				
            	let listItem = document.createElement('li');
				listItem.textContent = `${friend.firstName} ${friend.surname}`;
				list.appendChild(listItem);
				
				return {
					firstName: friend.firstName,
					surname: friend.surname
				};	
			});
			
			card.appendChild(list);
			
			const allUsers = new User(id, name, surname, age, gender, friends);
            users.push(allUsers);
		
		});
	  } else {
			const errorMessage = document.createElement('marquee');
			errorMessage.textContent = `Something went wrong!`;
			app.appendChild(errorMessage);
	  }
		
		console.log(users);
	}

	request.send();

}

