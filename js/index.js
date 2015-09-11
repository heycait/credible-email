SG = 'caitlyn'
SGKEY = 'e4wBqrclz,8Y'
MDK = 'GysyE3AY5AqZsimfxRKoyQ'



$(document).ready(function(){

  $('[data-toggle="popover"]').popover();

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
      };
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
    parsedObject.to = $('#inputRecipients').val();
    parsedObject.subject = $('#inputSubject').val();
    parsedObject.text = $('#inputEmailText').val();

    localStorage.setItem(userEmail, JSON.stringify(parsedObject));
    // How to access and update "object" in localStorage
    // var userObject = {  'userEmail': sessionStorage.getItem('email'),
    //                     'to': $('#inputRecipients').val(),
    //                     'subject': $('#inputSubject').val(),
    //                     'text': $('#inputEmailText').val(),
    //                  }
    // localStorage.setItem('userObject', JSON.stringify(userObject));
    // var retrievedObject = localStorage.getItem('userObject');
    // console.log('retrievedObject: ', JSON.parse(retrievedObject));
  });

  $('#email-form').submit(function(e){
    e.preventDefault();
    //  if successful, clear localStorage data for the user
    var userEmail = sessionStorage.getItem('user');
    var formObject = { to: $('#inputRecipients').val().split(/[ ,]+/),
                       subject: $('#inputSubject').val(),
                       text: $('#inputEmailText').val()};

    sendMandrill(userEmail, formObject);
    // Mandrill Response:
    // [{email: "caitlyn.yu@icloud.com", status: "sent", _id: "3e03c77ede454deb87a2e36a1993096a", reject_reason: null}, ...]

    // reset localStorage and delete any saved drafts
    setStorage(userEmail);
    $('html').find('#email-form')[0].reset();
    $('.logged-in-content').hide();
    $('#sent-success').show();

    function sentMessage(){
      $('#sent-success').hide();
      $('.logged-in-content').show();
    };

    setTimeout(sentMessage, 2000);

    // debugger
    // check if all emails were successfully sent
    // result from Mandrill call not being returned successfully.. can't do a proper check
    // for (var i = 0; i < formObject.to.length; i++){
    //   if (result[i]['status'] === 'error'){
    //     result = false
    //   };
    // };

    // if (result){
    //   setStorage(userEmail);
    //   $('html').find('#email-form')[0].reset();
    //   alert('success!')
    // } else {
    //   alert('somethign went wrong.... :(')
    // }

  }); // end of this jquery function
}) // end of doc ready


function login(input){
  sessionStorage.setItem('user', input);
  $('#userEmailModal').modal('hide');
  var jsonObject = localStorage.getItem(input);
  var userObject = JSON.parse(jsonObject);

  $('#inputRecipients').val(userObject.to);
  $('#inputSubject').val(userObject.subject);
  $('#inputEmailText').val(userObject.text);
};

function setStorage(input){
  var userObject = { 'to': '',
                     'subject': '',
                     'text': ''}
  localStorage.setItem(input, JSON.stringify(userObject));
}

function signup(input){
  setStorage(input);
  sessionStorage.setItem('user', input);
  $('#userEmailModal').modal('hide');
};

function sendGrid(userEmail, formObject){
  formObject.api_user = SG;
  formObject.api_key = SGKEY;
  formObject.from = userEmail

  var request = $.ajax({
    url: 'https://api.sendgrid.com/api/mail.send.json',
    method: 'POST',
    data: {}
  }); // end of ajax

  //SendGrid
  // api_user=your_sendgrid_username&
  // api_key=your_sendgrid_password&
  // to[]=destination@example.com&toname[]=Destination&
  // to[]=destination2@example.com&toname[]=Destination2&
  // subject=Example_Subject&
  // text=testingtextbody&
  // from=info@domain.com

  // Response
  // {"message": "success"}
}; // end of sendGrid funct

function sendMandrill(userEmail, formObject){
  var email = new mandrill.Mandrill(MDK);
  var params = {
      "message": {
          "from_email": userEmail,
          "to":[],
          "subject": formObject.subject,
          "text": formObject.text,
      }
  };

  // Adding multiple recipients to Mandrill call
  for (var i = 0; i < formObject.to.length; i++){
    params['message']['to'].push({"email": formObject.to[i]})
  }

  email.messages.send(params, function(result) {
      console.log(result);
      return result
  }, function(error) {
      console.log(error);
      return error
  });

  // Response:
  // [{email: "caitlyn.yu@icloud.com", status: "sent", _id: "3e03c77ede454deb87a2e36a1993096a", reject_reason: null}]
};



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
