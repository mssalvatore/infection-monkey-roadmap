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
    let draft = milestone.draft ? "draft": "";
    let in_progress = milestone.in_progress ? "in-progress": milestone.description.replace(/\W/g,'_');

    return (
      `<div id="${in_progress}" class="timeline-item">
        <div class="timeline-img"></div>

        <div class="timeline-content timeline-card ${opacity} js--fadeIn${side}">
          <div class="timeline-img-header">
            <img class="meme" src="${milestone.image}">
          </div>
            <div class="date">${milestone.start_date} - ${milestone.end_date}</div>
            <div class="description">
                ${milestone.draft ? `<div class="draft">DRAFT</div>` : ""}
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

    let item_list = `                <ul class=${title.toLowerCase()}>`;
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

const FADE_DURATION = 500;
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
      duration: FADE_DURATION,
    });

  } else {
    
    sr.reveal('.js--fadeInLeft', {
      origin: 'left',
      distance: '300px',
      easing: 'ease-in-out',
      duration: FADE_DURATION,
    });

    sr.reveal('.js--fadeInRight', {
      origin: 'right',
      distance: '300px',
      easing: 'ease-in-out',
      duration: FADE_DURATION,
    });

  }
  
  sr.reveal('.js--fadeInLeft', {
      origin: 'left',
      distance: '300px',
      easing: 'ease-in-out',
      duration: FADE_DURATION,
    });

    sr.reveal('.js--fadeInRight', {
      origin: 'right',
      distance: '300px',
      easing: 'ease-in-out',
      duration: FADE_DURATION,
    });
}

$(function(){
  $.getJSON(document.URL + "roadmap.json", render);
});


const SCROLL_DURATION = FADE_DURATION * 2;
const scrollToTarget = function (target) {
  const top = target.getBoundingClientRect().top;
  const bottom = target.getBoundingClientRect().bottom;
  const center = (top + bottom) / 2;

  const startPos = window.pageYOffset;
  const diff = center - (window.innerHeight / 2);

  let startTime = null;
  let requestId;

  const loop = function (currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }

    const time = currentTime - startTime;

    const percent = Math.min(time / SCROLL_DURATION, 1);
    window.scrollTo(0, startPos + diff * percent);

    if (time < SCROLL_DURATION) {
      requestId = window.requestAnimationFrame(loop);
    } else {
      window.cancelAnimationFrame(requestId);
    }
  };
  requestId = window.requestAnimationFrame(loop);
};

function render(milestones) {
  renderTimeline(milestones);
  fadeIn();
  window.onkeypress = function(event) {
    if (event.key == "Enter") {
      var in_progress_milestone = document.getElementById("in-progress");
      scrollToTarget(in_progress_milestone);
    }
  }
}
