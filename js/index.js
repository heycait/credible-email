SG = 'caitlyn'
SGKEY = 'e4wBqrclz,8Y'
MD = '04d0NW4LZO0Y4lLJca_iZA'



$(document).ready(function(){

  $('[data-toggle="popover"]').popover();

  function login(input){
    sessionStorage.setItem('user', input);
    $('#userEmailModal').modal('hide');
    var jsonObject = localStorage.getItem(input);
    var userObject = JSON.parse(jsonObject);

    $('#inputRecipients').val(userObject.recipients);
    $('#inputSubject').val(userObject.subject);
    $('#inputEmailText').val(userObject.message);
  };

  function signup(input){
    var userObject = { 'recipients': '',
                       'subject': '',
                       'message': ''}
    localStorage.setItem(input, JSON.stringify(userObject));
    sessionStorage.setItem('user', input);
    $('#userEmailModal').modal('hide');
  };

  $('#submit-user-email').on('click', function(e){
      var input = $('#user-email-form').find('input[name=user-email]').val();
      if (input === "") {
        e.preventDefault();

        $('#submit-user-email').popover('show');

        setTimeout(function(){ $('#submit-user-email').popover('hide') }, 2000);
      } else {
        if(localStorage.getItem(input)){
          login(input)
        } else {
          signup(input)
        };
        // if(localStorage.getItem(input)){
        //   sessionStorage.setItem('user', input);
        //   $('#userEmailModal').modal('hide');
        //   var jsonObject = localStorage.getItem(input);
        //   var userObject = JSON.parse(jsonObject);

        //   $('#inputRecipients').val(userObject.recipients);
        //   $('#inputSubject').val(userObject.subject);
        //   $('#inputEmailText').val(userObject.message);
        // } else {
        //   var userObject = { 'recipients': '',
        //                      'subject': '',
        //                      'message': ''}
        //   localStorage.setItem(input, JSON.stringify(userObject));
        //   sessionStorage.setItem('user', input);
        //   $('#userEmailModal').modal('hide');
        // };
      }
  });

  $('#logout').on('click', function(){
    sessionStorage.removeItem('user');
    // sessionStorage.clear();
    $('html').find('#email-form')[0].reset();
    $('.logged-in-content').hide();
    $('#logged-out').show();
    $('#login').show();
  });

  $('#login').on('click', function(){
    $('#userEmailModal').modal('show');

    $('.logged-in-content').show();
    $('#logged-out').hide();
    $('#login').hide();
  });

  $('#discard-email').on('click', function(){
    $('html').find('#email-form')[0].reset();
  });

  $('#save-draft').on('click', function(e){
    e.preventDefault();
    var userEmail = sessionStorage.getItem('user');
    var userObject = localStorage.getItem(userEmail);
    var parsedObject = JSON.parse(userObject);
    parsedObject.recipients = $('#inputRecipients').val();
    parsedObject.subject = $('#inputSubject').val();
    parsedObject.message = $('#inputEmailText').val();

    localStorage.setItem(userEmail, JSON.stringify(parsedObject));
    // How to access and update "object" in localStorage
    // var userObject = {  'userEmail': sessionStorage.getItem('email'),
    //                     'recipients': $('#inputRecipients').val(),
    //                     'subject': $('#inputSubject').val(),
    //                     'message': $('#inputEmailText').val(),
    //                  }
    // localStorage.setItem('userObject', JSON.stringify(userObject));
    // var retrievedObject = localStorage.getItem('userObject');
    // console.log('retrievedObject: ', JSON.parse(retrievedObject));
  });

  $('#email-form').submit(function(){
    //  if successful, clear localStorage data for the user


  });
})




//   var sendGridUrl = 'https://api.sendgrid.com/api/mail.send.json'

// })

//SendGrid
// api_user=your_sendgrid_username
// api_key=your_sendgrid_password
// to[]=destination@example.com
// subject=Example_Subject
// text=testingtextbody
// from=info@domain.com

// Response
// {"message": "success"}


// Mandrill
// to
// from
// subject
// text

// var sendEmail = function(){
//   var email = new mandrill.Mandrill(process.env.API_KEY);
//   var params = {
//       "message": {
//           "from_email": sessionStorage.getItem('email'),
//           "to":[{"email":$scope.emailAddress}],
//           "subject": "My Todo List",
//           "text": "My Todo List \n\n",
//       }
//   };
//   email.messages.send(params, function(result) {
//       console.log(result);
//   }, function(error) {
//       console.log(error);
//   });

//   $scope.emailAddress = '';
// };

// Response:
// [{email: "caitlyn.yu@icloud.com", status: "sent", _id: "3e03c77ede454deb87a2e36a1993096a", reject_reason: null}]
