iterations = [
    {
        "greyed": true,
        "start_date": "March 1",
        "end_date": "March 31",
        "description": "Release Infection Monkey v1.10. We haven't released since August, so this will be one monster of a release.",
        "objectives": [],
        "image": "kraken.jpg"
    },
    {
        "greyed": true,
        "start_date": "April 1",
        "end_date": "April 8",
        "description": "Resolve old PRs and format code with Black.",
        "objectives": [
          "<del>Merge report refactoring</del>",
          "<del>Merge AppImage</del>",
          "<del>Run black on entire codebase</del>",
          "<del>Resolve flake8 findings</del>",
          "<del>Add pre-commit hooks for black, flake8, isort</del>",
          "<del>CI pipeline uses same black, flake8, and isort rules as pre-commit hooks</del>",
          "<del>Re-enable swimm in CI</del>"
        ],
        "image": "paint_it_black.jpg"
    },
    {
        "greyed": false,
        "start_date": "April 9",
        "end_date": "May 6",
        "description": "Find creative ways to improve our flow and do more with less.",
        "objectives": [
            "Automated end-to-end tests (including performance tests)",
            "Properly clean up after builds",
            "Automated build process",
            "<del>AppImage Package</del>",
            "Expedite release process",
            "<del>Properly freeze dependencies<del>",
            "More efficiently update monkey zoo dev branch",
            "Move monkey build scripts to monkey repo or their own repo",
            "<del>Put unit tests in their own directory</del>",
            "<del>Run eslint on commit</del>",
            "<del>Add a set of pre-commit hooks that prevent non-compliant code from ever being added.</del>"
        ],
        "image": "more_with_less.jpg"
    },
    {
        "greyed": false,
        "start_date": "May 7",
        "end_date": "May 21",
        "description": "Harden Infection Monkey against attack. Analyze code for weak security practices and fix them.",
        "objectives": [
            "<del>Address dlint findings</del>",
            "Create users more securely",
            "Don't run as root",
            "Create encryption keys and other sensitive files with better permissions.",
            "Assess the security of mongodb. Are there publicly accessible ports?",
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
        "greyed": false,
        "start_date": "May 7",
        "end_date": "May 29",
        "description": "Add scenarios wizard that helps users configure and run breach & attack simulations quickly.",
        "objectives": [],
        "image": "lightning.jpg"
    },
    {
        "greyed": false,
        "start_date": "June 1",
        "end_date": "June 17",
        "description": "Add ransomware simulation capability.",
        "objectives": [],
        "image": "ransom.jpg"
    },
    {
        "greyed": false,
        "start_date": "June 18",
        "end_date": "June 26",
        "description": "Fix as many bugs as possible, improving automated tests along the way.",
        "objectives": [],
        "image": "bugs.jpg"
    },
    {
        "greyed": false,
        "start_date": "June 28",
        "end_date": "June 30",
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

    let opacity = iteration.greyed ? "greyed" : "";

    return (
      `<div class="timeline-item">
        <div class="timeline-img"></div>

        <div class="timeline-content timeline-card ${opacity} js--fadeIn${side}">
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
