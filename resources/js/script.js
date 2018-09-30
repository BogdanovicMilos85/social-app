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
	
	var users = {
		data: [],
		user: [],
		friendsIds: [],
		friends: [],
		getUser: function(id) {
			this.data.forEach(function(user) {
				if (user.id == id) {
					this.user = user;
			 	}
			});
		},

		getFriends: function() {
			if (this.user != "") {
				this.friendsIds = this.user.friends;
			  	this.data.forEach(function(user) {
					if (this.friendsIds.indexOf(user.id)) {
				  		this.friends.push(user);
					}
			  	});
			} else {
			  console.error("You didn\'t select appropriate user.");
			}
		},
	}

	const request = new XMLHttpRequest();
	const url = 'data.json';

	request.open('GET', url, true);
	request.onload = function() {
		//var data = JSON.parse(this.response);
		if (request.status >= 200 && request.status < 400) {
			//var data = JSON.parse(this.response);
			//getData(data);
			users.data = JSON.parse(this.response);
			getData(users.data)
		} else {
			const errorMessage = document.createElement('marquee');
			errorMessage.textContent = `Something went wrong!`;
			app.appendChild(errorMessage);
		}
	}

	request.send();
	
	
	var card, h2, p, p2, btn;
	
	var ids = [];
	var usersAll = [];
	var friends = [];
	
	
	
	function getData(ourData) {
		ourData.forEach(cur => {
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
		
		document.body.addEventListener('click', function(event) {
			if(event.srcElement.id == 'btn') {
				
			}
		});
		
		ourData.forEach(cur => {
			//ids.push(cur);
			//console.log(cur);
			//console.log(index);
			//
			//console.log(ids);
			usersAll.push(cur);
//			//console.log(usersAll);
//			
//			
//			//console.log(friends);
//			
//			if(cur.id = ids) {
//			//	console.log(cur.firstName + cur.surname);
//			}
//			
		})
		
	}
	
	console.log(usersAll);
}

