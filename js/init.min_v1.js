var HOME = "home";
var ABOUT = "about";
var RESEARCH = "research";
var PUBLICATION = "publication";
var PEOPLE = "people";
var PEOPLE_CURRENT = "current-member"
var PEOPLE_POSTDOC = "postdoc";
var PEOPLE_GRADUATE = "graduate";
var PEOPLE_GRADUATE_MS = "ms";
var PEOPLE_GRADUATE_PHD = "phd";
var PEOPLE_UNDERGRAD = "undergrad";
var PEOPLE_ALUMNI= "alumni";
var CONTACT = "contact";
var current = "";
var current_childName = "";
var rotate_time = 5000;
var NAME = "name";
var PROJECT = "project";
var IMG = "img";
var TITLE = "title";
var DESCRIPTION = "description";
const LEN_PER_PAGE = 10;
let people_pagination; // decalre the pagination object

$.ajaxSetup({
  async: false
});

$(document).ready(function () {
  console.log("ready!");
  $(".nav_mobile").sidenav({ draggable: true });
  $(".nav-item").on("click", function () {
    var name = $(this).attr("name");
    f_switchContent(name, "");
  });
  $(".research_nav_item").on("click", function () {
    var name = $(this).attr("name");
    f_switchContent(RESEARCH, name);
  });
  $(".people_nav_item").on("click", function () {
    var name = $(this).attr("name");
    f_switchContent(PEOPLE, name);
  });
  var a = window.location.hash.substr(1);
  hash_child = "";
  if (a.length == 0) {
    a = HOME;
  } else {
    if (a.includes("-")) {
      hash_child = a;
      a = RESEARCH;
    }
  }
  console.log("hash : " + a + " | child: " + hash_child);
  f_switchContent(a, hash_child);
  f_scrollToTop();
});
function f_scrollToTop() {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".scrollTop").fadeIn();
    } else {
      $(".scrollTop").fadeOut();
    }
  });
  $(".scrollTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
}
function f_initNav() {
  $(".nav_desktop .dropdown-trigger").dropdown({
    hover: true,
    constrainWidth: false,
    coverTrigger: false,
    stopPropagation: true,
  });
  f_dropdown(".nav_mobile .dropdown-trigger");
  $(".parallax").parallax();
}
function f_initHome() {
  console.log("init the home page");
  $(".parallax").parallax();
  $(".carousel").carousel({ indicators: false });
  setTimeout(f_autoplay_carousel, rotate_time);
}
function f_autoplay_carousel() {
  $(".carousel").carousel("next");
  setTimeout(f_autoplay_carousel, rotate_time);
}
function f_switchContent(b, a) {
  // scrolling to the specific research project
  if (b == RESEARCH && b == current) {
    if (a != current_childName) {
      f_scrollToChild(a);
    }
    return;
  }
  $(".content").empty();
  switch (b) {
    case HOME:
      $(".content").load("home.html", function () {
        f_initHome();
      });
      break;
    case RESEARCH:
      $(".content").load("research.html", function () {
        $(".parallax").parallax();
        f_research(a);
      });
      break;
    case PUBLICATION:
      $(".content").load("pub.html", function () {
        $(".parallax").parallax();
        f_publication();
      });
      break;
    case PEOPLE:
      $(".content")
        .load("people.html", function () {
          $(".parallax").parallax();
          data = get_people_data();
          if (a == PEOPLE_CURRENT) {
            data_filtered = filter_current_people(data);
          } else if (a == PEOPLE_POSTDOC) {
            data_filtered = filter_postdocs(data);
          } else if(a == PEOPLE_GRADUATE){
            data_filtered = filter_graduates(data);
          } else if (a == PEOPLE_UNDERGRAD) {
            data_filtered = filter_undergrads(data);
          } else if (a == PEOPLE_ALUMNI) {
            data_filtered = filter_alumni(data);
          } else {
            data_filtered = data
          }
          init_people_pagination(data_filtered, LEN_PER_PAGE);
        })
        .hide()
        .fadeIn();
      break;
    case ABOUT:
      $(".content")
        .load("about.html", function () {
          $(".parallax").parallax();
        })
        .hide()
        .fadeIn();
      break;
    default:
      break;
  }

  // update the current research project for determining scrolling location 
  current = b;
  current_childName = a;
  if (a == "") {
    $(".scrollTop").click();
  }

  $(".nav_mobile").sidenav("close");
  f_initNav();
}

const P_NAME = "name";
const P_YEAR = "year";
const P_DEGREE = "degree";
const P_MAJOR = "major";
const P_DESCRIPTION = "description";
const P_EMAIL = "email";
const P_IMAGE = "img";

function filter_people_by_degree(data, degree = "") {
  data_filtered = [...data];
  if (degree !== "all") {
    degree !== "" && (data_filtered = [[...data_filtered[0].filter((p) => p["degree"].toLowerCase().includes(degree))]]);
  }
  return data_filtered;
}

function filter_current_people(data) {
  data_filtered = [...data];
  return [[...data_filtered[0].filter((p) => !p["degree"].toLowerCase().includes(PEOPLE_ALUMNI))]]
}

function filter_postdocs(data) {
  current_all = filter_current_people(data);
  return filter_people_by_degree(current_all, PEOPLE_POSTDOC);
}

function filter_graduates(data) {
  current_all = filter_current_people(data);
  ms_students = filter_people_by_degree(current_all, PEOPLE_GRADUATE_MS);
  phd_students = filter_people_by_degree(current_all, PEOPLE_GRADUATE_PHD);
  return all_grads = [[...phd_students[0], ...ms_students[0]]];
}

function filter_undergrads(data) {
  current_all = filter_current_people(data);
  return filter_people_by_degree(current_all, PEOPLE_UNDERGRAD);
}

function filter_alumni(data) {
  alumni = filter_people_by_degree(data, PEOPLE_ALUMNI);
  return alumni;
}

function render_people_pagination(people_data, page_data, len_per_page = 10) {
  const a = "img/people/";
  const b = "mailto:";
  let window_width = $(window).width();
  data_in_page = [page_data.map((p) => people_data[0][p-1])];
  page_html = "";
  data_in_page.map(function (c) {
    if (window_width > 600) {
      $elm = $(".people_list .sample-card-desktop");
    } else {
      $elm = $(".people_list .sample-card-mobile");
    };

    $.each(c, function (d, e) {
      $clone = $elm.clone();
      degree = e[P_DEGREE];
      degree_type_class = degree.toLowerCase();
      if ($(window).width() > 600) {
        $clone.removeClass("sample-card-desktop hide");
      }
      else {
        $clone.removeClass("sample-card-mobile hide");
      };
      $clone.addClass("people-item-" + d);
      $clone.addClass("people-" + degree_type_class);
      $clone.find(".name_email .name").html(e[P_NAME]);
      $clone
        .find(".name_email .email")
        .attr("href", b + e[P_EMAIL])
        .html(e[P_EMAIL]);
      year = e[P_YEAR];
      if (year != undefined && year.length > 0) {
        $clone.find(".year").html(year).removeClass("hide");
      }

      $clone.find(".description p").html(e[P_DESCRIPTION]);
      $clone.find(".face img").attr("src", a + e[P_IMAGE]);
      major = "";
      if (e[P_MAJOR] != undefined && e[P_MAJOR].length > 0) {
        major = e[P_MAJOR] + ", ";
      }
      degree_type = major + degree;
      $clone.find(".degree").addClass(degree_type_class).html(degree_type);
      page_html+='<li>'+$clone.html()+'</li>';
    });
  });
  return page_html;
} 

function init_people_pagination(people_data, len_per_page = 10) {
  var total_number_of_people = people_data[0].length;
  var page_arr = Array.from({ length: total_number_of_people}, (_, i) => i + 1);
  let $parent = $(".people_list .ul-card");
  people_pagination = $('#people-pagination-bottom').pagination({
    dataSource: page_arr,
    className: "paginationjs-big",
    callback: function(data, pagination) {
        page_html = render_people_pagination(people_data, data, len_per_page = len_per_page);
        $parent.html(page_html);
    },
    afterPreviousOnClick: function() {
      // scroll to the end of the page
      $("html, body").scrollTop($(document).height());
      $parent.hide().fadeIn();
    },
    afterPageOnClick : function() {
      // scroll to the top of the page
      $("html, body").scrollTop(0);
      $parent.hide().fadeIn();
    },
    afterNextOnClick: function() {
      // scroll to the top of the page
      $("html, body").scrollTop(0);
      // fade in the content
      $parent.hide().fadeIn();
    },
  });
  $(".people_list .ul-card").hammer().on('swiperight', function(event) {
    // if it is not the first page, go to previous page and fade in the content
    if (people_pagination.pagination('getCurrentPageNum') > 1) {
      people_pagination.pagination('previous');
      $parent.hide().fadeIn();
      console.log('previous page');  
    }
  }); 
  $(".people_list .ul-card").hammer().on('swipeleft', function(event) { 
    // if it is not the last page, go to next page and fade in the content
    if (people_pagination.pagination('getCurrentPageNum') < people_pagination.pagination('getTotalPage')) {
      people_pagination.pagination('next');
      $parent.hide().fadeIn();
      console.log('next page');  
    }
  }); 
}

function get_people_data() {
  data = [];
  $.getJSON("people.json", function (c) {
    data.push(c);
  });
  return data;
}

function get_total_number_of_people() {
  data = get_people_data();
  return data[0].length;
}

var AUTHOR = "author";
var TITLE = "title";
var YEAR = "year";
var DOI = "doi";
var URL = "url";
var JOURNAL = "journal";
var PUBLISHER = "publisher";
var SOURCE = "source";
var DOCUMENT_TYPE = "document_type";
var ISSN = "issn";
var JOURNAL_DETAIL = "journal_detail";
var NOT_LIST = ["Erratum"];
var PUB_TYPE_LIST = [
  "article",
  "conference_paper",
  "chapter",
  "book_chapter",
  "short_survey",
  "editorial",
  "review",
];
function f_publication() {
  console.log("publication : ");
  $(".pub_type_content li").on("click", function () {
    let name = $(this).find("a").text();
    console.log(name)
    $(".pub_type .pub_type_nav").html(name);
    type = $(this).find("a").attr("type");
    type = type.split(" ");
    console.log(type);
    f_togglePublication(type);
  });
  $.getJSON("pub.json", function (b) {
    $parent = $(".pub-list .ul-card");
    $elm = $(".pub-list .sample-card");
    var a = [];
    $.each(b, function (c, d) {
      $clone = $elm.clone();
      doc_type = d[DOCUMENT_TYPE];
      doc_type_class = doc_type.replace(" ", "_").toLowerCase();
      $clone.removeClass("sample-card hide");
      $clone.addClass("pub-item-" + c);
      $clone.addClass("pub-" + doc_type_class);
      $clone.find(".title p").html(d[TITLE]);
      $clone.find(".author p").html(d[AUTHOR]);
      $clone.find(".type_year .year").html(d[YEAR]);
      $clone.find(".type_year .type").addClass(doc_type_class).html(doc_type);
      if (d[JOURNAL_DETAIL] != undefined && d[JOURNAL_DETAIL].length > 0) {
        $clone
          .find(".journal_info")
          .removeClass("hide")
          .html(d[JOURNAL_DETAIL]);
      }
      if (d[URL] != undefined) {
        $clone.find(".url").removeClass("hide").attr("href", d[URL]);
      }
      if (NOT_LIST.indexOf(doc_type) < 0) {
        $parent.append($clone);
      }
    });
  });
  f_dropdown(".pub_type .dropdown-trigger");
}
function f_togglePublication(a) {
  if (a == "all") {
    $(".pub-list .ul-card li").fadeIn(1000);
    return;
  }
  var b = Array.from(PUB_TYPE_LIST);
  $(".pub-list .ul-card li").fadeOut(100);
  for (i in a) {
    item = a[i];
    $(".pub-list .ul-card .pub-" + item).fadeIn(1000);
  }
}
var PROJECT_TITLE = "name";
var PROJECT_DESCRIPTION = "description";
var PROJECT_APPLICATIONS = "applications";
var PROJECT_IMG = "img";
function f_research(b) {
  f_research_projects();
  f_research_funding();
  var a = $(".grid").imagesLoaded(function () {
    a.masonry({
      itemSelector: ".grid-item",
      gutter: ".gutter-sizer",
      percentPosition: true,
    });
    f_scrollToChild(b);
  });
}
function f_research_projects() {
  var a = "img/project/";
  $.getJSON("project.json", function (c) {
    $parent = $(".project-list .ul-card");
    $elm = $(".project-list .sample-project");
    var b = [];
    $.each(c, function (d, e) {
      $clone = $elm.clone();
      $clone.removeClass("sample-project hide");
      $clone.addClass("project-item-" + d);
      $clone.find(".meta").html("<h3>" + e[PROJECT_TITLE] + "</h3>");
      $clone.find(".description").html(e[PROJECT_DESCRIPTION]);
      if (e[PROJECT_IMG] != undefined && e[PROJECT_IMG].length > 0) {
        $clone
          .find(".image")
          .removeClass("hide")
          .attr("src", a + e[PROJECT_IMG]);
      }
      if (
        e[PROJECT_APPLICATIONS] != undefined &&
        e[PROJECT_APPLICATIONS].length > 0
      ) {
        applications = e[PROJECT_APPLICATIONS];
        len = applications.length;
        $clone.find(".applications").removeClass("hide");
        $app = $clone.find(".application_list");
        for (i = 0; i < len; i++) {
          $app.append("<li>" + applications[i] + "</li>");
        }
      }
      $parent.append($clone);
    });
  });
}
function f_research_funding() {
  var a = "img/logo/";
  $.getJSON("funding.json", function (c) {
    $parent = $(".funding-list .collection");
    $elm = $(".funding-list .sample-item");
    var b = [];
    $.each(c, function (d, e) {
      $clone = $elm.clone();
      $clone.removeClass("sample-item hide");
      $clone.addClass("funding-item-" + d);
      $clone.find(".name").html(e[NAME]);
      if (e[IMG] != undefined && e[IMG].length > 0) {
        $clone
          .find(".image")
          .removeClass("hide")
          .attr("src", a + e[IMG]);
      }
      if (e[PROJECT] != undefined && e[PROJECT].length > 0) {
        $project_list = $clone.find(".project-list");
        applications = e[PROJECT];
        len = applications.length;
        for (i = 0; i < len; i++) {
          console.log(applications[i]);
          $project = $project_list.find(".projects-sample").clone();
          $project.removeClass("projects-sample hide");
          $project.find(".title").html(applications[i]);
          $project_list.append($project);
        }
      }
      $parent.append($clone);
    });
  });
}
function f_scrollToChild(a) {
  if (a) {
    console.log("scrolling to childName :" + a);
    $("html, body").animate(
      { scrollTop: $("." + a).offset().top - 50 },
      "slow"
    );
    current_childName = a;
  }
}
function f_dropdown(a) {
  $(a).dropdown({
    constrainWidth: false,
    coverTrigger: false,
    stopPropagation: true,
  });
}
