SG = 'caitlyn'
SGKEY = 'e4wBqrclz,8Y'
MD = '04d0NW4LZO0Y4lLJca_iZA'

// $document.ready(function(){

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
