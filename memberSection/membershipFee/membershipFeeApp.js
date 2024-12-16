$(".toggle-tickets").click(function () {
    $tickets = $(this).parent().siblings(".collapse");
  
    if ($tickets.hasClass("in")) {
      $tickets.collapse("Затвори");
      $(this).html("Покажи");
      $(this).closest(".ticket-card").removeClass("active");
    } else {
      $tickets.collapse("Покажи");
      $(this).html("Затвори");
      $(this).closest(".ticket-card").addClass("active");
    }
  });
  