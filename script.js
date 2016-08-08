$spaceBetweenProjects = 24;
$paddingContainer = 15;

resizeProjects = function() {
  $width = $(window).width();
  if($width < 768) {
    newWidth = $width - 2 * $paddingContainer;
  } else if($width < 992) {
    newWidth = $width / 2 - 2 * $paddingContainer;
  } else {
    newWidth = $width / 3 - 2 * $paddingContainer;
  }
  $('.project').css('width', newWidth);
};

$(window).load(function() {
  $('[title]').tooltip();
  resizeProjects();
  $projects = $('#projects')
  $projects.masonry({
    itemSelector: '.project',
    gutter: $spaceBetweenProjects,
    isFitWidth: true
  });
});

$(window).resize(function() {
  resizeProjects();
});
