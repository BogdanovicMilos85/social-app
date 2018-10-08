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
		  
		const checkDuplicateInObject = (propertyName, inputArray) => {
			let testObject = {},
			duplicates = []

			inputArray.map(item => {
				let itemPropertyName = item[propertyName];
			  		if (itemPropertyName in testObject) {
						duplicates.push(item);
			  		} else {
						testObject[itemPropertyName] = item;
			  		}
				});

				return duplicates;
		};
		    
		data.map(user => {
				
				let friends = [];
				let allFriendsOfFriends = [];
				let friendsOfFriends = [];
				let suggestedFriends= [];

				data.filter(res => {

			  		user.friends.map(num => {

						if (res.id == num) {
				  			friends.push(res);

				  				data.filter(res2 => {
									res.friends.map(num2 => {
					  					if (res2.id == num2 && res2.id != user.id) {
											allFriendsOfFriends.push(res2);
					  					}
									});
				  				});

				  		for (var i = 0; i < allFriendsOfFriends.length; i++) {
							if (friendsOfFriends.indexOf(allFriendsOfFriends[i]) == -1) {
					  			friendsOfFriends.push(allFriendsOfFriends[i]);
							}
				  		}
				  			suggestedFriends = checkDuplicateInObject("id", allFriendsOfFriends);
						}
			  		});
				});
			  
				let card = document.createElement('div');
				card.setAttribute('class', 'card');

				let h2 = document.createElement('h2');
				h2.textContent = user.firstName + " " + user.surname;

				let p = document.createElement('p');
				p.textContent = `Age: ${user.age}`;

				let p2 = document.createElement('p');
				p2.textContent = `Gender: ${user.gender}`;

				let p3 = document.createElement('p');
				p3.setAttribute('class', 'para');
				p3.textContent = `Friends with: `;
				let list = document.createElement('ul');

				friends.forEach(cur => {
					let listItem = document.createElement('li');
					listItem.textContent = `${cur.firstName}  ${cur.surname}`;
					list.appendChild(listItem);
				});
				
			    let p4 = document.createElement('p');
				p4.setAttribute('class', 'para');
				p4.textContent = 'Friends of friends:';
				let oList = document.createElement('ol');
				friendsOfFriends.forEach(cur => {
					let oItem = document.createElement('li');
					oItem.textContent = `${cur.firstName}  ${cur.surname}`;
					oList.appendChild(oItem);
				});
				
				
				let p5 = document.createElement('p');
				p5.setAttribute('class', 'para');
				p5.textContent = 'Suggested friends:';
				let list2 = document.createElement('ul');
				suggestedFriends.forEach(cur => {
					let listItem2 = document.createElement('li');
					listItem2.textContent = `${cur.firstName}  ${cur.surname}`;
					list2.appendChild(listItem2);
					
				});

				
				container.appendChild(card);
				card.appendChild(h2);
				card.appendChild(p);
				card.appendChild(p2);
				card.appendChild(p3);
				card.appendChild(list);
				card.appendChild(p4);
				card.appendChild(oList);
				card.appendChild(p5);
				card.appendChild(list2);		
		  });
	  } else {
			const errorMessage = document.createElement('marquee');
			errorMessage.textContent = `Something went wrong!`;
			app.appendChild(errorMessage);
	  }
		
	}

	request.send();
}

