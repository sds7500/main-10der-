const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

if(signUpButton){
	signUpButton.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});
}
if(signInButton)
{
signInButton.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});
}

function validateMyForm()
{
	var name=document.signin.sign_name.value;
	var email=document.signin.sign_email.value;
	var number=document.signin.sign_mobileno.value;
	var pwd=document.signin.sign_password.value;
	var cpwd=document.signin.sign_cpassword.value;
	const alert=document.getElementById("alert");
	if (name!=""){
		var passid_len = pwd.length;
			if (passid_len >= 6){
				var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				if(email.match(mailformat)){
					var phoneno = /^\d{10}$/;
 					if(number.match(phoneno)){
						if(pwd===cpwd){
							document.signin.submit();
							return true;
						}
						else{
							alert.innerHTML="Password and Confirm Password dosent match";
							return false;
						}
					}
					else{
						alert.innerHTML="Phone number should be of only 10 digits";
						return false;
					}
				}
				else{
					alert.innerHTML="Please enter valid email";
					return false;
				}
			}
			else{
				alert.innerHTML="Password length should be greater than 6 ";
				return false;
			}
		}
		else{
			alert.innerHTML="username cannot be empty";
			return false;
		}

	}

