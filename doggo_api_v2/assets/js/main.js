/*
	Story by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Browser fixes.

		// IE: Flexbox min-height bug.
			if (browser.name == 'ie')
				(function() {

					var flexboxFixTimeoutId;

					$window.on('resize.flexbox-fix', function() {

						var $x = $('.fullscreen');

						clearTimeout(flexboxFixTimeoutId);

						flexboxFixTimeoutId = setTimeout(function() {

							if ($x.prop('scrollHeight') > $window.height())
								$x.css('height', 'auto');
							else
								$x.css('height', '100vh');

						}, 250);

					}).triggerHandler('resize.flexbox-fix');

				})();

		// Object fit workaround.
			if (!browser.canUse('object-fit'))
				(function() {

					$('.banner .image, .spotlight .image').each(function() {

						var $this = $(this),
							$img = $this.children('img'),
							positionClass = $this.parent().attr('class').match(/image-position-([a-z]+)/);

						// Set image.
							$this
								.css('background-image', 'url("' + $img.attr('src') + '")')
								.css('background-repeat', 'no-repeat')
								.css('background-size', 'cover');

						// Set position.
							switch (positionClass.length > 1 ? positionClass[1] : '') {

								case 'left':
									$this.css('background-position', 'left');
									break;

								case 'right':
									$this.css('background-position', 'right');
									break;

								default:
								case 'center':
									$this.css('background-position', 'center');
									break;

							}

						// Hide original.
							$img.css('opacity', '0');

					});

				})();

	// Smooth scroll.
		$('.smooth-scroll').scrolly();
		$('.smooth-scroll-middle').scrolly({ anchor: 'middle' });

	// Wrapper.
		$wrapper.children()
			.scrollex({
				top:		'30vh',
				bottom:		'30vh',
				initialize:	function() {
					$(this).addClass('is-inactive');
				},
				terminate:	function() {
					$(this).removeClass('is-inactive');
				},
				enter:		function() {
					$(this).removeClass('is-inactive');
				},
				leave:		function() {

					var $this = $(this);

					if ($this.hasClass('onscroll-bidirectional'))
						$this.addClass('is-inactive');

				}
			});

	// Items.
		$('.items')
			.scrollex({
				top:		'30vh',
				bottom:		'30vh',
				delay:		50,
				initialize:	function() {
					$(this).addClass('is-inactive');
				},
				terminate:	function() {
					$(this).removeClass('is-inactive');
				},
				enter:		function() {
					$(this).removeClass('is-inactive');
				},
				leave:		function() {

					var $this = $(this);

					if ($this.hasClass('onscroll-bidirectional'))
						$this.addClass('is-inactive');

				}
			})
			.children()
				.wrapInner('<div class="inner"></div>');

	// Gallery.
		$('.gallery')
			.wrapInner('<div class="inner"></div>')
			.prepend(browser.mobile ? '' : '<div class="forward"></div><div class="backward"></div>')
			.scrollex({
				top:		'30vh',
				bottom:		'30vh',
				delay:		50,
				initialize:	function() {
					$(this).addClass('is-inactive');
				},
				terminate:	function() {
					$(this).removeClass('is-inactive');
				},
				enter:		function() {
					$(this).removeClass('is-inactive');
				},
				leave:		function() {

					var $this = $(this);

					if ($this.hasClass('onscroll-bidirectional'))
						$this.addClass('is-inactive');

				}
			})
			.children('.inner')
				//.css('overflow', 'hidden')
				.css('overflow-y', browser.mobile ? 'visible' : 'hidden')
				.css('overflow-x', browser.mobile ? 'scroll' : 'hidden')
				.scrollLeft(0);

		// Style #1.
			// ...

		// Style #2.
			$('.gallery')
				.on('wheel', '.inner', function(event) {

					var	$this = $(this),
						delta = (event.originalEvent.deltaX * 10);

					// Cap delta.
						if (delta > 0)
							delta = Math.min(25, delta);
						else if (delta < 0)
							delta = Math.max(-25, delta);

					// Scroll.
						$this.scrollLeft( $this.scrollLeft() + delta );

				})
				.on('mouseenter', '.forward, .backward', function(event) {

					var $this = $(this),
						$inner = $this.siblings('.inner'),
						direction = ($this.hasClass('forward') ? 1 : -1);

					// Clear move interval.
						clearInterval(this._gallery_moveIntervalId);

					// Start interval.
						this._gallery_moveIntervalId = setInterval(function() {
							$inner.scrollLeft( $inner.scrollLeft() + (5 * direction) );
						}, 10);

				})
				.on('mouseleave', '.forward, .backward', function(event) {

					// Clear move interval.
						clearInterval(this._gallery_moveIntervalId);

				});

		// Lightbox.
			$('.gallery.lightbox')
				.on('click', 'a', function(event) {

					var $a = $(this),
						$gallery = $a.parents('.gallery'),
						$modal = $gallery.children('.modal'),
						$modalImg = $modal.find('img'),
						href = $a.attr('href');

					// Not an image? Bail.
						if (!href.match(/\.(jpg|gif|png|mp4)$/))
							return;

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Locked? Bail.
						if ($modal[0]._locked)
							return;

					// Lock.
						$modal[0]._locked = true;

					// Set src.
						$modalImg.attr('src', href);

					// Set visible.
						$modal.addClass('visible');

					// Focus.
						$modal.focus();

					// Delay.
						setTimeout(function() {

							// Unlock.
								$modal[0]._locked = false;

						}, 600);

				})
				.on('click', '.modal', function(event) {

					var $modal = $(this),
						$modalImg = $modal.find('img');

					// Locked? Bail.
						if ($modal[0]._locked)
							return;

					// Already hidden? Bail.
						if (!$modal.hasClass('visible'))
							return;

					// Lock.
						$modal[0]._locked = true;

					// Clear visible, loaded.
						$modal
							.removeClass('loaded')

					// Delay.
						setTimeout(function() {

							$modal
								.removeClass('visible')

							setTimeout(function() {

								// Clear src.
									$modalImg.attr('src', '');

								// Unlock.
									$modal[0]._locked = false;

								// Focus.
									$body.focus();

							}, 475);

						}, 125);

				})
				.on('keypress', '.modal', function(event) {

					var $modal = $(this);

					// Escape? Hide modal.
						if (event.keyCode == 27)
							$modal.trigger('click');

				})
				.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
					.find('img')
						.on('load', function(event) {

							var $modalImg = $(this),
								$modal = $modalImg.parents('.modal');

							setTimeout(function() {

								// No longer visible? Bail.
									if (!$modal.hasClass('visible'))
										return;

								// Set loaded.
									$modal.addClass('loaded');

							}, 275);

						});

})(jQuery);

const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const select = document.querySelector('.breeds');

fetch(BREEDS_URL)
.then(res => res.json())
.then(data => {
    const breedsObject = data.message;
    const breedsArray = Object.keys(breedsObject);
    for(let i = 0; i<breedsArray.length; i++)
    {
        const option = document.createElement('option');
        option.value = breedsArray[i];
        option.innerText = breedsArray[i];
        select.appendChild(option);
    }
})

select.addEventListener('change', event => {
    console.log(event.target.value);
    let url = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
    getDogImg(url);
    dogInfo.assignMF();
    dogInfo.assignAge();
    dogInfo.assignLikes();
    dogInfo.assignDislikes();
    dogInfo.assignFunFact();
})

const img = document.querySelector('.dog-img');
const getDogImg = url => {
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data =>{
            img.src = data.message;
        })
}

const dogInfo = {
     fNames: ['Abby',	'Addie',	'Alexis',	'Alice',	'Allie',	'Alyssa',	'Amber',	'Angel',	'Anna',	'Annie',	'Ariel',	'Ashley',	'Aspen',	'Athena',	'Autumn',	'Ava',	'Avery',	'Baby',	'Bailey',	'Basil',	'Bean',	'Bella',	'Belle',	'Betsy',	'Betty',	'Bianca',	'Birdie',	'Biscuit',	'Blondie',	'Blossom',	'Bonnie',	'Brandy',	'Brooklyn',	'Brownie',	'Buffy',	'Callie',	'Camilla',	'Candy',	'Carla',	'Carly',	'Carmela',	'Casey',	'Cassie',	'Chance',	'Chanel',	'Chloe',	'Cinnamon',	'Cleo',	'Coco',	'Cookie',	'Cricket',	'Daisy',	'Dakota',	'Dana',	'Daphne',	'Darla',	'Darlene',	'Delia',	'Delilah',	'Destiny',	'Diamond',	'Diva',	'Dixie',	'Dolly',	'Duchess',	'Eden',	'Edie',	'Ella',	'Ellie',	'Elsa',	'Emma',	'Emmy',	'Eva',	'Faith',	'Fanny',	'Fern',	'Fiona',	'Foxy',	'Gabby',	'Gemma',	'Georgia',	'Gia',	'Gidget',	'Gigi',	'Ginger',	'Goldie',	'Grace',	'Gracie',	'Greta',	'Gypsy',	'Hailey',	'Hannah',	'Harley',	'Harper',	'Hazel',	'Heidi',	'Hershey',	'Holly',	'Honey',	'Hope',	'Ibby',	'Inez',	'Isabella',	'Ivy',	'Izzy',	'Jackie',	'Jada',	'Jade',	'Jasmine',	'Jenna',	'Jersey',	'Jessie',	'Jill',	'Josie',	'Julia',	'Juliet',	'Juno',	'Kali',	'Kallie',	'Karma',	'Kate',	'Katie',	'Kayla',	'Kelsey',	'Khloe',	'Kiki',	'Kira',	'Koko',	'Kona',	'Lacy',	'Lady',	'Layla',	'Leia',	'Lena',	'Lexi',	'Libby',	'Liberty',	'Lily',	'Lizzy',	'Lola',	'London',	'Lucky',	'Lulu',	'Luna',	'Mabel',	'Mackenzie',	'Macy',	'Maddie',	'Madison',	'Maggie',	'Maisy',	'Mandy',	'Marley',	'Matilda',	'Mattie',	'Maya',	'Mia',	'Mika',	'Mila',	'Miley',	'Millie',	'Mimi',	'Minnie',	'Missy',	'Misty',	'Mitzi',	'Mocha',	'Molly',	'Morgan',	'Moxie',	'Muffin',	'Mya',	'Nala',	'Nell',	'Nellie',	'Nikki',	'Nina',	'Noel',	'Nola',	'Nori',	'Olive',	'Olivia',	'Oreo',	'Paisley',	'Pandora',	'Paris',	'Peaches',	'Peanut',	'Pearl',	'Pebbles',	'Penny',	'Pepper',	'Phoebe',	'Piper',	'Pippa',	'Pixie',	'Polly',	'Poppy',	'Precious',	'Princess',	'Priscilla',	'Raven',	'Reese',	'Riley',	'Rose',	'Rosie',	'Roxy',	'Ruby',	'Sadie',	'Sage',	'Sally',	'Sam',	'Samantha',	'Sammie',	'Sandy',	'Sasha',	'Sassy',	'Savannah',	'Scarlet',	'Shadow',	'Sheba',	'Shelby',	'Shiloh',	'Sierra',	'Sissy',	'Sky',	'Smokey',	'Snickers',	'Sophia',	'Sophie',	'Star',	'Stella',	'Sugar',	'Suki',	'Summer',	'Sunny',	'Sweetie',	'Sydney',	'Tasha',	'Tessa',	'Tilly',	'Tootsie',	'Trixie',	'Violet',	'Willow',	'Winnie',	'Xena',	'Zelda',	'Zoe'],
        mNames: ['Abe',	'Abbott',	'Ace',	'Aero',	'Aiden',	'AJ',	'Albert',	'Alden',	'Alex',	'Alfie',	'Alvin',	'Amos',	'Andy',	'Angus',	'Apollo',	'Archie',	'Aries',	'Artie',	'Ash',	'Austin',	'Axel',	'Bailey',	'Bandit',	'Barkley',	'Barney',	'Baron',	'Baxter',	'Bear',	'Beau',	'Benji',	'Benny',	'Bentley',	'Billy',	'Bingo',	'Blake',	'Blaze',	'Blue',	'Bo',	'Boomer',	'Brady',	'Brody',	'Brownie',	'Bruce',	'Bruno',	'Brutus',	'Bubba',	'Buck',	'Buddy',	'Buster',	'Butch',	'Buzz',	'Cain',	'Captain',	'Carter',	'Cash',	'Casper',	'Champ',	'Chance',	'Charlie',	'Chase',	'Chester',	'Chewy',	'Chico',	'Chief',	'Chip',	'CJ',	'Clifford',	'Clyde',	'Coco',	'Cody',	'Colby',	'Cooper',	'Copper',	'Damien',	'Dane',	'Dante',	'Denver',	'Dexter',	'Diego',	'Diesel',	'Dodge',	'Drew',	'Duke',	'Dylan',	'Eddie',	'Eli',	'Elmer',	'Emmett',	'Evan',	'Felix',	'Finn',	'Fisher',	'Flash',	'Frankie',	'Freddy',	'Fritz',	'Gage',	'George',	'Gizmo',	'Goose',	'Gordie',	'Griffin',	'Gunner',	'Gus',	'Hank',	'Harley',	'Harvey',	'Hawkeye',	'Henry',	'Hoss',	'Huck',	'Hunter',	'Iggy',	'Ivan',	'Jack',	'Jackson',	'Jake',	'Jasper',	'Jax',	'Jesse',	'Joey',	'Johnny',	'Judge',	'Kane',	'King',	'Kobe',	'Koda',	'Lenny',	'Leo',	'Leroy',	'Levi',	'Lewis',	'Logan',	'Loki',	'Louie',	'Lucky',	'Luke',	'Marley',	'Marty',	'Maverick',	'Max',	'Maximus',	'Mickey',	'Miles',	'Milo',	'Moe',	'Moose',	'Morris',	'Murphy',	'Ned',	'Nelson',	'Nero',	'Nico',	'Noah',	'Norm',	'Oakley',	'Odie',	'Odin',	'Oliver',	'Ollie',	'Oreo',	'Oscar',	'Otis',	'Otto',	'Ozzy',	'Pablo',	'Parker',	'Peanut',	'Pepper',	'Petey',	'Porter',	'Prince',	'Quincy',	'Radar',	'Ralph',	'Rambo',	'Ranger',	'Rascal',	'Rebel',	'Reese',	'Reggie',	'Remy',	'Rex',	'Ricky',	'Rider',	'Riley',	'Ringo',	'Rocco',	'Rockwell',	'Rocky',	'Romeo',	'Rosco',	'Rudy',	'Rufus',	'Rusty',	'Sam',	'Sammy',	'Samson',	'Sarge',	'Sawyer',	'Scooby',	'Scooter',	'Scout',	'Scrappy',	'Shadow',	'Shamus',	'Shiloh',	'Simba',	'Simon',	'Smoky',	'Snoopy',	'Sparky',	'Spencer',	'Spike',	'Spot',	'Stanley',	'Stewie',	'Storm',	'Taco',	'Tank',	'Taz',	'Teddy',	'Tesla',	'Theo',	'Thor',	'Titus',	'TJ',	'Toby',	'Trapper',	'Tripp',	'Tucker',	'Tyler',	'Tyson',	'Vince',	'Vinnie',	'Wally',	'Walter',	'Watson',	'Willy',	'Winston',	'Woody',	'Wrigley',	'Wyatt',	'Yogi',	'Yoshi',	'Yukon',	'Zane',	'Zeus',	'Ziggy'],
        likesList: ['Ice water from McDonalds','Kisses','Snuggles','Sniffing the air','Biting the wind','Trash cans','Raiding the cat box for treasure','Barking hello to friends','Stealing cat food','Sleeping in the car','Payaya','Stealing socks','New friends','Ear rubs','Sliced hot dogs','Running at top speed inside the house','Causing diversions','Bread','Sunbathing','Running through tall grass','Deep sighs','Ear scratchies','Licking people directly on the mouth','Destroying soft toys','The human bed','Squeaky toys','Sitting with (or on) people','Chicken','Going to bed after midnight',  'Puddles', 'Howling at Sirens','Staring out the window','Bubbles','Peanut butter','String cheese','Pats, rubs, and butt scritches', 'Your dirtiest, stinkiest, sweatiest clothes', 'Toys', 'Puzzles', 'Cheese', 'Bacon', 'Anything stolen off your plate', 'Swimming', 'Car Rides', 'Chasing squirrels', 'A nice, peaceful nap in a quiet spot', 'Sniffing the bushes', 'Sleeping in', 'Playing frisbee', 'Digging holes in the flower bed', 'Staring at you while pooping', 'Stealing blankets off the bed', 'Drinking out of puddles', 'Farting', 'Doing tricks', 'Agility', 'Barking at the delivery person', 'Stealing dirty laundry', 'Chewing your favorite shoe', 'Staring into space', 'Wrestling with friends', 'Going to the dog park', 'Getting as muddy as possible', 'Going on hikes', 'Annoying the cat', 'Playing tug of war', 'Waking you up at 4am for food', 'Staring at you with love', 'Sitting on your lap'],
        dislikesList: ['Eating alone', 'Roombas','Small children','Thunder','Staying clean after a bath','Nail trims','Being groomed','People','Showers','Being bored','Sharing food','Being home alone','Balloons','Suitcases','Being carried','Helicopters','Doorbells','Pillows','Landscapers/lawnmowers','Their own shadow','Going to bed late','Broccoli','Carrots','Vegetables','Vacuum clearners','Puddles', 'Bathing', 'Not being included', 'The neighbor', 'The UPS person', 'Garbage trucks', 'Thunderstorms', 'Wet grass', 'Burrs'],
        factList: ['Remembers every squirrel they have ever seen','Wishes they knew how cars work','Thinks pond water tastes the very best','Can carry three tennis balls at once and is very proud of that.','Eats grass for fun',"Doesn't actually know their own name, just likes your voice.",'Understands more words than you think','Saw a shooting star once','Will only sleep with 2 blankets','Ate an entire cake at a birthday party before anyone noticed','Can hear a bag of cheese opening from half a mile away',"Believes that frogs are smarter than they look","Once gave a grasshopper a ride on their nose","Doesn't understand the stock market",'Can sprint up to 30mph',"Believes they could win Crufts, but can't afford a plane ticket.","Wishes there weren't so many different streaming services.",'Secretly enjoys baths, but will never tell.','Ate a bee and got stung, then did it again the next day','Unsure of the meaning of life, but believes it may involve bacon.','Truly believes they are a cat','Can actually count to 12, but has never had a reason to do so.','Feels a sense of longing when watching birds migrate in the Fall.',"Enjoys watching SNL, but doesn't understand the jokes",'Sheds enough hair to fill a 5-gallon bucket each week.','Responds to commands in English, German, and Klingon.','Only pretends to understand what you are saying, loves you anyway.','Caught a squirrel once, and now dreams about that moment every single night.',
        "Knows exactly how the universe will end, but doesn't care.",'Would be a top-notch violinist, if they had thumbs.','Dreams of breaking into the dog food plant down the road and eating EVERYTHING.','Can see one more color than any other dog. You will never know which one it is.','Won the award for "fastest lick of the kitchen counter" in 2018 (self-awarded).','Ears and tail are the same length (big ears)!','Takes charge and loudly demands treats','Very bouncy, scientists suspects that legs may contain springs.',"Prefers to eat at the same time as the humans - it's only polite!",'Originally from Tijuana, unkown level of fluency in Spanish.','Favorite hobby is sculpting (the fence, with their mouth)','Can eat an entire loaf of bread in one sitting',"Thinks they are the cat's best friend, but the cat considers them an acquaintence, at best.",'Chooses whether to listen to you on a cas-by-case basis','Can escape any harness ever made','Has an extra toe','Caught a butterfly and immediately spit it back out','Fences are less of an obstacle and more of a suggestion','Terrified of the kitten','Once ate an entire pack of gum','Can consume a rawhide chew in 30 seconds','Farts every time they sit down','Can howl on pitch','Will immediately present belly for rubs','Dream job: bacon taste-tester','Career: retired actor/consultant'],
        MF: '',
        rname: '',
        age: '',
        likes: '',
        dislikes: '',
        fact: '',

        assignMF(){
            x=(Math.floor(Math.random() * 2) == 0)
            if(x){
                this.MF = "Female";
                this.assignName(this.fNames);
            }
            else{
                this.MF = "Male";
                this.assignName(this.mNames);
            }
            document.getElementById("MF").innerHTML = `Sex: ${this.MF}`;
        },

        assignName(array){
            this.rname = array[Math.floor(Math.random()*array.length)];
            document.getElementById("dog-name").innerHTML = `${this.rname}`;
        },

        assignAge(){
            this.age = Math.floor(Math.random()*16 + 1);
            document.getElementById("age").innerHTML = `Age: ${this.age}`;
        },

        yatesShuffle(array){
            let m = array.length, t, i;
            //while there remain elements to shuffle...
            while (m){
                //pick a remaining element
                i = Math.floor(Math.random()*m--);
                //and swap it with the current element
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        },

        assignLikes(){
            this.likes = this.yatesShuffle(this.likesList).slice(0,2);
            document.getElementById("likes").innerHTML = `Likes: ${this.likes[0]}, ${this.likes[1]}`;
        },

        assignDislikes(){
            this.dislikes = this.yatesShuffle(this.dislikesList).slice(0,2);
            document.getElementById("dislikes").innerHTML = `Dislikes: ${this.dislikes[0]}, ${this.dislikes[1]}`;
        },

        assignFunFact(){
            this.fact = this.yatesShuffle(this.factList).slice(0,2);
			console.log(this.factList.length);
            document.getElementById("fun-fact").innerHTML = `Additional Info: ${this.fact}`;
        }
}