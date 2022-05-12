class TimelineRenderer {
  constructor(milestones) {
    this.even = true;
    this.milestones = milestones
    console.log(document.URL)
  }
  
	render() {
		let milestonesHTML = '';

		for (let i of this.milestones) {
			milestonesHTML += this.renderMilestoneCard(i);
		}
		return milestonesHTML;
  }

	renderMilestoneCard(milestone) {
		let side = this.even ? "Left" : "Right";
		this.even = ! this.even;

    let opacity = milestone.greyed ? "greyed" : "";

    return (
      `<div class="timeline-item">
        <div class="timeline-img"></div>

        <div class="timeline-content timeline-card ${opacity} js--fadeIn${side}">
        	<div class="timeline-img-header">
				<img class="meme" src="${milestone.image}">
        	</div>
            <div class="date">${milestone.start_date} - ${milestone.end_date}</div>
            <div class="description">
                <p>${milestone.description}</p>
                ${this.renderList("Tasks", milestone.tasks)}
                ${this.renderList("Benefits", milestone.benefits)}
            </div>
          <a class="bnt-more" href="javascript:void(0)">More</a>
        </div>
      </div>`
    );
	}

  renderList(title, items) {
		if (items.length == 0) {
			return ""
		}

		let item_list = '                <ul>';
		for (let o of items) {
			item_list += `\n                   <li>${o}</li>`;
		}
		item_list += '\n                </ul>';

		return("<h3>" + title + "</h3>\n" + item_list);
  }
}

function renderTimeline(milestones) {
	let renderer = new TimelineRenderer(milestones)
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

function render(milestones) {
  renderTimeline(milestones);
  fadeIn();
}
