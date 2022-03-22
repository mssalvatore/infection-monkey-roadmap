class TimelineRenderer {
  constructor(iterations) {
    this.even = true;
    this.iterations = iterations
    console.log(document.URL)
  }
  
	render() {
		let iterationsHTML = '';

		for (let i of this.iterations) {
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

function renderTimeline(iterations) {
	let renderer = new TimelineRenderer(iterations)
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
  $.getJSON(document.URL + "roadmap.json", render);
});

function render(iterations) {
  renderTimeline(iterations);
  fadeIn();
}
