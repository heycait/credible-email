SG = 'caitlyn'
SGKEY = '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'
MDK = 'GysyE3AY5AqZsimfxRKoyQ'



$(document).ready(function(){

  $('[data-toggle="popover"]').popover();

  $('#submit-user-email').on('click', function(e){
      var input = $('#user-email-form').find('input[name=user-email]').val();
      if (validateEmail(input) === false){
        e.preventDefault();

        $('#submit-user-email').popover('show');
        $('#user-email-form').addClass("has-error has-feedback");
        var changeStatus = function(){$('#user-email-form').removeClass("has-error has-feedback")}
        setTimeout( changeStatus, 2000);

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
    var recipients = $('#inputRecipients').val().split(/[ ,]+/);
    var subject = $('#inputSubject').val();
    var message = $('#inputEmailText').val();

    if (emptyFormCheck(recipients, subject, message) === true) {
      return
    };

    var userEmail = sessionStorage.getItem('user');
    var formObject = { to: recipients,
                       subject: subject,
                       text: message}

    // sendMandrill(userEmail, formObject);
    // sendGrid(userEmail, formObject);

    // reset localStorage and delete any saved drafts
    setStorage(userEmail);
    resetForm();
    sentMessage();
    setTimeout(sentMessageComplete, 2000);

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

function emptyFormCheck(recipients, subject, message){
  var badInput = false;

  if (recipients[0] === ""){
    badInput = true
    $('#recipients').addClass('has-error has-feedback');
  } else {
    $('#recipients').addClass('has-success has-feedback');
  };

  if (subject.length === 0){
    badInput = true
    $('#subject').addClass('has-error has-feedback');
  } else {
    $('#subject').addClass('has-success has-feedback');
  };

  if (message.length === 0){
    badInput = true
    $('#text').addClass('has-error has-feedback');
  } else {
    $('#text').addClass('has-success has-feedback');
  };

  return badInput;
};

function sentMessage(){
  $('.logged-in-content').hide();
  $('#sent-success').show();
};

function sentMessageComplete(){
  $('#sent-success').hide();
  $('.logged-in-content').show();
};

function resetForm(){
  $('html').find('#email-form')[0].reset();
  $('#recipients').removeClass('has-error has-feedback has-success');
  $('#subject').removeClass('has-error has-feedback has-success');
  $('#text').removeClass('has-error has-feedback has-success');
}

function validateEmail(input){
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(input.match(mailformat)){
    return true
  };
  return false
};

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
  // var sendgrid = require('sendgrid')(sendgrid_username, sendgrid_password);

  // var email = new sendgrid.Email({
  //     to: formObject.to,
  //     from: userEmail,
  //     subject: formObject.subject,
  //     text: formObject.text
  // });

  formObject.api_user = SG;
  formObject.api_key = SGKEY;
  formObject.from = userEmail

  dataObj = decodeURIComponent($.param(formObject));

  var request = $.ajax({
    url: 'https://api.sendgrid.com/api/mail.send.json',
    headers: {
          'Accept': 'application/json',
          // 'Access-Control-Allow-Headers': 'x-requested-with',
          'Content-Type': 'text/plain'
    },
    method: 'POST',
    dataType: 'json',
    data: JSON.stringify(formObject)
  }).success(function(response){
    debugger
    alert('success')
  }); // end of ajax

  //SendGrid
  // api_user=your_sendgrid_username&
  // api_key=your_sendgrid_password&
  // to[]=destination@example.com&toname[]=Destination&
  // to[]=destination2@example.com&toname[]=Destination2&
  // subject=Example_Subject&
  // text=testingtextbody&
  // from=info@domain.com

  // Example SendGrid Response
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

  // Example Mandrill Response:
  // [{email: "caitlyn.yu@icloud.com", status: "sent", _id: "3e03c77ede454deb87a2e36a1993096a", reject_reason: null}]
};
