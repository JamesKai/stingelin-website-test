var HOME = "home"
var ABOUT = "about";
var RESEARCH = "research";
var PUBLICATION = "publication";
var PEOPLE = "people";
var CONTACT = "contact";
var current = "";
var current_childName = "";
var rotate_time = 5000;
var NAME = "name";
var PROJECT = "project";
var IMG = "img";
var TITLE = "title";
var DESCRIPTION = "description";
$(document).ready(function () {
	console.log("ready!");
	$('.nav_mobile').sidenav({
		draggable: true
	});

	$('.nav-item').on('click', function () {
		name = $(this).attr("name")
		f_switchContent(name, "");
	});

	$(".research_nav_item").on('click', function () {
		name = $(this).attr("name")
		f_switchContent(RESEARCH, name);
	})

	// staying on the same page
	var hash = window.location.hash.substr(1);
	hash_child = "";
	if (hash.length == 0)
		hash = HOME;
	else if (hash.includes("-")) {
		hash_child = hash
		hash = RESEARCH
	}
	console.log("hash : " + hash + " | child: " + hash_child)
	f_switchContent(hash, hash_child);
	// f_switchContent(ABOUT);f
	// f_scrollToTop();
});

// function f_scrollToTop() {
// 	$(window).scroll(function () {
// 		if ($(this).scrollTop() > 100) {
// 			$('.scrollTop').fadeIn();
// 		} else {
// 			$('.scrollTop').fadeOut();
// 		}
// 	});
// 	$('.scrollTop').click(function () {
// 		$("html, body").animate({
// 			scrollTop: 0
// 		}, 600);
// 		return false;
// 	});
// }

function f_initNav() {
	$(".nav_desktop .dropdown-trigger").dropdown({
		hover: true,
		constrainWidth: false,
		coverTrigger: false,
		stopPropagation: true
	});

	f_dropdown(".nav_mobile .dropdown-trigger");
	$('.parallax').parallax();
}

function f_initHome() {
	console.log("init the home page");
	$('.parallax').parallax();
	$('.carousel').carousel({
		indicators: false
	});
	setTimeout(f_autoplay_carousel, rotate_time);
}

function f_autoplay_carousel() {
	$('.carousel').carousel('next');
	setTimeout(f_autoplay_carousel, rotate_time);
}

function f_switchContent(parentName, childName) {
	if (parentName == current) {
		if (childName != current_childName) {
			// f_scrollToChild(childName);
		}
		return;
	}
	$(".content").empty();
	var fadeType = "slow";
	var fadeType = 10;
	switch (parentName) {
		case HOME:
			$(".content").load("home.html", function () {
				f_initHome();
			})
			break;
		case RESEARCH:
			$(".content").load("research.html", function () {
				$('.parallax').parallax();
				f_research(childName);
			});
			break;
		case PUBLICATION:
			$(".content").load("pub.html", function () {
				$('.parallax').parallax();
				f_publication();
			})
			break;
		case PEOPLE:
			$(".content").load("people.html", function () {
				$('.parallax').parallax();
				f_people();
			}).hide().fadeIn()
			break;
		case ABOUT:
			$(".content").load("about.html", function () {
				$('.parallax').parallax();
			}).hide().fadeIn()
			break;
		default:
			break;
	}
	current = parentName;
	current_childName = childName;

	if (childName == "") {
		// $('.scrollTop').click()
	}
	$(".nav_mobile").sidenav("close");
	f_initNav();
}

// ------------------------------------------------ //
// PEOPLE //
// ------------------------------------------------ //
var P_NAME = "name";
var P_YEAR = "year";
var P_DEGREE = "degree";
var P_MAJOR = "major";
var P_DESCRIPTION = "description";
var P_EMAIL = "email";
var P_IMAGE = "img";
function f_people() {
	var img_root = "img/people/";
	var mail_to = "mailto:";
	console.log("f_people");
	$.getJSON("people.json", function (data) {
		$parent = $(".people_list .ul-card");
		$elm = $(".people_list .sample-card");

		$.each(data, function (key, val) {
			$clone = $elm.clone();

			degree = val[P_DEGREE];
			degree_type_class = degree.toLowerCase();

			$clone.removeClass("sample-card hide");
			$clone.addClass("people-item-" + key);

			//class only present on when an element is added via script
			//this is used to hide and unhide the elements
			$clone.addClass("people-" + degree_type_class);
			$clone.find(".name_email .name").html(val[P_NAME]);
			$clone.find(".name_email .email").attr("href", mail_to + val[P_EMAIL]).html(val[P_EMAIL]);

			year = val[P_YEAR];
			if (year != undefined && year.length > 0) {
				$clone.find(".year").html(year).removeClass("hide");
			}
			$clone.find(".description p").html(val[P_DESCRIPTION]);
			$clone.find(".face img").attr("src", img_root + val[P_IMAGE]);

			//if major name is present
			major = "";
			if (val[P_MAJOR] != undefined && val[P_MAJOR].length > 0) {
				major = val[P_MAJOR] + ", "
			}
			degree_type = major + degree;
			$clone.find(".degree").addClass(degree_type_class).html(degree_type);

			$parent.append($clone);
		});
	});
}

// ------------------------------------------------ //
// PUBLICATION //
// pagination: http://pagination.js.org/
// ------------------------------------------------ //
var AUTHOR = 'author';
var TITLE = 'title';
var YEAR = 'year';
var DOI = 'doi';
var URL = 'url';
var JOURNAL = 'journal';
var PUBLISHER = 'publisher';
var SOURCE = 'source';
var DOCUMENT_TYPE = 'document_type';
var ISSN = 'issn';
var JOURNAL_DETAIL = 'journal_detail';
var NOT_LIST = ["Erratum"];
var PUB_TYPE_LIST = ["article", "conference_paper", "chapter", "book_chapter", "short_survey", "editorial", "review"];
function f_publication() {
	console.log("publication : ")
	$(".pub_type_content li").on('click', function () {
		name = $(this).find("a").text()
		$(".pub_type .pub_type_nav").html(name);

		type = $(this).find("a").attr("type")
		type = type.split(" ");
		console.log(type);
		f_togglePublication(type);
	})

	$.getJSON("pub.json", function (data) {
		$parent = $(".pub-list .ul-card");
		$elm = $(".pub-list .sample-card");

		var items = [];
		$.each(data, function (key, val) {
			$clone = $elm.clone();

			doc_type = val[DOCUMENT_TYPE];
			doc_type_class = doc_type.replace(" ", "_").toLowerCase();

			$clone.removeClass("sample-card hide");
			$clone.addClass("pub-item-" + key);

			//class only present on when an element is added via script
			//this is used to hide and unhide the elements
			$clone.addClass("pub-" + doc_type_class);
			$clone.find(".title p").html(val[TITLE]);
			$clone.find(".author p").html(val[AUTHOR]);
			$clone.find(".type_year .year").html(val[YEAR]);

			$clone.find(".type_year .type").addClass(doc_type_class).html(doc_type);

			//if journal name is present
			if (val[JOURNAL_DETAIL] != undefined && val[JOURNAL_DETAIL].length > 0) {
				$clone.find(".journal_info").removeClass("hide").html(val[JOURNAL_DETAIL]);
			}

			if (val[URL] != undefined) {
				$clone.find(".url").removeClass("hide").attr("href", val[URL]);
			}

			//remove hide and append
			if (NOT_LIST.indexOf(doc_type) < 0) {
				$parent.append($clone);
			}
		});
	});
	// dropdown init
	f_dropdown(".pub_type .dropdown-trigger");
}

function f_togglePublication(selected_type) {
	if (selected_type == "all") {
		$(".pub-list .ul-card li").fadeIn(1000);
		return;
	}
	var tmp_pub_list = Array.from(PUB_TYPE_LIST);
	$(".pub-list .ul-card li").fadeOut(100);
	for (i in selected_type) {
		item = selected_type[i];
		$(".pub-list .ul-card .pub-" + item).fadeIn(1000);
	}
}

// ------------------------------------------------ //
// RESEARCH //
// ------------------------------------------------ //
var PROJECT_TITLE = "name";
var PROJECT_DESCRIPTION = "description";
var PROJECT_APPLICATIONS = "applications";
var PROJECT_IMG = "img";
function f_research(childName) {
	f_research_projects();
	f_research_funding();

	var $grid = $('.grid').imagesLoaded( function() {
		$grid.masonry({
	    itemSelector: '.grid-item',
	    //columnWidth: '.grid-sizer',
	    gutter: '.gutter-sizer',
	    percentPosition: true
	  });
		// f_scrollToChild(childName);
	});

	// f_scrollToChild(childName);
}

function f_research_projects(){
	var img_root = "img/project/";
	//load project-list
	$.getJSON("project.json", function (data) {
		$parent = $(".project-list .ul-card");
		$elm = $(".project-list .sample-project");

		var items = [];
		$.each(data, function (key, val) {
			// console.log("project - " + key)

			$clone = $elm.clone();

			$clone.removeClass("sample-project hide");
			$clone.addClass("project-item-" + key);

			$clone.find(".meta").html("<h3>" + val[PROJECT_TITLE] + "</h3>");
			$clone.find(".description").html(val[PROJECT_DESCRIPTION]);

			//add project image if defined
			if (val[PROJECT_IMG] != undefined && val[PROJECT_IMG].length > 0) {
				$clone.find(".image").removeClass("hide").attr("src", img_root + val[PROJECT_IMG]);
			}

			// add applications if they are present
			if (val[PROJECT_APPLICATIONS] != undefined && val[PROJECT_APPLICATIONS].length > 0) {
				applications = val[PROJECT_APPLICATIONS];
				len = applications.length;
				$clone.find(".applications").removeClass("hide")
				$app = $clone.find(".application_list")
				for (i = 0; i < len; i++) {
					$app.append("<li>" + applications[i] + "</li>");
				}
			}
			$parent.append($clone);
		});
	});
}

function f_research_funding(){
	var img_root = "img/logo/"
	//Funding
	$.getJSON("funding.json", function (data) {
		$parent = $(".funding-list .collection");
		$elm = $(".funding-list .sample-item");

		var items = [];
		$.each(data, function (key, val) {
			// console.log("funding-list - " + key + " | " + val)

			$clone = $elm.clone();

			$clone.removeClass("sample-item hide");
			$clone.addClass("funding-item-" + key);

			$clone.find(".name").html(val[NAME]);
			// $clone.find(".description").html(val[PROJECT_DESCRIPTION]);

			//add project image if defined
			if (val[IMG] != undefined && val[IMG].length > 0) {
				$clone.find(".image").removeClass("hide").attr("src", img_root + val[IMG]);
			}

			// add applications if they are present
			if (val[PROJECT] != undefined && val[PROJECT].length > 0) {
				$project_list = $clone.find(".project-list");
				applications = val[PROJECT];
				len = applications.length;
				// $clone.find(".projects").removeClass("hide")
				// $app = $clone.find(".project-list")
				for (i = 0; i < len; i++) {
					// $app.append("<li>" + applications[i] + "</li>");
					console.log(applications[i])
					$project = $project_list.find(".projects-sample").clone();
					$project.removeClass("projects-sample hide");
					$project.find(".title").html(applications[i])
					$project_list.append($project);
				}
			}
			$parent.append($clone);

		});
	});
}

// Helper
// scroll to childName
function f_scrollToChild(childName) {
	// if (childName) {
	// 	console.log("scrolling to childName :" + childName);
	// 	$('html, body').animate({
	// 		scrollTop: $("." + childName).offset().top - 50
	// 	}, 'slow');
	// 	current_childName = childName;
	// }
}

function f_dropdown(className){
	$(className).dropdown({
		//hover: true,
		constrainWidth: false,
		coverTrigger: false,
		stopPropagation: true
	});

}
