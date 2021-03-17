iterations = [
    {
        "start_date": "March 1",
        "end_date": "March 19",
        "description": "Release Infection Monkey v1.10. We haven't released since August, so this will be one monster of a release.",
        "objectives": [],
        "image": "kraken.jpg"
    },
    {
        "start_date": "March 22",
        "end_date": "April 2",
        "description": "Find creative ways to improve our flow and do more with less.",
        "objectives": [
            "Automated end-to-end tests",
            "Automated build process",
            "AppImage Package",
            "Expedite release process",
            "Use pre-commit hooks to improve code quality"
        ],
        "image": "more_with_less.jpg"
    },
    {
        "start_date": "April 5",
        "end_date": "April 14",
        "description": "Harden Infection Monkey against attack. Analyze code for weak security practices and fix them.",
        "objectives": [
            "Address bandit findings",
            "Create users more securely",
            "Don't run as root",
            "Create encryption keys and other sensitive files with better permissions.",
            "Hash password on server-side",
            "Remove insecure use of /tmp",
            "Monkey agents authenticate with C&C",
            "Prevent MITM from sending configs to running monkeys",
            "Users can provide signed certs",
            "Vulnerable dependencies identified by `npm`"
        ],
        "image": "hatches.jpg"
    },
    {
        "start_date": "April 15",
        "end_date": "April 30",
        "description": "Add scenarios wizard that helps users configure and run breach & attack simulations quickly.",
        "objectives": [],
        "image": "lightning.jpg"
    },
    {
        "start_date": "May 3",
        "end_date": "May 14",
        "description": "Add ransomware simulation capability.",
        "objectives": [],
        "image": "ransom.jpg"
    },
    {
        "start_date": "May 17",
        "end_date": "May 21",
        "description": "Fix as many bugs as possible, improving automated tests along the way.",
        "objectives": [],
        "image": "bugs.jpg"
    },
    {
        "start_date": "May 24",
        "end_date": "May 26",
        "description": "Release Infection Monkey v1.11 with awesome new ransomware and scenarios features.",
        "objectives": [],
        "image": "awesome.jpg"
    }
];

class TimelineRenderer {
  constructor() {
    this.even = true;
  }
  
	render() {
		let iterationsHTML = ''

		for (let i of iterations) {
			iterationsHTML += this.renderIterationCard(i);
		}
		return iterationsHTML;
  }

	renderIterationCard(iteration) {
		let side = this.even ? "Left" : "Right";
		this.even = ! this.even;

    return (
      `<div class="timeline-item">
        <div class="timeline-img"></div>

        <div class="timeline-content timeline-card js--fadeIn${side}">
        	<div class="timeline-img-header">
				<img class="meme" src="./images/${iteration.image}">
        	</div>
            <div class="date">${iteration.start_date} - ${iteration.end_date}</div>
            <div class="description">
                <p>${iteration.description}</p>
                ${this.renderList(iteration.objectives)}
            </div>
          <a class="bnt-more" href="javascript:void(0)">More</a>
        </div>
      </div>`
    );
	}

  renderList(objectives) {
		if (objectives.length == 0) {
			return ""
		}

		let objective_list = '<ul>';
		for (let o of objectives) {
			objective_list += `\n                   <li>${o}</li>`;
		}
		objective_list += '\n                </ul>';

		return(objective_list);
  }
}

function renderTimeline() {
	let renderer = new TimelineRenderer()
  document.getElementById("timeline-container").innerHTML = renderer.render();
}

function fadeIn() {
  window.sr = ScrollReveal();

  if ($(window).width() < 768) {

  	if ($('.timeline-content').hasClass('js--fadeInLeft')) {
  		$('.timeline-content').removeClass('js--fadeInLeft').addClass('js--fadeInRight');
  	}

  	sr.reveal('.js--fadeInRight', {
	    origin: 'right',
	    distance: '300px',
	    easing: 'ease-in-out',
	    duration: 800,
	  });

  } else {
  	
  	sr.reveal('.js--fadeInLeft', {
	    origin: 'left',
	    distance: '300px',
		  easing: 'ease-in-out',
	    duration: 800,
	  });

	  sr.reveal('.js--fadeInRight', {
	    origin: 'right',
	    distance: '300px',
	    easing: 'ease-in-out',
	    duration: 800,
	  });

  }
  
  sr.reveal('.js--fadeInLeft', {
	    origin: 'left',
	    distance: '300px',
		  easing: 'ease-in-out',
	    duration: 800,
	  });

	  sr.reveal('.js--fadeInRight', {
	    origin: 'right',
	    distance: '300px',
	    easing: 'ease-in-out',
	    duration: 800,
	  });
}

$(function(){
  renderTimeline();
  fadeIn();
});
