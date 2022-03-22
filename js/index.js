iterations = [
    {
        "greyed": false,
        "start_date": "Nov 8, 2021",
        "end_date": "Apr 7, 2022",
        "description": "Agent Refactor",
        "objectives": [
          "Improved architecture to support the next generation monkey",
          "<del>Significant performance improvement</del>",
          "<del>Improve UI responsiveness</del>",
          "<del>Decrease testing time</del>",
          "<del>Increased test coverage</del>",
          "Reduce feature bloat",
          "Resolve longstanding bugs",
          "Reliable stopping"
        ],
        "image": "https://i0.wp.com/red-green-refactor.com/wp-content/uploads/2020/03/devops-icon.png?fit=835%2C393&ssl=1&w=640"
    },
    {
        "greyed": false,
        "start_date": "Apr 7, 2022",
        "end_date": "Apr 21, 2022",
        "description": "Technical Debt Reduction",
        "objectives": [
          "Upgrade NodeJS version",
          "Optimize UI build",
          "Build optimization (time-bounded)",
          "Blackbox test optimization",
          "Reset simulation, keep config"
        ],
        "image": "https://images.ctfassets.net/q4zjipbua92t/Kcla3G0U86zPn9Nq7XlKC/9291bcea6736708be81f098e4d193668/img_tech-debt.png"
    },
    {
        "greyed": false,
        "start_date": "Apr 21, 2022",
        "end_date": "Aug 18, 2022",
        "description": "Island Refactor",
        "objectives": [
          "Flexible telemetry",
          "Flexible reporting",
          "Strong service/resource architectural boundary",
          "Database architectural boundary",
          "Reduce database-related complexity",
          "Logical and well-documented web API",
          "Reduced complexity in report generation",
          "Performance improvements",
        ],
        "image": "https://i.pinimg.com/600x315/7b/dd/1e/7bdd1ec5b272d2487c9d325b627477ff.jpg"
    },
    {
        "greyed": false,
        "start_date": "Aug 18, 2022",
        "end_date": "Oct 14, 2022",
        "description": "Plugin Infrastructure",
        "objectives": [
            "Slim down the agent",
            "Enable agent to load plugins dynamically at runtime",
            "Ability for Island to download new plugins",
            "Only run signed plugins",
            "Add reporting plugin points to Island",
            "Define plugins",
        ],
        "image": "https://icon-library.com/images/plugin-icon/plugin-icon-6.jpg"
    },
    {
        "greyed": false,
        "start_date": "Oct 14, 2022",
        "end_date": "Nov 3, 2022",
        "description": "Credential Collectors as Plugins",
        "objectives": [
            "Define collector plugin interface",
            "Mimikatz collector as plugin",
            "SSH collector as plugin",
            "Refactor SSH collector",
            "Document collector plugin interface",
            "Add new collector to exercise the interface",
        ],
        "image": "https://cdn3.iconfinder.com/data/icons/spy/500/hack-512.png"
    },
    {
        "greyed": false,
        "start_date": "Nov 3, 2022",
        "end_date": "Dec 1, 2022",
        "description": "Payloads as plugins",
        "objectives": [
          "Define payload plugin interface",
          "Transform ransomware into plugin",
          "Transform ransomware report into plugin",
          "Add cryptominer plugin to exercise the interface"
        ],
        "image": "https://cdn-icons-png.flaticon.com/512/1995/1995756.png"
    },
    {
        "greyed": false,
        "start_date": "Dec 1, 2022",
        "end_date": "Dec 22, 2022",
        "description": '"Polymorphic" agents',
        "objectives": [
          "Each agent has a different hash",
        ],
        "image": "images/dna.png"
    },
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
				<img class="meme" src="${iteration.image}">
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
