const ReleaseStatus = Object.freeze({
	DRAFT: "draft",
	IN_PROGRESS: "in-progress",
	DONE: "done",
})

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

    let draft = milestone.status === ReleaseStatus.DRAFT ? true: false;
    let card_id = milestone.status === ReleaseStatus.IN_PROGRESS ? "in-progress": milestone.description.replace(/\W/g,'_');
    let opacity = milestone.status === ReleaseStatus.DONE ? "greyed" : "";
    let hidden = milestone.status === ReleaseStatus.DONE ? "hidden" : "";

    return (
      `<div id="${card_id}" class="timeline-item ${hidden} milestone-status-${milestone.status}">
        <div class="timeline-img"></div>

        <div class="timeline-content timeline-card ${opacity} js--fadeIn${side}">
          <div class="timeline-img-header">
            <img class="meme" src="${milestone.image}">
          </div>
            <div class="date">${milestone.start_date} - ${milestone.end_date}</div>
            <div class="description">
                ${draft ? `<div class="draft">DRAFT</div>` : ""}
                <p>${milestone.description}</p>
                ${this.renderTaskList(milestone.tasks)}
                ${this.renderList("Benefits", milestone.benefits)}
            </div>
          <a class="bnt-more" href="javascript:void(0)">More</a>
        </div>
      </div>`
    );
  }

  renderTaskList(tasks) {
    let list_items = [];
    for (let t of tasks) {
      let image = t.status + ".png";
      let description = t.strikethrough? `<del>${t.description}</del>` : t.description;
      list_items.push(`<img class=status-icon src="images/${image}">&nbsp${description}`)
    }

    return(this.renderList("Tasks", list_items));
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
const scrollToTarget = function (target, scrollDuration = SCROLL_DURATION) {
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

    const percent = Math.min(time / scrollDuration, 1);
    window.scrollTo(0, startPos + diff * percent);

    if (time < scrollDuration) {
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
      scrollToInProgressMilestone()
    }
  }
}

function scrollToInProgressMilestone() {
  var in_progress_milestone = document.getElementById("in-progress");
  scrollToTarget(in_progress_milestone);
}

function toggleCompletedMilestones() {
  // Unfocus the history button, otherwise hitting ENTER will trigger the
  // button again instead of scrolling to the in-progress milestone.
  unfocusHistoryButton();
  toggleHiddenMilestones();
  toggleHistoryButtonContents();
}

function unfocusHistoryButton() {
  button = document.getElementById("history-button");
  button.blur();
}

function toggleHiddenMilestones() {
  var completed_milestones = document.getElementsByClassName("milestone-status-done");

  for (var i = 0; i < completed_milestones.length; i++) {
    completed_milestones[i].classList.toggle("hidden");
    if (i == 0) {
      scrollToTarget(completed_milestones[i], 0.01);
      scrollToTarget(document.head, 0.01);
    }
  }
}

function toggleHistoryButtonContents() {
  button_icon = document.getElementById("button-icon");
  button_text = document.getElementById("button-text");

  if (button_text.textContent.includes("Show")) {
    button_text.textContent = button_text.textContent.replace("Show", "Hide");
    button_icon.style.transform = "scaleX(-1)";
  }
  else {
    button_text.textContent = button_text.textContent.replace("Hide", "Show");
    button_icon.style.transform = "scaleX(1)";
  }
}
